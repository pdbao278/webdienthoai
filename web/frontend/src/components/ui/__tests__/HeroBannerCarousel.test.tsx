import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import HeroBannerCarousel from '../HeroBannerCarousel';

describe('HeroBannerCarousel', () => {
  afterEach(cleanup);

  it('renders active flagship slide title and description correctly', () => {
    render(<HeroBannerCarousel />);
    
    // Check if the first slide title is present on load
    expect(screen.getByText('iPhone 16 Pro Max - Đỉnh cao Titan')).toBeDefined();
    expect(screen.getByText('Trải nghiệm chip Apple A18 Pro siêu mạnh mẽ, màn hình 6.9 inch tuyệt mỹ cùng camera cải tiến vượt bậc.')).toBeDefined();
  });

  it('contains the correct Cloudinary product images for all slides', () => {
    const { container } = render(<HeroBannerCarousel />);
    
    const images = container.querySelectorAll('img');
    const imageUrls = Array.from(images).map(img => img.getAttribute('src'));

    expect(imageUrls).toContain('https://res.cloudinary.com/dw9catzob/image/upload/v1782227152/phonestore/products/Apple/iphone-16-pro-max-256gb/front.webp');
    expect(imageUrls).toContain('https://res.cloudinary.com/dw9catzob/image/upload/v1782227546/phonestore/products/Samsung/galaxy-s26-ultra-256gb/front.webp');
    expect(imageUrls).toContain('https://res.cloudinary.com/dw9catzob/image/upload/v1782227695/phonestore/products/Xiaomi/xiaomi-16-ultra-512gb/front.webp');
  });
});
