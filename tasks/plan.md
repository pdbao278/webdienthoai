# Implementation Plan: PhoneStore Milestone 1 (Nền tảng & Danh mục)

## Overview
Xây dựng nền tảng cơ bản cho hệ thống thương mại điện tử Click & Collect PhoneStore. Trọng tâm của Milestone 1 (M1) bao gồm thiết lập cấu trúc monorepo, sơ đồ cơ sở dữ liệu, dữ liệu mẫu, giao diện cốt lõi (Trang chủ, Trang danh sách + bộ lọc, Trang chi tiết), và luồng xác thực người dùng (đăng nhập/đăng ký/kích hoạt email).

## Architecture Decisions
- **Kiến trúc Monorepo**: Dùng npm workspaces quản lý 3 packages (`web/frontend`, `web/backend`, `shared`).
- **Frontend**: Next.js 16+ (App Router), Zustand (Client state), TanStack Query (Data fetching), Tailwind CSS v4. UI sử dụng phong cách Soft & Clean.
- **Backend**: Node.js/Express, Prisma ORM, PostgreSQL (Neon serverless).
- **Validation**: Zod validation chia sẻ ở cả 2 phía qua `@phonestore/shared`.
- **Auth**: JWT tạo từ Backend, Frontend lưu ở httpOnly cookie (hoặc Bearer token).
- **Email**: Sử dụng Brevo SMTP cho email kích hoạt tài khoản.

## Task List

### Phase 1: Foundation
- [x] Task 1: Cấu hình Monorepo & Khởi tạo dự án
- [x] Task 2: Thiết kế Database Schema & Seed Data (M1)

### Checkpoint: Foundation
- [x] Cấu trúc workspaces hoạt động ổn định (`npm run dev` chạy đồng thời).
- [x] Schema database (Prisma) được push thành công và có dữ liệu seed ban đầu.

### Phase 2: Authentication
- [x] Task 3: API Xác thực (Backend) & Email Service
- [x] Task 4: Giao diện Xác thực (Frontend)

### Checkpoint: Authentication
- [x] Flow Đăng ký -> Nhận email -> Xác thực email -> Đăng nhập hoạt động end-to-end trên UI.
- [x] Token JWT được bảo mật an toàn.

### Phase 3: Product Catalog
- [x] Task 5: API Sản phẩm & Tìm kiếm (Backend)
- [x] Task 6: Giao diện Base Layout & Trang chủ (Frontend)
- [x] Task 7: Giao diện Danh sách Sản phẩm & Bộ lọc (Frontend)
- [ ] Task 8: Giao diện Chi tiết Sản phẩm (Frontend)

### Checkpoint: Complete M1
- [ ] Các trang `/`, `/phone`, `/phone/[slug]` hiển thị đầy đủ, responsive tốt và gọi API thành công.
- [ ] Tính năng Lọc kết hợp URL query params hoạt động mượt mà.
- [ ] Sẵn sàng để chuyển sang Milestone 2 (Giỏ hàng & Checkout).

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Cấu hình Tailwind v4 và Next.js bị xung đột | High | Thiết lập chuẩn xác `globals.css` theo docs của Tailwind v4, chú ý cơ chế tự nhận file css thay cho `tailwind.config.js`. |
| Query Database qua Prisma chậm do nhiều filters | Med | Đảm bảo tạo index trên các trường thường dùng lọc (hang, gia_ban, ram_gb) trong schema. |
| Brevo SMTP block email vì nghi ngờ spam | Low | Dùng địa chỉ email test ổn định, đảm bảo tuân thủ số lượng < 300 mail/ngày của gói Free. |

## Open Questions
- Cần có domain test cho việc setup Callback URL của email hay dùng tạm `localhost:3000`? (Giả định tạm: dùng `http://localhost:3000` cho môi trường dev).
