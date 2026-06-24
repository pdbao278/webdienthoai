# Implementation Plan: Milestone 3 - Admin & Vận hành

## Overview
Giai đoạn M3 tập trung vào việc xây dựng hệ thống quản trị (Admin Dashboard) và các công cụ vận hành. Bao gồm bảo mật route cho Admin/Manager, quản lý đơn hàng (có QR simulator), quản lý sản phẩm (CRUD & Cloudinary), quản lý Voucher, xem thống kê doanh thu, cùng với các tính năng tương tác của khách hàng như Đánh giá (Review) và So sánh sản phẩm.

## Architecture Decisions
- **Phân quyền (RBAC)**: Tách biệt rõ ràng quyền hạn giữa Manager (chỉ quản lý đơn hàng) và Admin (toàn quyền). Sử dụng middleware trên backend và route protection trên frontend.
- **Cloudinary Integration**: Xử lý upload ảnh sản phẩm từ client thông qua backend (hoặc trực tiếp nếu config token), và quan trọng nhất là phải dọn dẹp tài nguyên trên Cloudinary khi xóa sản phẩm (`cloudinary.v2.uploader.destroy`).
- **Review Schema**: Tạo mới bảng `reviews` liên kết với `Product` và `User`. Chỉ cho phép tạo review khi user có đơn hàng `HOAN_THANH` chứa sản phẩm đó.
- **QR Scanner Simulator**: Giao diện giả lập quét QR code trên Admin để test luồng vận hành tại quầy.

## Task List

### Phase 1: Admin Foundation & Order Operations
- [ ] **Task 1: Cấu hình Layout & Bảo mật Admin Route**
  - **Description**: Thiết lập layout chung cho trang `/admin` (sidebar, header). Viết middleware/guard bảo vệ routes frontend chỉ cho Manager và Admin.
  - **Acceptance criteria**:
    - [ ] `Customer` hoặc `Guest` truy cập `/admin` bị redirect về Home hoặc báo 403.
    - [ ] Giao diện Layout Admin hiển thị đúng theo mockup (Dashboard, Orders, Products, Vouchers, Users).
  - **Verification**: Login với các role khác nhau và test truy cập `/admin`.
  - **Dependencies**: None
  - **Estimated scope**: Medium

- [ ] **Task 2: API Quản lý Đơn hàng (Admin/Manager)**
  - **Description**: Viết API backend để liệt kê toàn bộ đơn hàng (có filter), cập nhật trạng thái đơn hàng và API xử lý khi quét QR xác nhận giao hàng.
  - **Acceptance criteria**:
    - [ ] GET `/api/admin/orders` hoạt động với phân trang và filter trạng thái.
    - [ ] PATCH `/api/admin/orders/:id/status` cập nhật trạng thái và ghi log vào `OrderActivityLog`.
    - [ ] POST `/api/admin/orders/scan` xử lý mã QR (mã nhận hàng) để đổi trạng thái sang Hoàn thành và trừ kho (nếu chưa trừ).
  - **Verification**: Postman hoặc unit test cho admin order routes.
  - **Dependencies**: None
  - **Estimated scope**: Medium

- [ ] **Task 3: UI Quản lý Đơn hàng & QR Simulator**
  - **Description**: Xây dựng trang `/admin/orders`, tích hợp các API trên. Làm modal giả lập máy quét QR.
  - **Acceptance criteria**:
    - [ ] Hiển thị danh sách đơn hàng dạng bảng.
    - [ ] Thay đổi trạng thái đơn hàng trực tiếp qua Dropdown.
    - [ ] Có nút mở QR Simulator, nhập mã để hoàn thành đơn.
  - **Verification**: Test end-to-end quét mã một đơn `CHO_NHAN_HANG` thành `HOAN_THANH`.
  - **Dependencies**: Task 1, Task 2
  - **Estimated scope**: Large

### Checkpoint: Order Operations
- [ ] Luồng vận hành đơn hàng (từ lúc đặt đến lúc giao thành công bằng QR) hoạt động mượt mà.

### Phase 2: Product Management (Admin Only)
- [ ] **Task 4: API Quản lý Sản phẩm & Cloudinary**
  - **Description**: Viết API thêm/sửa/xóa Product, ProductVariant, và ProductMedia. Tích hợp Cloudinary để upload/xóa ảnh.
  - **Acceptance criteria**:
    - [ ] POST/PATCH `/api/admin/products` tạo/cập nhật cấu hình sản phẩm và các biến thể.
    - [ ] DELETE `/api/admin/products/:id` xóa sản phẩm và gọi API Cloudinary để dọn dẹp ảnh.
    - [ ] API upload ảnh hỗ trợ resize và convert sang webp.
  - **Verification**: Test thêm và xóa sản phẩm, kiểm tra trên Cloudinary dashboard xem file có bị xóa không.
  - **Dependencies**: None
  - **Estimated scope**: Large

- [ ] **Task 5: UI Quản lý Sản phẩm**
  - **Description**: Xây dựng trang `/admin/products`. Danh sách sản phẩm và Form nhập liệu thêm/sửa sản phẩm đa biến thể.
  - **Acceptance criteria**:
    - [ ] Liệt kê sản phẩm đầy đủ.
    - [ ] Form thêm/sửa hỗ trợ upload ảnh và chọn cấu hình biến thể (RAM/ROM, màu).
  - **Verification**: Admin tự thêm một sản phẩm mới và ra trang chủ để kiểm tra.
  - **Dependencies**: Task 1, Task 4
  - **Estimated scope**: Large

