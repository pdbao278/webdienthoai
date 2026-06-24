import { create } from 'zustand';
import { useAuthStore } from './useAuthStore';

interface CartItem {
  id: string;
  productVariantId: string;
  soLuong: number;
  productVariant: {
    id: string;
    sku: string;
    giaBan: number;
    tonKho: number;
    mauSac: string;
    dungLuongGb: number;
    imageUrl: string;
    product: {
      id: string;
      sanPham: string;
      slug: string;
      hang: string;
      phanKhuc: string;
    };
  };
}

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  voucherCode: string | null;
  discount: number;
  fetchCart: () => Promise<void>;
  addToCart: (productVariantId: string, soLuong?: number, overrideQuantity?: boolean) => Promise<void>;
  updateQuantity: (itemId: string, soLuong: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => void;
  setVoucher: (code: string | null, discount: number) => void;
  clearVoucher: () => void;
  selectedItemIds: string[];
  toggleItemSelection: (id: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
  setSelectedItems: (ids: string[]) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,
  voucherCode: null,
  discount: 0,
  selectedItemIds: [],
  clearCart: () => set({ items: [], voucherCode: null, discount: 0, selectedItemIds: [] }),
  setVoucher: (code, discount) => set({ voucherCode: code, discount }),
  clearVoucher: () => set({ voucherCode: null, discount: 0 }),
  toggleItemSelection: (id) => set((state) => {
    const isSelected = state.selectedItemIds.includes(id);
    return {
      selectedItemIds: isSelected 
        ? state.selectedItemIds.filter(i => i !== id) 
        : [...state.selectedItemIds, id]
    };
  }),
  selectAll: () => set((state) => ({ selectedItemIds: state.items.map(i => i.id) })),
  deselectAll: () => set({ selectedItemIds: [] }),
  setSelectedItems: (ids) => set({ selectedItemIds: ids }),
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
      set((state) => {
        // Remove selected items that are no longer in cart
        const validIds = data.map((i: any) => i.id);
        const newSelected = state.selectedItemIds.filter(id => validIds.includes(id));
        return { items: data, isLoading: false, selectedItemIds: newSelected };
      });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  addToCart: async (productVariantId, soLuong = 1, overrideQuantity = false) => {
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
        body: JSON.stringify({ productVariantId, soLuong, overrideQuantity })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi thêm vào giỏ hàng');

      await get().fetchCart();
      
      if (data.cartItem?.id) {
        set(state => ({
          selectedItemIds: state.selectedItemIds.includes(data.cartItem.id) 
            ? state.selectedItemIds 
            : [...state.selectedItemIds, data.cartItem.id]
        }));
      }
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
