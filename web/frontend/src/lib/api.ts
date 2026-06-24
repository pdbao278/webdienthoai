/**
 * Helper tạo URL API — loại bỏ việc lặp lại ternary pattern khắp nơi.
 * @param path - Đường dẫn API (VD: '/admin/stats', '/products')
 */
export function getApiUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  return `${base}${path}`;
}

/**
 * Fetch có sẵn Authorization header.
 */
export async function authFetch(path: string, token: string, options: RequestInit = {}): Promise<Response> {
  return fetch(getApiUrl(path), {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * Fetch JSON có Authorization header.
 */
export async function authFetchJson(
  path: string,
  token: string,
  options: RequestInit = {}
): Promise<Response> {
  return fetch(getApiUrl(path), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}
