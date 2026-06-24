# Implementation Plan: Milestone 2 - Luồng Mua Sắm (Cart, Checkout, Orders)

## Overview
Giai đoạn M2 tập trung vào việc hoàn thiện luồng mua sắm cốt lõi cho mô hình Click & Collect. Bao gồm giỏ hàng lưu trữ trên database (yêu cầu đăng nhập), quá trình thanh toán nhận tại cửa hàng (chọn khung giờ, nhận mã QR), và quản lý lịch sử đơn hàng của khách hàng (bao gồm hủy đơn và nhận email thông báo).

## Architecture Decisions
- **Giỏ hàng lưu trong Database**: Khác với một số ứng dụng dùng localStorage, PhoneStore bắt buộc người dùng đăng nhập để thêm vào giỏ hàng nhằm đồng bộ dữ liệu xuyên thiết bị.
- **Thanh toán tại quầy 100%**: Đơn giản hóa MVP, không tích hợp cổng thanh toán online. Sử dụng vé nhận hàng (Receipt Ticket) với QR code (chứa mã đơn hàng).
- **Zustand cho Giỏ hàng**: Sử dụng Zustand kết hợp TanStack Query để đồng bộ trạng thái giỏ hàng giữa client và server mượt mà.
- **Trừ tồn kho (Inventory)**: Tồn kho chỉ được trừ khi xác nhận đặt hàng thành công, dùng Prisma transaction để tránh race condition.

## Task List

### Phase 1: Foundation & Cart
- [ ] **Task 1: Cấu trúc DB và API Giỏ hàng**
  - **Description**: Tạo/cập nhật bảng `cart_items` trong Prisma schema, viết các API route và controller (GET, POST, PATCH, DELETE) cho giỏ hàng.
  - **Acceptance criteria**:
    - [ ] `cart_items` table is properly defined and migrated.
    - [ ] CRUD APIs for cart work, require user authentication.
    - [ ] Cannot add to cart if `ton_kho <= 0`.
  - **Verification**: Chạy unit/integration test cho cart routes.
  - **Dependencies**: None
  - **Estimated scope**: Medium

- [ ] **Task 2: Frontend Zustand Store & Mini-Cart**
  - **Description**: Tạo store quản lý state giỏ hàng. Cập nhật header mini-cart để hiển thị số lượng realtime. Xử lý nút "Thêm vào giỏ" trên trang chi tiết sản phẩm.
  - **Acceptance criteria**:
    - [ ] Header shows correct cart item count based on user's DB state.
    - [ ] Clicking "Thêm vào giỏ" shows a success toast and optimistically updates the count.
  - **Verification**: Kiểm tra UI trên trang chủ và trang chi tiết sản phẩm.
  - **Dependencies**: Task 1
  - **Estimated scope**: Small

- [ ] **Task 3: Trang Giỏ hàng (`/cart`)**
  - **Description**: Xây dựng UI trang giỏ hàng dựa trên `mockup-html/cart.html`, cho phép thay đổi số lượng, xóa sản phẩm và tính tổng tiền.
  - **Acceptance criteria**:
    - [ ] UI matches the mockup, full responsiveness.
    - [ ] Updating qty triggers API PATCH and re-calculates total.
    - [ ] Deleting an item triggers API DELETE and removes from list.
  - **Verification**: Manual UI check on `/cart` page.
  - **Dependencies**: Task 2
  - **Estimated scope**: Medium

### Checkpoint: Foundation & Cart
- [ ] API giỏ hàng hoạt động ổn định.
- [ ] UI giỏ hàng đồng bộ hai chiều với database, trạng thái loading rõ ràng.

### Phase 2: Checkout (Click & Collect)
- [ ] **Task 4: Cấu trúc DB và API Đơn hàng**
  - **Description**: Cập nhật DB schema cho `orders`, `order_items`, `order_activity_log`, `vouchers`. Tạo API tạo đơn hàng, tính toán lại tổng tiền từ server, validate voucher và trừ tồn kho an toàn bằng transaction.
  - **Acceptance criteria**:
    - [ ] Order schema migrations applied.
    - [ ] API `/api/orders` POST accepts checkout request.
    - [ ] Voucher validates correctly (date, usage limit, min value).
    - [ ] Trừ `ton_kho` sản phẩm trong cùng 1 transaction.
  - **Verification**: Integration tests cho order creation flow.
  - **Dependencies**: Task 1
  - **Estimated scope**: Large

