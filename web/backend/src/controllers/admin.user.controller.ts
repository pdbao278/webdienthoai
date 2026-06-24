import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { updateUserRoleSchema } from '@phonestore/shared';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = '1', limit = '10', search = '' } = req.query;
    const pageNumber = parseInt(page as string, 10) || 1;
    const pageSize = parseInt(limit as string, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;

    const whereClause: any = {};
    if (search) {
      whereClause.OR = [
        { email: { contains: search as string, mode: 'insensitive' } },
        { hoTen: { contains: search as string, mode: 'insensitive' } },
        { sdt: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: whereClause,
        select: {
          id: true,
          email: true,
          hoTen: true,
          sdt: true,
          role: true,
          emailVerified: true,
          createdAt: true,
        },
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where: whereClause }),
    ]);

    res.status(200).json({
      success: true,
      data: users,
      meta: {
        total,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, error: 'Lỗi hệ thống nội bộ' });
  }
};

export const updateUserRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const validatedData = updateUserRoleSchema.parse(req.body);

    const user = await prisma.user.update({
      where: { id },
      data: { role: validatedData.role },
      select: {
        id: true,
        email: true,
        hoTen: true,
        sdt: true,
        role: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({ success: false, error: error.issues });
    } else if (error.code === 'P2025') {
      res.status(404).json({ success: false, error: 'Không tìm thấy người dùng' });
    } else {
      console.error('Error updating user role:', error);
      res.status(500).json({ success: false, error: 'Lỗi hệ thống nội bộ' });
    }
  }
};
