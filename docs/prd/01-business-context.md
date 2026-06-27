# 01 BUSINESS CONTEXT

## 1. Tóm tắt sản phẩm

PhoneStore là website thương mại điện tử B2C chuyên bán điện thoại theo mô hình **Click & Collect** (Đặt trước online — Nhận tại cửa hàng). Lấy cảm hứng từ thegioididong.com, hệ thống thiết kế tối giản, dịu mắt (Soft & Clean), hỗ trợ bộ lọc chuyên sâu và tối ưu trải nghiệm mua sắm.

> **Value Proposition:** Mua điện thoại đúng nhu cầu dễ dàng hơn bao giờ hết với bộ lọc thông minh, giao diện mượt mà và thông số minh bạch.

---

## 2. Bối cảnh và vấn đề

### 2.1 Vấn đề hiện tại
- Giao diện các website bán điện thoại hiện tại nhồi nhét, màu sắc gắt gây mỏi mắt.
- Khách hàng khó so sánh cấu hình chi tiết và lọc máy theo nhu cầu đặc thù.

### 2.2 Giải pháp
Trải nghiệm "Clean & Soft" — giảm cognitive load bằng giao diện tối giản, tập trung sản phẩm, kết hợp công cụ lọc mạnh mẽ.

---

## 3. Mục tiêu và Success Metrics

### 3.1 Mục tiêu kinh doanh
- Hoàn thiện MVP trong vòng 7 tuần.
- Trải nghiệm mua sắm và quản trị mượt mà trên Mobile/Desktop.

### 3.2 Success Metrics (OKRs)

| Metric | Target | Cách đo |
|---|---|---|
| Page Load Time (LCP) | < 2.0s | Lighthouse / Web Vitals |
| Cart Abandonment Rate | < 60% | Analytics checkout flow |
| Lighthouse Score (SEO/Perf) | > 90 | Google Lighthouse |

### 3.3 Tiêu chí phát hành (Definition of Done — MVP)
- Hoàn thành FR-01 đến FR-10.
- Luồng Click & Collect hoạt động end-to-end.
- Vượt qua test Performance và E2E.

---

## 4. Người dùng mục tiêu

### 4.1 User Personas
**Persona 1: Khách hàng (Customer)** — Sinh viên, dân văn phòng, người dùng phổ thông, tech enthusiast. Cần tìm điện thoại theo nhu cầu, so sánh giá, đặt trước online.

**Persona 2: Quản trị viên (Admin/Manager)** — Quản lý cửa hàng, xử lý đơn, báo cáo doanh thu.

### 4.2 User Roles

| Role | Quyền hạn |
|---|---|
| **Admin** | Toàn quyền CRUD sản phẩm, quản lý đơn hàng, người dùng, voucher, xem thống kê. |
| **Manager** | Xử lý đơn hàng (gom hàng, quét QR, xác nhận giao), kiểm duyệt đánh giá. |
| **Customer** | Xem sản phẩm, tìm kiếm, đặt trước, quản lý đơn hàng cá nhân, đánh giá. |
| **Guest** | Xem sản phẩm, tìm kiếm, so sánh. Cần đăng nhập để mua hàng. |

---

## 5. Scope và Non-Goals

### 5.1 In Scope (MVP v1.0)
- Mua sắm và quản lý danh mục Điện thoại.
- Bộ lọc đa tiêu chí (Hãng, Chip, RAM, Dung lượng, Camera, Giá).
- Giỏ hàng (yêu cầu đăng nhập).
- Đặt trước & Nhận tại cửa hàng (Click & Collect) — Thanh toán 100% tại quầy.
- So sánh sản phẩm tại trang chi tiết: hiển thị so sánh với sản phẩm liên quan hoặc tìm kiếm để thêm vào.
- Quản lý tài khoản và lịch sử đơn hàng.
- Admin dashboard: Quản lý sản phẩm, đơn hàng, khách hàng, voucher, thống kê.

### 5.2 Out of Scope
- Bán Laptop & Phụ kiện (phase sau).
- Sàn thương mại điện tử đa người bán (C2C / Multi-vendor).
- Mobile Native App (iOS/Android).
- Thanh toán online (VNPay, Momo, COD) — MVP chỉ thanh toán tại quầy.
- Tích hợp giao hàng API tự động (GHTK, GHN).

### 5.3 Non-Goals
PhoneStore **không** cố gắng trở thành sàn TMĐT đa mặt hàng (chỉ tập trung Điện thoại), cũng không là mạng xã hội review — đánh giá chỉ ở mức cơ bản hỗ trợ quyết định mua.

---
