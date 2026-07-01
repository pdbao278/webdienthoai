import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import Banner from '../Banner';

describe('Banner', () => {
  afterEach(cleanup);

  it('renders title and description', () => {
    render(<Banner title="Khuyến Mãi" description="Giảm giá 50%" ctaText="Mua ngay" />);
    expect(screen.getByText('Khuyến Mãi')).toBeDefined();
    expect(screen.getByText('Giảm giá 50%')).toBeDefined();
    expect(screen.getByText('Mua ngay')).toBeDefined();
  });

  it('defaults href to / if not provided or invalid', () => {
    const { rerender } = render(<Banner title="Test" description="Test desc" />);
    // Check if the link has href="/" when not provided
    expect(screen.getByRole('link').getAttribute('href')).toBe('/');

    rerender(<Banner title="Test" description="Test desc" href="#" />);
    expect(screen.getByRole('link').getAttribute('href')).toBe('/');

    rerender(<Banner title="Test" description="Test desc" href="" />);
    expect(screen.getByRole('link').getAttribute('href')).toBe('/');
  });
});
