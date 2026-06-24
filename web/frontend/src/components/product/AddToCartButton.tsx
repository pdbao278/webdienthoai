'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function AddToCartButton({ productId }: { productId: string }) {
  const addToCart = useCartStore(state => state.addToCart);
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      await addToCart(productId, 1);
      toast.success('Đã thêm sản phẩm vào giỏ hàng');
    } catch (error: any) {
      if (error.message.includes('Vui lòng đăng nhập')) {
        toast.error('Bạn cần đăng nhập để thêm vào giỏ hàng');
        router.push('/login');
      } else {
        toast.error(error.message || 'Lỗi thêm vào giỏ hàng');
      }
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      className="w-full" 
      onClick={handleAddToCart}
      disabled={isAdding}
    >
      {isAdding ? 'Đang thêm...' : 'Thêm vào giỏ'}
    </Button>
  );
}
