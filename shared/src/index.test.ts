import { describe, it, expect } from 'vitest';
import { ping } from './index';

describe('shared module', () => {
  it('returns pong', () => {
    expect(ping()).toBe('pong');
  });
});
