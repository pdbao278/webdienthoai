# Implementation Plan: M4 - Tìm kiếm & So sánh (Search & Compare)

## Overview
Milestone 4 nâng cao khả năng ra quyết định mua hàng bằng thanh tìm kiếm toàn cục có autocomplete và tính năng so sánh cấu hình thông minh.

## Dependency Graph
`Search API (Fulltext/Like)` -> `Header Search UI` -> `Compare Suggestions API (Heuristics)` -> `Compare Widget UI`

## Task List

### Phase 1: Global Search
- **Task 1: Autocomplete Search API**
  - Tìm kiếm nhanh sản phẩm theo tên và hãng.
- **Task 2: Header Search Bar UI**
  - Thanh tìm kiếm hiển thị dropdown kết quả real-time. Debounce API calls.

### Phase 2: Search on Catalog
- **Task 3: Kết hợp Tìm kiếm & Lọc**
  - Đảm bảo từ khóa `q` tương thích với các bộ lọc ở M3 trên trang danh sách.

### Phase 3: Smart Quick Compare
- **Task 4: Thuật toán Gợi ý So sánh API**
  - Sử dụng rule-based heuristics (giá ±15%, cùng hãng/cấu hình) để gợi ý sản phẩm so sánh.
- **Task 5: Compare Widget & Table UI**
  - Giao diện khay so sánh (tối đa 4 sản phẩm) và bảng đối chiếu cấu hình nằm ngang chi tiết.

## Checkpoints
- [x] Gõ từ khóa vào thanh tìm kiếm sổ ra kết quả nhanh chóng.
- [x] Khay so sánh có thể thêm bớt sản phẩm mà không lỗi.
- [x] Bảng so sánh hiển thị thông số thẳng hàng.
