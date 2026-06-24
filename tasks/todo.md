## Task 1: Cấu hình Monorepo & Khởi tạo dự án
**Description:** Khởi tạo cấu trúc npm workspaces, Next.js (frontend), Express (backend), và thư mục `shared`. Cài đặt các dependencies nền tảng (TypeScript, Prisma, Tailwind v4, Zod).
**Acceptance criteria:**
- [x] Root `package.json` định nghĩa workspaces `["web/frontend", "web/backend", "shared"]`.
- [x] Lệnh `npm run dev` ở root khởi chạy được cả frontend và backend (ví dụ qua `concurrently` hoặc built-in workspaces run).
- [x] Package `@phonestore/shared` có thể import thành công từ cả frontend và backend.
**Verification:**
- [x] `npm install` ở thư mục gốc chạy không lỗi.
- [x] Start dev server thành công cho các workspace.
**Dependencies:** None
**Files likely touched:** `package.json`, `web/frontend/package.json`, `web/backend/package.json`, `shared/package.json`
**Estimated scope:** M

## Task 2: Thiết kế Database Schema & Seed Data (M1)
**Description:** Xây dựng `schema.prisma` tại backend định nghĩa các model User, VerificationToken, Product, ProductMedia. Viết script seed dữ liệu để tạo khoảng 10-15 sản phẩm mẫu.
**Acceptance criteria:**
- [x] Prisma schema bao gồm đầy đủ các trường của `users`, `verification_tokens`, `products`, `product_media` theo yêu cầu PRD & SPEC.
- [x] Script seed dùng mock data hợp lý để tạo ít nhất 13 mẫu điện thoại với đầy đủ thông số.
**Verification:**
- [x] `npx prisma db push` hoặc `npx prisma migrate dev` chạy thành công.
- [x] `npx prisma db seed` chạy thành công, check database sinh ra dữ liệu.
**Dependencies:** 1
**Files likely touched:** `web/backend/prisma/schema.prisma`, `web/backend/prisma/seed.ts`
**Estimated scope:** M

## Task 3: API Xác thực (Backend) & Email Service
**Description:** Định nghĩa Zod schema cho Auth tại `shared`. Triển khai các routes và controllers tại backend cho quá trình Đăng ký, Đăng nhập, và Xác thực email. Tích hợp Brevo SDK/SMTP.
**Acceptance criteria:**
- [x] Zod schemas (register, login, verify) nằm ở `@phonestore/shared/src/schemas/auth.schema.ts`.
- [x] Endpoint `POST /api/auth/register` mã hóa password (bcrypt), sinh token và gửi email.
- [x] Endpoint `POST /api/auth/login` trả về JWT.
- [x] Endpoint `POST /api/auth/verify-email` xác nhận tài khoản.
**Verification:**
- [x] Unit test hoặc gọi API qua Postman xác nhận flow đăng nhập thành công.
**Dependencies:** 2
**Files likely touched:** `shared/src/schemas/auth.schema.ts`, `web/backend/src/routes/auth.routes.ts`, `web/backend/src/controllers/auth.controller.ts`, `web/backend/src/services/email.service.ts`
**Estimated scope:** L

## Task 4: Giao diện Xác thực (Frontend)
**Description:** Xây dựng các trang UI bằng Next.js cho Đăng ký, Đăng nhập và Xác thực Email. Tích hợp validation (Zod) và gọi API backend.
**Acceptance criteria:**
- [x] Giao diện `/(auth)/login`, `/(auth)/register`, `/(auth)/verify-email` mượt mà, theo phong cách Soft & Clean.
- [x] Form sử dụng React Hook Form + resolver Zod từ `shared`.
- [x] Khi đăng nhập thành công, lưu trạng thái xác thực và chuyển hướng về trang chủ.
**Verification:**
- [x] Mở trình duyệt, thực hiện luồng nhập form, xem validate lỗi, đăng nhập và vào trang chủ bình thường.
**Dependencies:** 3
**Files likely touched:** `web/frontend/src/app/(auth)/*`, `web/frontend/src/components/ui/*`, `web/frontend/src/lib/api-client.ts`
**Estimated scope:** M