### Phase 3: Vouchers & Statistics (Admin Only)
- [ ] **Task 6: API & UI Quản lý Voucher**
  - **Description**: CRUD Voucher phía backend và giao diện `/admin/vouchers`.
  - **Acceptance criteria**:
    - [ ] API bảo vệ nghiêm ngặt (chỉ ADMIN).
    - [ ] UI cho phép tạo/sửa/xóa mã giảm giá mới (loại, giá trị, số lượng, ngày hết hạn).
  - **Verification**: Tạo voucher mới và thử áp dụng tại giỏ hàng.
  - **Dependencies**: Task 1
  - **Estimated scope**: Medium

- [ ] **Task 7: Báo cáo Thống kê Doanh thu**
  - **Description**: Viết API tổng hợp doanh thu theo ngày/tuần/tháng và vẽ biểu đồ tại `/admin` (Dashboard).
  - **Acceptance criteria**:
    - [ ] API `/api/admin/stats` trả về số liệu tổng hợp.
    - [ ] Biểu đồ (Area chart/Bar chart) hiển thị trực quan tại `/admin`.
  - **Verification**: Xem dashboard hiển thị đúng số liệu đơn hàng đã hoàn thành.
  - **Dependencies**: Task 1
  - **Estimated scope**: Medium

### Checkpoint: Admin Core Features
- [ ] Admin quản lý được Sản phẩm, Voucher và xem được Thống kê dòng tiền.

### Phase 4: Customer Interactions (Reviews & Compare)
- [ ] **Task 8: Database Schema & API Đánh giá (Review)**
  - **Description**: Thêm model `Review` vào `schema.prisma`. Viết API cho Customer post review (validate điều kiện đã mua) và Manager/Admin kiểm duyệt.
  - **Acceptance criteria**:
    - [ ] Prisma migrated.
    - [ ] Khách hàng chỉ đánh giá được SP đã nằm trong đơn `HOAN_THANH`. Mỗi SP 1 lần đánh giá.
  - **Verification**: Viết test hoặc manual test case khách hàng review.
  - **Dependencies**: None
  - **Estimated scope**: Medium

- [ ] **Task 9: UI Đánh giá trên Trang Chi tiết Sản phẩm**
  - **Description**: Hiển thị danh sách đánh giá và form cho phép Customer nhập review + rating.
  - **Acceptance criteria**:
    - [ ] Form đánh giá hiển thị nếu thỏa điều kiện.
    - [ ] Hiển thị số sao trung bình của sản phẩm.
  - **Verification**: Xem trang chi tiết sản phẩm.
  - **Dependencies**: Task 8
  - **Estimated scope**: Medium

- [ ] **Task 10: Khối So Sánh Sản phẩm (Product Comparison)**
  - **Description**: UI so sánh cấu hình (Màn hình, Camera, Pin, v.v.) ở cuối trang chi tiết. Hỗ trợ tìm và chọn SP khác để đối chiếu (tối đa 4 SP).
  - **Acceptance criteria**:
    - [ ] Khung so sánh phẳng, hiển thị cấu hình dạng bảng lưới ngang.
    - [ ] Gõ tên SP để thêm vào bảng so sánh. Xóa SP khỏi bảng.
  - **Verification**: Test thêm 3 điện thoại vào so sánh và kiểm tra UI responsive.
  - **Dependencies**: None
  - **Estimated scope**: Medium

### Phase 5: User Management (Admin Only)
- [ ] **Task 11: API & UI Quản lý Người dùng**
  - **Description**: Xây dựng API (backend) và giao diện (frontend) cho phép Admin quản lý danh sách người dùng, cập nhật quyền (Role: CUSTOMER, MANAGER, ADMIN), và tìm kiếm người dùng.
  - **Acceptance criteria**:
    - [ ] API `GET /api/admin/users` liệt kê và phân trang người dùng (có filter/search theo email/tên).
    - [ ] API `PATCH /api/admin/users/:id/role` thay đổi role người dùng.
    - [ ] Giao diện `/admin/users` hiển thị danh sách người dùng và có chức năng thay đổi quyền, tìm kiếm.
  - **Verification**: Test với tài khoản Admin thay đổi quyền của tài khoản Customer thành Manager.
  - **Dependencies**: Task 1
  - **Estimated scope**: Medium

### Checkpoint: Complete
- [ ] All acceptance criteria met for Phase 1, 2, 3, 4, 5.
- [ ] Project builds correctly.
- [ ] Ready for human review.

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Quên xóa ảnh trên Cloudinary dẫn tới rác dữ liệu | Medium | Phải gọi `cloudinary.v2.uploader.destroy` trong transaction DELETE, bọc try-catch cẩn thận. |
| Complex form (Product + Variants) khó handle state | High | Tách nhỏ component, dùng `useFieldArray` của `react-hook-form` nếu cần, hoặc quản lý state bằng store local. |
| Truy vấn Thống kê chậm trên DB lớn | Low | Do là MVP, query trực tiếp. Tương lai có thể làm materialized view. Đánh index cột `created_at` trên `orders`. |
