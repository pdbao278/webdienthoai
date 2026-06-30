# Implementation Plan: M9 — Tính năng Mở rộng (Flash Sale)

## Tổng quan
Milestone 9 tập trung vào việc xây dựng hệ thống Flash Sale (FR-17). Hệ thống này cho phép Admin thiết lập các khung giờ giảm giá đặc biệt cho từng biến thể sản phẩm, tự động áp dụng giá khuyến mãi theo thời gian thực và hiển thị bộ đếm ngược trên trang chủ.

### Liên kết PRD
| FR | Tên | Priority |
|---|---|---|
| FR-17 | Quản Lý & Hiển Thị Flash Sale | P0 |

## Phân tích Hiện trạng (Gap Analysis)
### Đã có
- Hệ thống Product và ProductVariant đầy đủ.
- Hệ thống UI components cơ bản.
- Quyền Admin (RBAC) đã thiết lập.

### Thiếu
- **Database**: Chưa có bảng `FlashSale` và `FlashSaleItem`.
- **Backend API**: Chưa có các route CRUD cho Flash Sale (Admin) và API lấy Flash Sale public.
- **Backend Logic**: Logic tính giá tự động (thời gian thực) thay vì cronjob: khi query danh sách sản phẩm hoặc chi tiết, cần check xem variant đó có đang trong Flash Sale không, nếu có thì override `giaBan` bằng `giaFlashSale`.
- **Admin UI**: Giao diện Quản lý Flash Sale (CRUD khung giờ, thêm/bớt variant, set giá & số lượng).
- **Frontend UI**: Section Flash Sale trên trang chủ (Countdown Timer chống hydration mismatch, thẻ sản phẩm có progress bar).

## Quyết định Kiến trúc
1. **Database Schema**: 
   - `FlashSale` (id, ten, batDau, ketThuc, isActive, createdAt, updatedAt)
   - `FlashSaleItem` (id, flashSaleId, productVariantId, giaFlashSale, soLuong, daBan)
2. **Logic Giá (Tự động hóa)**: Tại API GET `/api/products` và `/api/products/:slug`, backend sẽ LEFT JOIN hoặc query các `FlashSaleItem` đang active (thời gian hiện tại nằm giữa `batDau` và `ketThuc`) cho các variants. Nếu khớp, `giaBan` sẽ bị đè bởi `giaFlashSale` và trả về thêm dữ liệu `flashSale: { daBan, soLuong }`.
3. **Countdown Timer**: Sử dụng custom hook `useCountdown` đảm bảo client-side rendering (tránh hydration error với việc chỉ bắt đầu đếm ngược sau khi component đã mounted).
4. **Cart/Checkout Logic**: Khi user thêm vào giỏ hoặc đặt hàng, backend phải lấy lại giá hiện tại. Vì logic tự động override giá dựa vào thời gian thực, backend sẽ tự lấy giá chuẩn (có thể là giá flash sale nếu còn giờ và còn số lượng). Đặc biệt cần cập nhật hàm tính giá giỏ hàng và kiểm tra tồn kho Flash Sale khi checkout (đồng thời tăng `daBan`).

## Danh sách Task

### Phase 1: Database & Foundation
- **Task 1: Cập nhật Prisma Schema & Migration**
  - Thêm model `FlashSale` và `FlashSaleItem` vào `schema.prisma`.
  - Chạy `npx prisma db push` (hoặc `migrate dev`) và `npx prisma generate`.
- **Task 2: Backend - Logic giá tự động (Real-time Pricing)**
  - Cập nhật service lấy sản phẩm (danh sách & chi tiết) để kiểm tra FlashSale hiện tại, override `giaBan` và gắn cờ `isFlashSale`.
  - Cập nhật logic checkout để kiểm tra và trừ/tăng `daBan` của FlashSaleItem nếu sản phẩm nằm trong đơn hàng.

### Checkpoint: Database & Foundation
- [ ] Database có schema mới.
- [ ] Test các API product trả về đúng `giaBan` đã được override khi có FlashSale active.

### Phase 2: Admin Operations
- **Task 3: Backend - API CRUD Flash Sale (Admin)**
  - Các endpoint `GET`, `POST`, `PUT`, `DELETE` cho `/api/admin/flash-sales`.
  - Hỗ trợ tạo Flash Sale kèm danh sách items (variantId, giaFlashSale, soLuong).
- **Task 4: Frontend - UI Quản lý Flash Sale**
  - Xây dựng trang `/admin/flash-sales`.
  - Form tạo/sửa Flash Sale có tính năng search và add `ProductVariant`, set `giaFlashSale`, `soLuong`.

### Checkpoint: Admin Operations
- [ ] Admin có thể tạo Flash Sale và thêm sản phẩm.
- [ ] Admin có thể xem danh sách Flash Sale theo trạng thái (Sắp diễn ra, Đang diễn ra, Đã kết thúc).

### Phase 3: Customer Discovery (Trang chủ)
- **Task 5: Backend - API Public Flash Sale**
  - API endpoint `/api/flash-sales/current` trả về Flash Sale đang diễn ra hoặc sắp tới gần nhất kèm chi tiết các mặt hàng.
- **Task 6: Frontend - Countdown Timer & Progress Bar UI**
  - Component `CountdownTimer` hiển thị Giờ : Phút : Giây, xử lý logic tick mỗi giây.
  - Component `FlashSaleProgressBar` hiển thị đồ họa đã bán/tổng, báo "Sắp cháy hàng" nếu >80%.
- **Task 7: Frontend - Tích hợp Flash Sale vào Trang chủ**
  - Đặt khu vực Flash Sale giữa 2 phần Banner trên trang chủ (`/` route).
  - Sử dụng layout vuốt ngang hoặc grid giới hạn hiển thị.

### Checkpoint: Customer Discovery
- [ ] Trang chủ hiển thị đúng khu vực Flash Sale nếu có sự kiện.
- [ ] Timer đếm ngược chính xác, không bị lỗi Hydration.

## Rủi ro & Giảm thiểu
- **Concurrency khi mua hàng**: Nhiều người mua cùng lúc có thể vượt quá `soLuong` của Flash Sale. 
  - *Mitigation*: Transaction lúc checkout phải lock và check `daBan + req.soLuong <= soLuong` đối với FlashSaleItem. Nếu vượt quá thì báo lỗi hoặc tính theo giá gốc cho phần dôi dư (giữ đơn giản: báo lỗi để KH load lại giỏ hàng).
- **Hydration Mismatch**: Countdown time render server khác với client.
  - *Mitigation*: Render skeleton/null ở server side, start timer `useEffect` sau khi mount ở client.

## Quyết định Xử lý Nghiệp vụ (Từ Feedback)
1. **Xử lý giỏ hàng khi hết giờ Flash Sale**: Tính giá tại thời điểm thao tác (refresh giỏ hàng) và lúc bấm Đặt hàng. Nếu hết giờ, giá tự động nhảy về giá gốc.
2. **Giới hạn số lượng mua Flash Sale**: Mỗi user chỉ được mua tối đa **1 sản phẩm** với giá Flash Sale cho mỗi biến thể. Nếu user chọn số lượng từ 2 trở lên, hệ thống sẽ tính giá: `(1 * giá_flash_sale) + ((số_lượng - 1) * giá_gốc)`. Logic này áp dụng cả trong Giỏ hàng và Checkout.
