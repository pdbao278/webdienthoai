import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { createOrderSchema, validateVoucherSchema } from '@phonestore/shared';
import { sendEmail } from '../services/email.service';
import prisma from '../lib/prisma';

const generateMaNhanHang = () => {
  return `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
};

export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const data = createOrderSchema.parse(req.body);

    const cartItems = await prisma.cartItem.findMany({
      where: data.cartItemIds ? { userId, id: { in: data.cartItemIds } } : { userId },
      include: { 
        productVariant: {
          include: { product: true }
        }
      },
    });

    if (cartItems.length === 0) {
      res.status(400).json({ error: 'Giỏ hàng trống' });
      return;
    }

    const maNhanHang = generateMaNhanHang();

    const order = await prisma.$transaction(async (tx) => {
      let tongTienHang = 0;
      for (const item of cartItems) {
        tongTienHang += item.soLuong * item.productVariant.giaBan;
        
        // Atomic decrement with condition
        const updatedVariant = await tx.productVariant.updateMany({
          where: { 
            id: item.productVariantId,
            tonKho: { gte: item.soLuong }
          },
          data: { tonKho: { decrement: item.soLuong } }
        });

        if (updatedVariant.count === 0) {
          throw new Error(`Sản phẩm với cấu hình đã chọn không đủ tồn kho`);
        }
      }

      let tienGiamGia = 0;
      let voucherId = null;

      if (data.voucherCode) {
        const voucher = await tx.voucher.findUnique({ where: { maVoucher: data.voucherCode.toUpperCase() } });
        if (!voucher) {
          throw new Error('Mã voucher không tồn tại');
        }
        if (!voucher.isActive) {
          throw new Error('Mã voucher đã bị vô hiệu hóa');
        }
        const now = new Date();
        if (now < voucher.batDau || now > voucher.ketThuc) {
          throw new Error('Mã voucher không trong thời gian sử dụng');
        }

        // Calculate eligible items subtotal
        let eligibleSubtotal = 0;
        if (!voucher.apDungCho || voucher.apDungCho === 'tat_ca') {
          eligibleSubtotal = tongTienHang;
        } else if (voucher.apDungCho.startsWith('hang:')) {
          const targetBrand = voucher.apDungCho.replace('hang:', '').toLowerCase();
          eligibleSubtotal = cartItems
            .filter(item => item.productVariant.product.hang.toLowerCase() === targetBrand)
            .reduce((sum, item) => sum + item.soLuong * item.productVariant.giaBan, 0);
        } else if (voucher.apDungCho.startsWith('phan_khuc:')) {
          const targetSegment = voucher.apDungCho.replace('phan_khuc:', '').toLowerCase();
          eligibleSubtotal = cartItems
            .filter(item => item.productVariant.product.phanKhuc.toLowerCase() === targetSegment)
            .reduce((sum, item) => sum + item.soLuong * item.productVariant.giaBan, 0);
        }

        if (eligibleSubtotal === 0) {
          throw new Error('Đơn hàng không có sản phẩm nào thuộc phạm vi áp dụng của voucher');
        }

        if (eligibleSubtotal < voucher.donToiThieu) {
          throw new Error(`Tổng giá trị các sản phẩm được áp dụng voucher phải tối thiểu ${voucher.donToiThieu}đ`);
        }

        if (voucher.loaiGiamGia === 'PERCENTAGE') {
          tienGiamGia = Math.floor((eligibleSubtotal * voucher.giaTri) / 100);
          if (voucher.toiDaGiam && tienGiamGia > voucher.toiDaGiam) {
            tienGiamGia = voucher.toiDaGiam;
          }
        } else {
          tienGiamGia = voucher.giaTri;
        }

        if (tienGiamGia > eligibleSubtotal) tienGiamGia = eligibleSubtotal;
        voucherId = voucher.id;

        // Atomic update for voucher usage
        const updatedVoucher = await tx.voucher.updateMany({
          where: { 
            id: voucherId,
            daSuDung: { lt: voucher.soLuong }
          },
          data: { daSuDung: { increment: 1 } }
        });

        if (updatedVoucher.count === 0) {
          throw new Error('Mã voucher đã hết lượt sử dụng');
        }
      }

      const thanhTien = tongTienHang - tienGiamGia;

      // Create Order
      const newOrder = await tx.order.create({
        data: {
          userId,
          tongTienHang,
          voucherId,
          tienGiamGia,
          thanhTien,
          sdtLienHe: data.sdtLienHe,
          ghiChu: data.ghiChu,
          thoiGianHenLayHang: new Date(data.thoiGianHenLayHang),
          phuongThucThanhToan: data.phuongThucThanhToan,
          maNhanHang,
        }
      });

      // Create Order Items efficiently
      const orderItemsData = cartItems.map(item => ({
        orderId: newOrder.id,
        productVariantId: item.productVariantId,
        soLuong: item.soLuong,
        donGia: item.productVariant.giaBan,
      }));
      await tx.orderItem.createMany({ data: orderItemsData });

      // Create Activity Log
      await tx.orderActivityLog.create({
        data: {
          orderId: newOrder.id,
          hanhDong: 'Khách hàng đặt trước online (Click & Collect)',
          nguoiThucHienId: userId,
        }
      });

      // Clear Cart
      await tx.cartItem.deleteMany({
        where: data.cartItemIds ? { userId, id: { in: data.cartItemIds } } : { userId }
      });

      return newOrder;
    });

    // Send confirmation email
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (user && user.email) {
        const formatCurrency = (val: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
        const formatDateTime = (date: Date) => new Date(date).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

        let itemsHtml = `
          <table border="1" cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <thead>
              <tr style="background-color: #f3f4f6;">
                <th>STT</th>
                <th style="text-align: left;">Sản phẩm</th>
                <th>SL</th>
                <th style="text-align: right;">Đơn giá</th>
                <th style="text-align: right;">Tạm tính</th>
              </tr>
            </thead>
            <tbody>
        `;
        
        cartItems.forEach((item, index) => {
          const name = `${item.productVariant.product.sanPham} ${item.productVariant.dungLuongGb}GB - ${item.productVariant.mauSac}`;
          const price = formatCurrency(item.productVariant.giaBan);
          const total = formatCurrency(item.productVariant.giaBan * item.soLuong);
          itemsHtml += `
            <tr>
              <td style="text-align: center;">${index + 1}</td>
              <td>${name}</td>
              <td style="text-align: center;">${item.soLuong}</td>
              <td style="text-align: right;">${price}</td>
              <td style="text-align: right;">${total}</td>
            </tr>
          `;
        });
        
        itemsHtml += `</tbody></table>`;

        const htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111827;">
            <h2 style="color: #0ea5e9; text-align: center;">Xác nhận đơn hàng #${maNhanHang}</h2>
            <p>Xin chào <strong>${user.hoTen || user.email}</strong>,</p>
            <p>Cảm ơn bạn đã đặt hàng tại PhoneStore. Dưới đây là chi tiết đơn hàng của bạn:</p>
            
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 16px; background-color: #f9fafb; padding: 16px; border-radius: 8px;">
              <tr>
                <td width="50%" style="vertical-align: top;">
                  <h3 style="margin-top: 0; font-size: 16px;">Thông tin khách hàng</h3>
                  <p style="margin: 4px 0;"><strong>Họ tên:</strong> ${user.hoTen || 'Khách hàng'}</p>
                  <p style="margin: 4px 0;"><strong>Email:</strong> ${user.email}</p>
                  <p style="margin: 4px 0;"><strong>SĐT:</strong> ${data.sdtLienHe}</p>
                </td>
                <td width="50%" style="vertical-align: top;">
                  <h3 style="margin-top: 0; font-size: 16px;">Thời gian & Thanh toán</h3>
                  <p style="margin: 4px 0;"><strong>Ngày đặt:</strong> ${formatDateTime(order.createdAt)}</p>
                  <p style="margin: 4px 0; color: #0ea5e9;"><strong>Hẹn lấy:</strong> ${formatDateTime(order.thoiGianHenLayHang)}</p>
                  <p style="margin: 4px 0;"><strong>Thanh toán:</strong> ${data.phuongThucThanhToan === 'TienMat' ? 'Tiền mặt tại cửa hàng' : data.phuongThucThanhToan}</p>
                </td>
              </tr>
            </table>

            ${itemsHtml}

            <table width="100%" cellpadding="4" cellspacing="0" style="margin-top: 16px; font-size: 15px;">
              <tr>
                <td style="text-align: right; color: #6b7280;">Tổng tiền hàng:</td>
                <td style="text-align: right; width: 150px;">${formatCurrency(order.tongTienHang)}</td>
              </tr>
              ${order.tienGiamGia > 0 ? `
              <tr>
                <td style="text-align: right; color: #6b7280;">Khuyến mãi/Voucher (${data.voucherCode}):</td>
                <td style="text-align: right; color: #ef4444;">-${formatCurrency(order.tienGiamGia)}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="text-align: right; font-weight: bold; font-size: 18px;">Thành tiền:</td>
                <td style="text-align: right; font-weight: bold; font-size: 18px; color: #0ea5e9;">${formatCurrency(order.thanhTien)}</td>
              </tr>
            </table>

            <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px;">
              <p>Vui lòng đến cửa hàng nhận máy đúng giờ hẹn. Sau 24h từ thời điểm này, đơn hàng sẽ tự động hủy nếu bạn không đến nhận.</p>
              <p>Trân trọng,<br>Đội ngũ PhoneStore</p>
            </div>
          </div>
        `;

        await sendEmail(
          user.email,
          `Xác nhận đơn hàng ${maNhanHang} - PhoneStore`,
          htmlContent
        );
      }
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
    }

    res.status(201).json({ message: 'Đặt hàng thành công', order });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({ error: error.issues || error.errors });
    } else if (error.code === 'P2003') {
      res.status(401).json({ error: 'Tài khoản không hợp lệ hoặc đã bị xóa. Vui lòng đăng nhập lại.' });
    } else {
      // If it's our custom thrown error inside transaction, send it as 400
      if (error instanceof Error && (error.message.includes('tồn kho') || error.message.includes('voucher') || error.message.includes('Đơn hàng tối thiểu'))) {
        res.status(400).json({ error: error.message });
      } else {
        console.error(error);
        res.status(500).json({ error: 'Lỗi hệ thống nội bộ' });
      }
    }
  }
};

export const validateVoucher = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { voucherCode } = validateVoucherSchema.parse(req.body);

    const voucher = await prisma.voucher.findUnique({ where: { maVoucher: voucherCode.toUpperCase() } });
    if (!voucher) {
      res.status(404).json({ error: 'Mã voucher không tồn tại' });
      return;
    }

    if (!voucher.isActive) {
      res.status(400).json({ error: 'Mã voucher đã bị vô hiệu hóa' });
      return;
    }

    const now = new Date();
    if (now < voucher.batDau || now > voucher.ketThuc) {
      res.status(400).json({ error: 'Mã voucher không trong thời gian sử dụng' });
      return;
    }

    if (voucher.soLuong <= voucher.daSuDung) {
      res.status(400).json({ error: 'Mã voucher đã hết lượt sử dụng' });
      return;
    }

    res.status(200).json(voucher);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({ error: error.issues || error.errors });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Lỗi hệ thống nội bộ' });
    }
  }
};

export const getOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            productVariant: {
              select: { 
                dungLuongGb: true, mauSac: true, imageUrl: true,
                product: {
                  select: { sanPham: true }
                }
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json(orders);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi hệ thống nội bộ' });
  }
};

export const cancelOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const orderId = req.params.id;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true }
    });

    if (!order || order.userId !== userId) {
      res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
      return;
    }

    if (order.trangThai !== 'DA_DAT') {
      res.status(400).json({ error: 'Chỉ có thể hủy đơn hàng ở trạng thái Đã đặt' });
      return;
    }

    await prisma.$transaction(async (tx) => {
      const updatedOrder = await tx.order.updateMany({
        where: { id: orderId, trangThai: 'DA_DAT' },
        data: { trangThai: 'DA_HUY' }
      });

      if (updatedOrder.count === 0) {
        throw new Error('Chỉ có thể hủy đơn hàng ở trạng thái Đã đặt');
      }

      for (const item of order.items) {
        await tx.productVariant.update({
          where: { id: item.productVariantId },
          data: { tonKho: { increment: item.soLuong } }
        });
      }

      if (order.voucherId) {
        await tx.voucher.update({
          where: { id: order.voucherId },
          data: { daSuDung: { decrement: 1 } }
        });
      }

      await tx.orderActivityLog.create({
        data: {
          orderId: order.id,
          hanhDong: 'Khách hàng tự hủy đơn',
          nguoiThucHienId: userId,
        }
      });
    });

    res.status(200).json({ message: 'Đã hủy đơn hàng thành công' });
  } catch (error: any) {
    if (error instanceof Error && error.message.includes('trạng thái Đã đặt')) {
      res.status(400).json({ error: error.message });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Lỗi hệ thống nội bộ' });
    }
  }
};
