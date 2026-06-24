import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth.middleware';
import cloudinary from 'cloudinary';

const prisma = new PrismaClient();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const generateSlug = (name: string) => {
  return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Date.now();
};

export const createProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { sanPham, hang, phanKhuc, moTa, variants, media, ...otherFields } = req.body;

    const newProduct = await prisma.product.create({
      data: {
        slug: generateSlug(sanPham),
        sanPham,
        hang,
        phanKhuc,
        moTa,
        ...otherFields,
        variants: {
          create: variants.map((v: any) => ({
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
          create: media?.map((m: any) => ({
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
    const { sanPham, hang, phanKhuc, moTa, variants, media, ...otherFields } = req.body;

    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) {
      res.status(404).json({ error: 'Sản phẩm không tồn tại' });
      return;
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        sanPham: sanPham || existingProduct.sanPham,
        hang: hang || existingProduct.hang,
        phanKhuc: phanKhuc || existingProduct.phanKhuc,
        moTa: moTa || existingProduct.moTa,
        ...otherFields
      }
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('updateProduct Error:', error);
    res.status(500).json({ error: 'Lỗi hệ thống' });
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

    await prisma.$transaction(async (tx) => {
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

      await tx.product.delete({ where: { id } });
    });

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
