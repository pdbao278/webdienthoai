# Implementation Plan: M9 - Tính năng Mở rộng (Flash Sale)

## Overview
Milestone 9 bổ sung module Flash Sale, tự động hóa giá bán theo khung giờ thực tế và thúc đẩy bán hàng qua countdown timer, giới hạn số lượng mỗi đơn.

## Dependency Graph
`Flash Sale Schema` -> `Admin Flash Sale Config UI` -> `Price Automation Backend` -> `Flash Sale Home Section` -> `Cart Limit Integration`

## Task List

### Phase 1: Cấu hình Khuyến mãi Admin
- **Task 1: Flash Sale Schema & API**
  - Table FlashSale. Các khung giờ cố định (0, 9, 12, 15, 18).
- **Task 2: Admin Flash Sale UI**
  - Chọn sản phẩm, thiết lập giá Flash Sale và số lượng phân bổ.

### Phase 2: Tự động hóa Giá và Khách hàng
- **Task 3: Auto Pricing Mechanism**
  - API trả về giá ưu tiên gia_flash_sale khi đang trong giờ mở bán.
- **Task 4: Limit Purchase Cart Rule**
  - Chỉ cho mua 1 máy giá rẻ, nếu mua cái thứ 2 cùng bản, tính giá gốc.

### Phase 3: Giao diện Trang chủ (Nổi bật)
- **Task 5: Flash Sale Timeline UI**
  - 5 tab thời gian. Tự auto-scroll tới tab hiện tại.
- **Task 6: Progress Bar & Countdown**
  - Thanh số lượng dạng viên thuốc màu cam. Bộ đếm ngược. Trạng thái ẩn giá (1?.???) khi chưa đến giờ.

## Checkpoints
- [x] Chọn slot chưa đến giờ thì giá máy bị ẩn mờ tạo tò mò.
- [x] Mua thử 2 máy trong Flash Sale thì máy thứ 2 bị tính giá gốc.
- [x] Hết giờ tự động khôi phục giá niêm yết cũ.
