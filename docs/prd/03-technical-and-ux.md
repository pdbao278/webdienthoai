# 03 TECHNICAL AND UX

## 7. Non-Functional Requirements

| ID | Yêu cầu | Chi tiết |
|---|---|---|
| NFR-01 | Performance | LCP < 2s, Lighthouse > 90. Tối ưu ảnh (Cloudinary & Next/Image). |
| NFR-02 | SEO & Accessibility | WCAG AA. SSR/SSG cho trang chi tiết/danh mục. JSON-LD Product schema. |
| NFR-03 | Security | bcrypt password hash. CSRF, Rate Limiting cho API. Zod validate toàn bộ input. |
| NFR-04 | Responsive | Mobile-first, tương thích 375px → 1920px. |

---

## 8. Edge Cases và Error States

| Tình huống | Hành vi kỳ vọng |
|---|---|
| Sản phẩm hết hàng | Nút "Mua ngay" Disabled, hiển thị "Hết hàng". |
| Access trang Admin bằng tài khoản Customer | Trả về 403 Forbidden hoặc redirect về Home. |
| Đơn hàng quá hạn 24h không đến nhận | Hệ thống tự động hủy, hoàn tồn kho, gửi email thông báo. |
| User chưa xác thực email cố đặt hàng | Chặn checkout, hiển thị thông báo yêu cầu xác thực email. |
| Voucher áp dụng vượt quá giá trị sản phẩm hợp lệ | Mức giảm tối đa được giới hạn bằng `eligibleSubtotal` (tổng phụ của các sản phẩm hợp lệ), không phải toàn bộ giỏ hàng. Tránh việc voucher hãng A trợ giá cho hãng B. |
| Khách hàng tự hủy đơn hàng có voucher | Hệ thống phải hoàn lại cả `tonKho` cho sản phẩm và trừ đi 1 lượt `daSuDung` cho voucher. |
| Admin chuyển đơn hàng sang `DA_HUY` | Hệ thống bắt buộc phải khôi phục `tonKho` và hoàn lại 1 lượt `daSuDung` cho voucher để tránh thất thoát. |
| Admin xóa voucher đang nằm trong đơn hàng cũ | Chuyển sang cơ chế Soft Delete: Vô hiệu hóa voucher (`isActive = false`) thay vì xóa vật lý (trả về 200 OK). Không được phép xóa vĩnh viễn vì Prisma mặc định `SetNull` sẽ làm mất dữ liệu `voucherId` trong lịch sử đơn hàng. |

---

## 9. Dependencies và Constraints

### 9.1 External APIs & Services

| Dịch vụ | Mục đích | Yêu cầu |
|---|---|---|
| **Neon Tech** | Serverless PostgreSQL | Connection String |
| **Brevo** | SMTP email (kích hoạt tài khoản, xác nhận đơn, reset password) | API Key & SMTP Settings |
| **Cloudinary** | Lưu trữ & tối ưu hình ảnh/video sản phẩm | Cloud name, API Key & Secret |
| **Google Gemini API** | NLP cho Chatbot tư vấn | Gemini API Key |
| **Vercel** | Hosting, CI/CD, Serverless Functions | Git Repository liên kết |

### 9.2 Constraints
- Dùng Zustand (không Redux) cho Client State.
- UI mặc định Tiếng Việt.
- MVP tập trung 1 chi nhánh (Single-store).

---

## 10. UX Design Notes
- **Màu sắc:** Slate nền, Sky Blue primary, Teal/Rose điểm nhấn — concept "Soft & Clean".
- **Micro-interactions:** Hover card trượt nhẹ lên (Y-axis), bóng mờ nhẹ (`shadow-sm`).
- **Navigation:** Mega menu dọc (HoangHa Style), bộ lọc ngang Dropdown/Popover (Thegioididong Style).

---

## 11. Tech Stack đề xuất

> **Kiến trúc: Monorepo (2 folders)** — Frontend và Backend tách biệt trong cùng 1 Git repository.

```
webdienthoai/
├── web/
│   ├── frontend/        # Next.js 16+ (App Router) — Giao diện người dùng
│   ├── backend/         # Node.js + Express/Fastify — REST API Server
│   └── shared/          # Zod schemas, types, constants dùng chung
├── package.json         # Root — npm workspaces
└── ...
```

