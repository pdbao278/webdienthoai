# M9 — TODO: Tính năng Mở rộng (Flash Sale)

## Phase 1: Database & Foundation
- [x] Task 1: Cập nhật Prisma Schema (`FlashSale`, `FlashSaleItem`) & run migration
- [x] Task 2: Backend — Logic giá tự động (override `giaBan` thời gian thực trên API Product, Cart, Checkout)

### Checkpoint: Database & Foundation
- [ ] Database có schema mới.
- [ ] API lấy sản phẩm tự override giá thành công khi có Flash Sale.

## Phase 2: Admin Operations
- [x] Task 3: Backend — API CRUD Flash Sale (`/api/admin/flash-sales`)
- [x] Task 4: Frontend — UI Quản lý Flash Sale (`/admin/flash-sales`)

### Checkpoint: Admin Operations
- [ ] Admin CRUD được các chiến dịch Flash Sale và Variants kèm theo.

## Phase 3: Customer Discovery (Trang chủ)
- [x] Task 5: Backend — API Public Flash Sale (`/api/flash-sales/current`)
- [x] Task 6: Frontend — UI Components (`CountdownTimer`, `FlashSaleProgressBar`)
- [x] Task 7: Frontend — Tích hợp Section Flash Sale vào Trang chủ (giữa 2 Banner)

### Checkpoint: Customer Discovery & Final Polish
- [ ] Trang chủ hiển thị Flash Sale với đếm ngược mượt mà.
- [ ] Ready for review M9.
