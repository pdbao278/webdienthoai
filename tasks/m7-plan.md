# Implementation Plan: M7 - Vận hành & Thống kê (Operations)

## Overview
Milestone 7 cung cấp công cụ cho Admin và Manager xử lý đơn hàng tại cửa hàng, đặc biệt là giả lập máy quét QR mã nhận hàng, và báo cáo doanh thu.

## Dependency Graph
`Admin Order List API` -> `Admin Order UI & QR Simulator` -> `Order Activity Logs` -> `Analytics Stats API` -> `Dashboard UI`

## Task List

### Phase 1: Order Operations
- **Task 1: Admin Order List API & Filtering**
  - Danh sách đơn hàng cho Admin/Manager.
- **Task 2: Order Management UI**
  - Modal chi tiết đơn hàng, chức năng đổi trạng thái nhanh.

### Phase 2: QR Simulator & Inventory Deduct
- **Task 3: Cập nhật Trạng thái & QR Scanner**
  - UI Modal nhập mã QR giả lập. 
  - Đổi trạng thái sang "Hoàn thành" và thực thi logic **trừ tồn kho**.

### Phase 3: Analytics Dashboard
- **Task 4: Stats Data API**
  - Aggregation API cho tổng doanh thu theo Ngày/Tuần/Tháng.
- **Task 5: Admin Dashboard UI**
  - Vẽ biểu đồ trực quan, hiển thị doanh thu. Phân quyền chỉ cho Admin (chặn Manager).

## Checkpoints
- [x] Quét mã QR chuyển trạng thái đơn hàng thành công.
- [x] Tồn kho tự động trừ đi số lượng máy khi đơn đổi thành "Hoàn thành".
- [x] Biểu đồ thống kê phản ánh chính xác các đơn hàng vừa hoàn thành.
