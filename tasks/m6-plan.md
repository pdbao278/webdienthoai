# Implementation Plan: M6 - Đặt hàng & Lịch sử cá nhân (Checkout)

## Overview
Milestone 6 tập trung vào luồng checkout Click & Collect, yêu cầu người dùng thanh toán 100% tại quầy và lấy lịch hẹn nhận hàng. Cũng bao gồm việc tạo QR cho đơn và cho phép khách quản lý đơn của mình.

## Dependency Graph
`Order Schema` -> `Checkout API (Time Slot Validation, Order Creation)` -> `Checkout UI (Form & Date Picker)` -> `Customer Order Management UI`

## Task List

### Phase 1: Hẹn giờ & Checkout UI
- **Task 1: Order Schema & Checkout API**
  - Table Order, OrderItems. 
  - API xử lý đặt đơn, validate thời gian nhận không ở trong quá khứ.
- **Task 2: Checkout Form & Time Slot Picker**
  - Giao diện điền thông tin, Dropdown chọn ngày/khung giờ. Disabled các giờ đã qua.

### Phase 2: QR & Nhận diện
- **Task 3: Sinh QR Code Nhận hàng**
  - Tạo QR code sau khi đặt hàng thành công. Trả về trang cảm ơn.

### Phase 3: Customer Orders
- **Task 4: Customer Order History API & UI**
  - Khách hàng xem lịch sử các đơn hàng của mình.
- **Task 5: Customer Order Cancellation**
  - Nút Hủy đơn hiển thị nếu trạng thái là "Đã đặt". Tích hợp logic hủy quá hạn 24h.

## Checkpoints
- [x] Các khung giờ ở quá khứ trong Dropdown chọn giờ tự động bị mờ.
- [x] Đặt đơn thành công, giỏ hàng tự xóa, ra trang có mã QR.
- [x] Khách tự hủy đơn đang ở trạng thái "Đã đặt" thành công.