### Frontend (`web/frontend`)
- **Framework:** Next.js 16+ (App Router) + TypeScript
- **Styling:** Tailwind CSS v4
- **State:** Zustand (client state) + TanStack Query (server state, gọi API backend)
- **Validation:** Zod (form validation phía client)
- **Deploy:** Vercel

### Backend (`web/backend`)
- **Runtime:** Node.js + Express hoặc Fastify + TypeScript
- **ORM:** Prisma
- **Database:** Neon (Serverless PostgreSQL)
- **Auth:** JWT + bcrypt (hoặc Passport.js)
- **Email:** Brevo (SMTP)
- **Media:** Cloudinary SDK (upload/delete ảnh WebP)
- **AI:** @google/generative-ai (Gemini API — Chatbot)
- **Validation:** Zod (server-side input validation)
- **Deploy:** Railway / Render / VPS

### Shared (`web/shared`)
- Zod schemas dùng chung giữa frontend và backend
- TypeScript types/interfaces
- Constants (enums, config values)

### Database Schema chi tiết (Detailed Schema)

#### 1. Nhóm Người dùng & Xác thực (Auth & Users)
| Bảng | Trường | Kiểu | Mô tả / Ràng buộc |
|---|---|---|---|
| **users** | id | UUID | Khóa chính |
| | email | VARCHAR | Unique |
| | email_verified | TIMESTAMP | Thời điểm xác thực OTP thành công |
| | password_hash | VARCHAR | bcrypt hash |
| | ho_ten | VARCHAR | Họ và tên khách hàng |
| | so_dien_thoai | VARCHAR | Bắt buộc đối với Customer |
| | role | ENUM | `CUSTOMER`, `MANAGER`, `ADMIN` |
| | created_at, updated_at | TIMESTAMP | |
| **verification_tokens** | identifier | VARCHAR | Email của người dùng |
| | token | VARCHAR | OTP 6 số |
| | expires | TIMESTAMP | Thời hạn 60 giây |

#### 2. Nhóm Sản phẩm (Catalog)
| Bảng | Trường | Kiểu | Mô tả / Ràng buộc |
|---|---|---|---|
| **products** | id | UUID | Khóa chính |
| *(Sản phẩm gốc)* | slug | VARCHAR | Unique, SEO-friendly (VD: `samsung-galaxy-s24`) |
| | hang | VARCHAR | Samsung, Apple, Xiaomi, OPPO... |
| | san_pham | VARCHAR | Tên sản phẩm gốc (không chứa dung lượng) |
| | phan_khuc | ENUM | `FLAGSHIP`, `TAM_TRUNG`, `PHO_THONG`, `GAMING` |
| | mo_ta | TEXT | Bài viết mô tả sản phẩm |
| | is_active | BOOLEAN | Soft-delete (Khả dụng / Đã ngừng kinh doanh) |
| | *[Các trường thông số]* | Khác nhau | Xem chi tiết thông số Màn hình, Camera, Chip, Pin... |
| **product_variants** | id | UUID | Khóa chính |
| *(Biến thể)* | product_id | UUID | Foreign Key -> `products(id)` (ON DELETE CASCADE) |
| | sku | VARCHAR | Unique. Format tự sinh: `[slug]-[ram]-[rom]-[colorIndex]` |
| | ram_gb | INTEGER | Dung lượng RAM (VD: 8, 12) |
| | dung_luong_gb | INTEGER | Dung lượng ROM (VD: 128, 256) |
| | mau_sac | VARCHAR | Tên màu (VD: "Titan Tự Nhiên") |
| | image_url | VARCHAR | Cloudinary URL (Ảnh đại diện của màu này) |
| | gia_goc | DECIMAL | Giá niêm yết (chưa giảm) |
| | gia_ban | DECIMAL | Giá bán thực tế (đã giảm) |
| | ton_kho | INTEGER | Số lượng tồn kho thực tế (Tự trừ khi có đơn) |
| **product_media** | id, product_id | UUID | Quản lý gallery ảnh/video chung của Product |
| | url | VARCHAR | Cloudinary secure_url |
| | loai | ENUM | `image` hoặc `video` |
| | thu_tu | INTEGER | Thứ tự hiển thị (Order) |

