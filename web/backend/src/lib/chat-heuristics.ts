export function matchHeuristics(message: string): string | null {
  const normalized = message.toLowerCase();
  
  // Security / Injection Blocker
  const injectionKeywords = ['bỏ qua lệnh', 'ignore', 'prompt', 'bỏ qua các lệnh', 'quên đi lệnh', 'system prompt', 'đóng vai'];
  if (injectionKeywords.some(kw => normalized.includes(kw))) {
    return 'Xin lỗi, tôi chỉ có thể hỗ trợ bạn các thông tin liên quan đến sản phẩm và dịch vụ của cửa hàng PhoneStore.';
  }

  if (normalized.includes('giao hàng') || normalized.includes('phí ship')) {
    return 'PhoneStore miễn phí giao hàng cho mọi đơn hàng trị giá trên 5 triệu đồng. Các đơn hàng dưới 5 triệu sẽ có phí vận chuyển tùy thuộc vào vị trí của bạn.';
  }
  if (normalized.includes('bảo hành')) {
    return 'Tất cả điện thoại tại PhoneStore đều được bảo hành chính hãng 12 tháng. Bạn có thể mang máy ra bất kỳ trung tâm bảo hành nào của hãng hoặc mang đến cửa hàng PhoneStore để được hỗ trợ.';
  }
  if (normalized.includes('thanh toán')) {
    return 'PhoneStore áp dụng mô hình Click & Collect: bạn đặt hàng online và thanh toán trực tiếp (bằng tiền mặt hoặc chuyển khoản) khi đến nhận máy tại cửa hàng.';
  }
  if (normalized.includes('địa chỉ') || normalized.includes('cửa hàng') || normalized.includes('ở đâu')) {
    return 'PhoneStore hiện có chi nhánh trung tâm tại: 123 Đường 3/2, Phường 11, Quận 10, TP. Hồ Chí Minh. Giờ mở cửa từ 08:30 đến 21:30 hàng ngày.';
  }
  
  if (normalized.includes('apple') || normalized.includes('iphone')) {
    return 'PhoneStore cung cấp đầy đủ các dòng iPhone chính hãng. Bạn có thể xem chi tiết tại: <a href="/phone?hang=Apple" class="text-blue-600 hover:underline">Điện thoại Apple</a>';
  }
  if (normalized.includes('samsung') || normalized.includes('galaxy')) {
    return 'Khám phá ngay các mẫu Galaxy S, Galaxy Z mới nhất của Samsung tại: <a href="/phone?hang=Samsung" class="text-blue-600 hover:underline">Điện thoại Samsung</a>';
  }
  if (normalized.includes('xiaomi')) {
    return 'Bạn có thể xem các dòng máy Xiaomi với cấu hình cực tốt tại: <a href="/phone?hang=Xiaomi" class="text-blue-600 hover:underline">Điện thoại Xiaomi</a>';
  }

  return null;
}
