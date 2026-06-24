import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import prisma from '../lib/prisma';
import cloudinary from 'cloudinary';
import { createProductSchema, updateProductSchema } from '@phonestore/shared';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const generateSlug = (name: string) => {
  return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Date.now();
};

export const createProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Validate input với Zod
    const parsed = createProductSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors.map(e => e.message).join(', ') });
      return;
    }

    const { sanPham, hang, phanKhuc, moTa, variants, media, ...otherFields } = parsed.data;

    const newProduct = await prisma.product.create({
      data: {
        slug: generateSlug(sanPham),
        sanPham,
        hang,
        phanKhuc,
        moTa,
        ...otherFields,
        variants: {
          create: variants.map((v) => ({
            sku: v.sku,
            ramGb: v.ramGb,
            dungLuongGb: v.dungLuongGb,
            mauSac: v.mauSac,
            imageUrl: v.imageUrl,
            giaGoc: v.giaGoc,
            giaBan: v.giaBan,
            tonKho: v.tonKho
          }))
        },
        media: {
          create: media?.map((m) => ({
            url: m.url,
            publicId: m.publicId,
            loai: m.loai || 'IMAGE',
            isThumbnail: m.isThumbnail || false
          })) || []
        }
      },
      include: {
        variants: true,
        media: true
      }
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('createProduct Error:', error);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
};

export const updateProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Validate input với Zod
    const parsed = updateProductSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors.map(e => e.message).join(', ') });
      return;
    }

    const { sanPham, hang, phanKhuc, moTa, variants, media, ...otherSpecs } = parsed.data;

    const existingProduct = await prisma.product.findUnique({
      where: { id },
      include: { variants: true, media: true }
    });
    if (!existingProduct) {
      res.status(404).json({ error: 'Sản phẩm không tồn tại' });
      return;
    }

    const updated = await prisma.$transaction(async (tx) => {
      // 1. Update general info and specs
      const updatedProduct = await tx.product.update({
        where: { id },
        data: {
          sanPham,
          hang,
          phanKhuc,
          moTa,
          ...otherSpecs
        }
      });

      // 2. Sync variants if provided
      if (variants) {
        const existingSkus = existingProduct.variants.map(v => v.sku);
        const newSkus = variants.map(v => v.sku);

        // Delete removed variants
        const skusToDelete = existingSkus.filter(sku => !newSkus.includes(sku));
        for (const sku of skusToDelete) {
          const variant = existingProduct.variants.find(v => v.sku === sku)!;
          // Check if variant has order items
          const hasOrders = await tx.orderItem.findFirst({
            where: { productVariantId: variant.id }
          });
          if (hasOrders) {
            throw new Error(`Không thể xóa phiên bản ${sku} do đã có lịch sử đơn hàng. Vui lòng hạ tồn kho về 0 thay vì xóa.`);
          }
          await tx.productVariant.delete({ where: { id: variant.id } });
        }

        // Upsert remaining/new variants
        for (const v of variants) {
          const existing = existingProduct.variants.find(ev => ev.sku === v.sku);
          if (existing) {
            await tx.productVariant.update({
              where: { id: existing.id },
              data: {
                ramGb: v.ramGb,
                dungLuongGb: v.dungLuongGb,
                mauSac: v.mauSac,
                imageUrl: v.imageUrl,
                giaGoc: v.giaGoc,
                giaBan: v.giaBan,
                tonKho: v.tonKho
              }
            });
          } else {
            await tx.productVariant.create({
              data: {
                productId: id,
                sku: v.sku,
                ramGb: v.ramGb,
                dungLuongGb: v.dungLuongGb,
                mauSac: v.mauSac,
                imageUrl: v.imageUrl,
                giaGoc: v.giaGoc,
                giaBan: v.giaBan,
                tonKho: v.tonKho
              }
            });
          }
        }
      }

      // 3. Sync media if provided
      let mediaToDelete: any[] = [];
      if (media) {
        const newUrls = media.map(m => m.url);
        mediaToDelete = existingProduct.media.filter(em => !newUrls.includes(em.url));
        
        if (mediaToDelete.length > 0) {
          await tx.productMedia.deleteMany({
            where: { id: { in: mediaToDelete.map(m => m.id) } }
          });
        }

        await tx.productMedia.deleteMany({ where: { productId: id } });
        
        if (media.length > 0) {
          await tx.productMedia.createMany({
            data: media.map((m, idx) => ({
              productId: id,
              url: m.url,
              publicId: m.publicId || null,
              loai: m.loai || 'IMAGE',
              isThumbnail: m.isThumbnail || (idx === 0),
              thuTu: idx
            }))
          });
        }
      }

      return { updatedProduct, mediaToDelete };
    });

    // Destroy removed media in Cloudinary (after transaction commits successfully)
    if (updated.mediaToDelete && updated.mediaToDelete.length > 0) {
      for (const m of updated.mediaToDelete) {
        if (m.publicId) {
          try {
            await cloudinary.v2.uploader.destroy(m.publicId);
          } catch (err) {
            console.error('Failed to destroy Cloudinary image during product update:', err);
          }
        }
      }
    }

    res.status(200).json(updated.updatedProduct);
  } catch (error: any) {
    console.error('updateProduct Error:', error);
    if (error.message && error.message.includes('lịch sử đơn hàng')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Lỗi hệ thống' });
    }
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: { media: true }
    });

    if (!product) {
      res.status(404).json({ error: 'Sản phẩm không tồn tại' });
      return;
    }

    // 1. Xóa trong DB bằng transaction trước
    await prisma.$transaction(async (tx) => {
      await tx.product.delete({ where: { id } });
    });

    // 2. Sau đó dọn Cloudinary (best-effort, ngoài transaction)
    if (product.media && product.media.length > 0) {
      for (const m of product.media) {
        if (m.publicId) {
          try {
            await cloudinary.v2.uploader.destroy(m.publicId);
          } catch (err) {
            console.error('Failed to destroy Cloudinary image:', err);
          }
        }
      }
    }

    res.status(200).json({ message: 'Xóa sản phẩm thành công' });
  } catch (error) {
    console.error('deleteProduct Error:', error);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
};

export const uploadImage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'Vui lòng chọn một tệp ảnh' });
      return;
    }

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(req.file.mimetype)) {
      res.status(400).json({ error: 'Chỉ chấp nhận file ảnh (JPEG, PNG, WebP, GIF)' });
      return;
    }

    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const result = await cloudinary.v2.uploader.upload(dataURI, {
      folder: 'phonestore',
      format: 'webp',
      quality: 'auto:good'
    });

    res.status(200).json({
      secure_url: result.secure_url,
      public_id: result.public_id
    });
  } catch (error) {
    console.error('uploadImage Error:', error);
    res.status(500).json({ error: 'Upload ảnh thất bại' });
  }
};