## Task 5: API Sản phẩm & Tìm kiếm (Backend)
**Description:** Cung cấp API để frontend lấy thông tin sản phẩm (có filter) và tìm kiếm tự động (autocomplete).
**Acceptance criteria:**
- [x] Zod schema query params cho Product.
- [x] `GET /api/products` nhận filter (hang, gia, ram_gb...) và trả về dữ liệu phân trang.
- [x] `GET /api/products/:slug` lấy tiết sản phẩm và media.
- [x] `GET /api/search?q=` trả về danh sách gợi ý ngắn gọn.
**Verification:**
- [x] Test query `GET /api/products?hang=Samsung` trả về mảng sản phẩm.
**Dependencies:** 2
**Files likely touched:** `web/backend/src/routes/product.routes.ts`, `web/backend/src/controllers/product.controller.ts`, `web/backend/src/services/product.service.ts`, `shared/src/schemas/product.schema.ts`
**Estimated scope:** M

## Task 6: Giao diện Base Layout & Trang chủ (Frontend)
**Description:** Xây dựng root layout gồm Header (Mega Menu dọc cho điện thoại), Footer, và Trang chủ (Banner, Brand row, Grid nổi bật).
**Acceptance criteria:**
- [x] Header hiển thị menu dọc (HoangHa style) với các hãng Điện thoại khi hover. Khóa tính năng Laptop/Phụ kiện.
- [x] Trang chủ gọi `GET /api/products` để render Grid sản phẩm bán chạy/nổi bật.
- [x] Card sản phẩm tái sử dụng (`ProductCard.tsx`) thiết kế theo mockup.
**Verification:**
- [x] Mở trang chủ (`/`), đảm bảo responsive hiển thị đúng và hover menu mượt mà.
**Dependencies:** 5
**Files likely touched:** `web/frontend/src/app/layout.tsx`, `web/frontend/src/app/(shop)/page.tsx`, `web/frontend/src/components/layout/*`, `web/frontend/src/components/product/ProductCard.tsx`
**Estimated scope:** L

## Task 7: Giao diện Danh sách Sản phẩm & Bộ lọc (Frontend)
**Description:** Xây dựng trang `/phone` chứa lưới sản phẩm kết hợp thanh công cụ bộ lọc ngang và popup chuyên sâu.
**Acceptance criteria:**
- [ ] Trang `/phone` đồng bộ filter criteria với URL query params (ví dụ: `?hang=Apple&ram=8gb`).
- [ ] Nút lọc nhanh dạng dropdown và popup modal dạng "horizontal chips" theo DESIGN.md.
- [ ] Lưới sản phẩm tự động gọi lại API khi thay đổi tùy chọn bộ lọc.
**Verification:**
- [ ] Người dùng tick chọn hãng, giá trên UI -> lưới sản phẩm thay đổi tương ứng. Tải lại trang (F5) bộ lọc vẫn giữ nguyên.
**Dependencies:** 6
**Files likely touched:** `web/frontend/src/app/(shop)/phone/page.tsx`, `web/frontend/src/components/product/FilterBar.tsx`, `web/frontend/src/components/product/FilterModal.tsx`
**Estimated scope:** L

## Task 8: Giao diện Chi tiết Sản phẩm (Frontend)
**Description:** Trang chi tiết của một dòng máy (`/phone/[slug]`) với thư viện ảnh, spec table, và khối so sánh.
**Acceptance criteria:**
- [ ] Hiển thị hình ảnh slider đa phương tiện.
- [ ] Cột phải chứa giá, khuyến mãi, nút Add to Cart / Buy Now.
- [ ] Hiển thị bảng cấu hình máy đầy đủ.
- [ ] Giao diện khối so sánh tĩnh (cho M1) dưới chân trang theo DESIGN.md.
**Verification:**
- [ ] Truy cập `/phone/samsung-galaxy-s24-ultra` render đẹp trên desktop và mobile.
**Dependencies:** 7
**Files likely touched:** `web/frontend/src/app/(shop)/phone/[slug]/page.tsx`, `web/frontend/src/components/product/ProductGallery.tsx`, `web/frontend/src/components/product/ProductSpecs.tsx`, `web/frontend/src/components/product/CompareBox.tsx`
**Estimated scope:** M
