# Implementation Plan: M3 - Khám phá & Danh mục (Discovery)

## Overview
Milestone 3 tập trung vào Trang chủ và Trang danh sách sản phẩm. Cung cấp trải nghiệm duyệt sản phẩm mượt mà với bộ lọc đa tiêu chí đồng bộ URL.

## Dependency Graph
`Product Fetch API` -> `Home Page Sections UI` -> `Product List API (Filter/Sort)` -> `Product List & Filter UI`

## Task List

### Phase 1: Home Page Discovery
- **Task 1: Home Page API & Data**
  - Lấy danh sách máy nổi bật, các hãng, và hero banner (cấu hình tĩnh).
- **Task 2: Home Page UI Components**
  - Banners, Logo cuộn ngang, Grid sản phẩm bán chạy (Product Card với giá của variant rẻ nhất).

### Phase 2: Product Catalog & Basic Filters
- **Task 3: Product List API**
  - Xử lý các tham số lọc: `hang`, `ram_gb`, `muc_gia`, v.v.
- **Task 4: Product List UI**
  - Grid danh sách sản phẩm và phân trang.

### Phase 3: Advanced Filtering & URL Sync
- **Task 5: Filter Component UI**
  - Thanh lọc ngang và Modal lọc (Chips design).
- **Task 6: URL State Synchronization**
  - Cập nhật URL Params khi chọn bộ lọc để cho phép chia sẻ link dễ dàng.

## Checkpoints
- [x] Trang chủ render mượt mà, layout chuẩn thiết kế.
- [x] Bộ lọc hoạt động chính xác với nhiều điều kiện kết hợp.
- [x] Tải lại trang (F5) khi đang lọc vẫn giữ nguyên kết quả do URL state.