- [ ] **Task 5: UI Trang Thanh toán (`/checkout`)**
  - **Description**: Xây dựng UI form điền thông tin dựa trên `mockup-html/checkout.html` (SĐT, ghi chú, chọn khung giờ). Tích hợp gọi API tạo đơn.
  - **Acceptance criteria**:
    - [ ] UI matches the mockup layout.
    - [ ] Form validations strictly checked using Zod.
    - [ ] Khung giờ hẹn được giới hạn trong tối đa 3 ngày tới.
  - **Verification**: Submit form và kiểm tra log network.
  - **Dependencies**: Task 4
  - **Estimated scope**: Medium

- [ ] **Task 6: Order Success Modal & Clear Cart**
  - **Description**: Xử lý response đặt hàng thành công: hiển thị vé nhận hàng (QR Code) và gọi API dọn dẹp giỏ hàng.
  - **Acceptance criteria**:
    - [ ] Ticket modal appears with valid `ORD-XXXXXX` and QR Code graphic.
    - [ ] Giỏ hàng bị xóa sau khi tạo đơn thành công (Backend + Frontend store clear).
  - **Verification**: End-to-end checkout flow qua UI.
  - **Dependencies**: Task 5
  - **Estimated scope**: Small

### Checkpoint: Checkout Flow
- [ ] Khách hàng có thể đi trọn vẹn luồng từ Giỏ hàng -> Thanh toán -> Nhận vé QR.
- [ ] Database ghi nhận chính xác đơn hàng, log hoạt động và số lượng tồn kho giảm đúng.

### Phase 3: Order Management & Polish
- [ ] **Task 7: API Lịch sử đơn hàng, Hủy đơn & Cronjob**
  - **Description**: Viết API cho khách xem đơn của mình, hủy đơn (chỉ khi status = 'Đã đặt'). Thiết lập logic tự động hủy sau 24h.
  - **Acceptance criteria**:
    - [ ] GET `/api/orders` trả về lịch sử đơn của đúng user.
    - [ ] PATCH `/api/orders/:id/cancel` hủy đơn và hoàn lại tồn kho, lưu log.
    - [ ] Job chạy ngầm quét đơn quá 24h từ `thoi_gian_hen`.
  - **Verification**: Unit/integration tests cho luồng hủy đơn.
  - **Dependencies**: Task 4
  - **Estimated scope**: Medium

- [ ] **Task 8: UI Trang Lịch sử Đơn hàng (`/orders`)**
  - **Description**: Xây dựng UI xem danh sách đơn hàng dựa trên `mockup-html/orders.html`. Nút xem mã QR và nút Hủy đơn.
  - **Acceptance criteria**:
    - [ ] UI matches mockup.
    - [ ] Hủy đơn cập nhật trạng thái UI ngay lập tức.
    - [ ] Xem mã QR mở modal tương tự lúc checkout.
  - **Verification**: Check UI `/orders`.
  - **Dependencies**: Task 7
  - **Estimated scope**: Medium

- [ ] **Task 9: Tích hợp Email Thông báo (Brevo)**
  - **Description**: Gửi email xác nhận đặt hàng thành công (chứa mã đơn và thời gian hẹn) qua Brevo.
  - **Acceptance criteria**:
    - [ ] Email HTML template contains order details.
    - [ ] Dispatched synchronously or via simple background task on order creation.
  - **Verification**: Check mail inbox (using testing email or trap).
  - **Dependencies**: Task 4
  - **Estimated scope**: Small

### Checkpoint: Complete
- [ ] All acceptance criteria met for Phase 1, 2, and 3.
- [ ] Project builds correctly.
- [ ] Ready for human review.

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Xung đột tồn kho khi checkout đồng thời | High | Sử dụng Prisma transaction và row-level locking khi giảm `ton_kho`. |
| Lỗi khi call Brevo API làm rớt luồng order | Medium | Bọc gửi email trong `try-catch`, không throw error ra quá trình tạo đơn (lưu log lỗi để retry sau nếu cần). |
| Cronjob bị chạy trùng (nếu deploy serverless) | Medium | Dùng cờ báo trong DB hoặc chạy job qua một endpoint an toàn được trigger định kỳ thay vì chạy node-cron trong instance. |

## Open Questions
- Cách xử lý ảnh QR Code: Dùng thư viện sinh SVG/Canvas trên frontend hay backend sinh ra url? (Sẽ sử dụng thư viện frontend `qrcode.react` để vẽ mã QR từ `order_id` cho nhẹ backend).
