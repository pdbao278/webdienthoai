import { describe, it, expect } from 'vitest';
import { matchHeuristics } from './chat-heuristics';

describe('chat-heuristics', () => {
  it('returns shipping info for queries about delivery or shipping fees', () => {
    expect(matchHeuristics('Cho hỏi giao hàng thế nào?')).toContain('miễn phí giao hàng');
    expect(matchHeuristics('Phí ship bao nhiêu vậy')).toContain('miễn phí giao hàng');
  });

  it('returns warranty info for queries about warranty', () => {
    expect(matchHeuristics('Bảo hành máy bao lâu?')).toContain('bảo hành chính hãng 12 tháng');
  });

  it('returns payment info for queries about payment', () => {
    expect(matchHeuristics('Thanh toán bằng cách nào')).toContain('Click & Collect');
  });

  it('returns store address for queries about location', () => {
    expect(matchHeuristics('Địa chỉ cửa hàng ở đâu')).toContain('123 Đường 3/2');
    expect(matchHeuristics('Cửa hàng bạn nằm đâu')).toContain('123 Đường 3/2');
  });

  it('returns suggestions for brands', () => {
    expect(matchHeuristics('Có điện thoại apple không')).toContain('/phone?hang=Apple');
    expect(matchHeuristics('iphone 15')).toContain('/phone?hang=Apple');
    expect(matchHeuristics('Samsung galaxy')).toContain('/phone?hang=Samsung');
    expect(matchHeuristics('điện thoại xiaomi')).toContain('/phone?hang=Xiaomi');
  });

  it('returns null for unhandled queries', () => {
    expect(matchHeuristics('Xin chào')).toBeNull();
    expect(matchHeuristics('Sản phẩm này ngon không')).toBeNull();
  });
});
