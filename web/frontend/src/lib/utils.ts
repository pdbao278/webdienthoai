export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}

export function calculateItemSubtotal(soLuong: number, giaBan: number, giaBanGoc?: number, hasFlashSale?: boolean): number {
  if (!hasFlashSale || !giaBanGoc || soLuong <= 1) {
    return soLuong * giaBan;
  }
  return giaBan + (soLuong - 1) * giaBanGoc;
}