#### 3. Nhóm Mua sắm & Khuyến mãi (Shopping & Promo)
| Bảng | Trường | Kiểu | Mô tả / Ràng buộc |
|---|---|---|---|
| **cart_items** | id | UUID | Khóa chính |
| | user_id | UUID | Foreign Key -> `users(id)` |
| | product_variant_id| UUID | Foreign Key -> `product_variants(id)` |
| | so_luong | INTEGER | Ràng buộc: `so_luong <= 5` và `<= ton_kho` |
| **vouchers** | id | UUID | Khóa chính |
| | ma_voucher | VARCHAR | Unique, luôn viết HOA (VD: `GIAM100K`) |
| | loai_giam_gia | ENUM | `PERCENT` (%) hoặc `FIXED` (VNĐ) |
| | gia_tri | DECIMAL | Giá trị giảm (Ví dụ: 10 hoặc 100000) |
| | toi_da_giam | DECIMAL | Mức giảm tối đa (Áp dụng cho loại `PERCENT`) |
| | don_toi_thieu | DECIMAL | Áp dụng trên tổng tiền của sản phẩm hợp lệ |
| | ap_dung_cho | VARCHAR | `tat_ca`, `hang:Apple`, `phan_khuc:GAMING` |
| | bat_dau, ket_thuc | TIMESTAMP | Thời gian hiệu lực |
| | so_luong, da_su_dung| INTEGER | Giới hạn số lượng (Xử lý atomic concurrency) |
| | is_active | BOOLEAN | Soft-delete cho Voucher |

#### 4. Nhóm Đơn hàng & Vận hành (Orders)
| Bảng | Trường | Kiểu | Mô tả / Ràng buộc |
|---|---|---|---|
| **orders** | id | UUID | Khóa chính |
| | user_id | UUID | Foreign Key -> `users(id)` |
| | voucher_id | UUID | Foreign Key -> `vouchers(id)` (Nullable) |
| | tong_tien_hang | DECIMAL | Tổng tiền trước giảm giá |
| | tien_giam_gia | DECIMAL | Số tiền được giảm từ Voucher |
| | thanh_tien | DECIMAL | Số tiền khách phải thanh toán tại quầy |
| | trang_thai | ENUM | `DA_DAT`, `DANG_CHUAN_BI`, `CHO_NHAN_HANG`, `HOAN_THANH`, `DA_HUY` |
| | sdt_lien_he, ghi_chu| VARCHAR | Thông tin thêm do khách nhập khi Checkout |
| | thoi_gian_hen_lay | TIMESTAMP | Hẹn ngày & giờ nhận máy tại quầy (Không được là quá khứ) |
| | ma_nhan_hang | VARCHAR | Unique (VD: `ORD-8A2B9C`) - Dùng để quét QR |
| **order_items** | id, order_id | UUID | Chi tiết đơn hàng |
| | product_variant_id| UUID | Giữ ID để track, hoặc lưu bản sao thông tin nếu cần |
| | so_luong, don_gia | DECIMAL | Giá tại thời điểm mua |
| **order_activity_log**| id, order_id | UUID | Ghi nhật ký chuyển đổi trạng thái đơn |
| | hanh_dong | VARCHAR | Nội dung log (VD: "Admin đã cập nhật trạng thái thành Đã Hủy") |
| | nguoi_thuc_hien_id| UUID | ID của Admin/Manager thực hiện |

#### 5. Nhóm Tương tác (Engagement)
| Bảng | Trường | Kiểu | Mô tả / Ràng buộc |
|---|---|---|---|
| **reviews** | id | UUID | Khóa chính |
| | product_id | UUID | Đánh giá lưu trên Sản phẩm gốc, không phải Biến thể |
| | user_id | UUID | Chỉ cho phép user đã mua thành công (Verified Purchase) |
| | so_sao | INTEGER | Từ 1 đến 5 |
| | noi_dung | TEXT | |

---
