# Implementation Plan: M5 - Khuyến mãi & Giỏ hàng (Promo & Cart)

## Overview
Milestone 5 xử lý logic giỏ hàng (yêu cầu đăng nhập, giới hạn số lượng chống đầu cơ) và tích hợp các loại mã giảm giá linh hoạt (Vouchers).

## Dependency Graph
`Cart Schema` -> `Voucher Schema` -> `Admin Voucher API` -> `Customer Cart API` -> `Voucher Validation Logic` -> `Cart UI`

## Task List

### Phase 1: Giỏ hàng Core
- **Task 1: Cart Schema & API**
  - Table Cart, CartItems. API Thêm, Sửa, Xóa mục trong giỏ.
  - Giới hạn không quá 5 sản phẩm cùng phiên bản.
- **Task 2: Mini-cart & Cart UI**
  - Giao diện giỏ hàng header và trang chi tiết giỏ hàng.

### Phase 2: Quản lý Khuyến mãi
- **Task 3: Voucher Schema & Admin API**
  - Table Voucher (code, discount_type, max_discount, min_order_value).
  - CRUD API cho Admin.
- **Task 4: Admin Voucher UI**
  - Giao diện tạo/sửa voucher với phạm vi áp dụng linh hoạt (hãng, danh mục).

### Phase 3: Áp dụng Voucher vào Giỏ
- **Task 5: Reactive Voucher Validation**
  - API tính toán lại tổng tiền khi số lượng thay đổi hoặc áp mã. Hủy voucher nếu không đạt "đơn tối thiểu".
- **Task 6: Tóm tắt đơn hàng & Nhập mã UI**
  - Form nhập mã giảm giá, hiển thị số tiền được giảm rõ ràng trên UI.

## Checkpoints
- [x] Chỉ người dùng đăng nhập mới được thêm vào giỏ.
- [x] Thêm quá 5 máy 1 phiên bản sẽ bị cảnh báo.
- [x] Voucher được áp dụng đúng, và tự động hủy nếu bớt sản phẩm khỏi giỏ làm giảm tổng tiền.
