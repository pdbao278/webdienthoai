import { create } from 'zustand';
import { useAuthStore } from './useAuthStore';

interface CartItem {
  id: string;
  productId: string;
  soLuong: number;
  product: {
    id: string;
    sanPham: string;
    slug: string;
    giaBan: number;
    tonKho: number;
    media: { url: string }[];
  };
}

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, soLuong?: number) => Promise<void>;
  updateQuantity: (itemId: string, soLuong: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,
  clearCart: () => set({ items: [] }),
  fetchCart: async () => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Không thể tải giỏ hàng');
      const data = await res.json();
      set({ items: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  addToCart: async (productId, soLuong = 1) => {
    const token = useAuthStore.getState().token;
    if (!token) throw new Error('Vui lòng đăng nhập để thêm vào giỏ hàng');

    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId, soLuong })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi thêm vào giỏ hàng');

      await get().fetchCart();
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },
  updateQuantity: async (itemId, soLuong) => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_URL}/cart/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ soLuong })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi cập nhật số lượng');

      await get().fetchCart();
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },
  removeItem: async (itemId) => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_URL}/cart/${itemId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Lỗi xóa sản phẩm');
      }

      await get().fetchCart();
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  }
}));
