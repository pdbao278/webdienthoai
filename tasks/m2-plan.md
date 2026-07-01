# Implementation Plan: M2 - Quản trị & Hiển thị Sản phẩm (Product Core)

## Overview
Milestone 2 xây dựng tính năng lõi cho sản phẩm: Admin quản lý sản phẩm với nhiều biến thể (RAM, Color) và upload ảnh lên Cloudinary. Customer có thể xem chi tiết sản phẩm.

## Dependency Graph
`Cloudinary Upload API` -> `Product Schema (Product, Variant, Media)` -> `Admin Product CRUD API` -> `Admin Product UI` -> `Customer Product Detail UI`

## Task List

### Phase 1: Storage & Database
- **Task 1: Cấu hình Cloudinary API**
  - API Routes để upload ảnh và chuyển đổi sang WebP. 
  - API xóa ảnh từ Cloudinary (`destroy`).
- **Task 2: Product & Variant Schema**
  - Prisma schema cho sản phẩm và biến thể. Ràng buộc soft-delete.

### Phase 2: Admin Product Management
- **Task 3: Admin Product API**
  - CRUD cho sản phẩm. Tự động sinh SKU.
- **Task 4: Admin Product UI (Form & Gallery)**
  - Giao diện thêm/sửa sản phẩm đa biến thể. Xử lý ảnh. 

### Phase 3: Customer Product View
- **Task 5: Product Detail Page API**
  - API trả về chi tiết sản phẩm.
- **Task 6: Product Detail UI (2-Step Selector)**
  - UI trang chi tiết với Gallery 4:3, chọn biến thể 2 bước (Cấu hình -> Màu sắc). Cập nhật URL `?v=...`.

## Checkpoints
- [x] Admin tạo thành công sản phẩm có ảnh.
- [x] Xóa ảnh/sản phẩm gọi Cloudinary delete.
- [x] Khách hàng xem trang chi tiết và đổi biến thể, giá tự động cập nhật.
