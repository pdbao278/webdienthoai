# Product Requirements Document (PRD)
## PhoneStore — Hệ thống Thương mại Điện tử Bán Điện Thoại

---

| Trường | Nội dung |
|---|---|
| **Tên sản phẩm** | PhoneStore |
| **Phiên bản PRD** | v4.0 |
| **Ngày tạo** | 2026-06-17 |
| **Cập nhật lần cuối** | 2026-06-23 |
| **Product Owner** | Bao |
| **Trạng thái** | In Review |
| **Responsible** | Antigravity (AI Assistant / Tech Lead) |

---

## Mục lục

1. [Tóm tắt sản phẩm](#1-tóm-tắt-sản-phẩm)
2. [Bối cảnh và vấn đề](#2-bối-cảnh-và-vấn-đề)
3. [Mục tiêu và Success Metrics](#3-mục-tiêu-và-success-metrics)
4. [Người dùng mục tiêu](#4-người-dùng-mục-tiêu)
5. [Scope và Non-Goals](#5-scope-và-non-goals)
6. [Functional Requirements](#6-functional-requirements)
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [Edge Cases và Error States](#8-edge-cases-và-error-states)
9. [Dependencies và Constraints](#9-dependencies-và-constraints)
10. [UX Design Notes](#10-ux-design-notes)
11. [Tech Stack đề xuất](#11-tech-stack-đề-xuất)
12. [Timeline và Milestones](#12-timeline-và-milestones)
13. [Rủi ro và kế hoạch giảm thiểu](#13-rủi-ro-và-kế-hoạch-giảm-thiểu)
14. [Resolved Questions](#14-resolved-questions)
15. [Change Log](#15-change-log)

---

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

## 6. Functional Requirements

> **Ký hiệu:** P0 = Must Have, P1 = Should Have, P2 = Nice to Have.

| Milestone | Tên giai đoạn | Chức năng (FR) |
|---|---|---|
| **M1** | Nền tảng & Catalog | FR-01 → FR-05 |
| **M2** | Mua hàng & Đơn hàng | FR-06 → FR-08 |
| **M3** | Quản trị & Vận hành | FR-09, FR-10 |
| **M4** | Nâng cao & Tương tác | FR-11 → FR-13 |

---

### Milestone 1: Nền tảng & Catalog
*Auth là tiền đề bắt buộc cho mọi tính năng cá nhân hóa ở các milestone sau.*

#### FR-01: Trang Chủ (P0)
- Hero banner tự động cuộn.
- Dãy logo Hãng điện thoại (scroll ngang).
- Grid điện thoại bán chạy, nổi bật. Tại mỗi thẻ Product Card, hiển thị mức giá thấp nhất ("Giá từ ...") kèm thông tin phiên bản mặc định (VD: 256GB). Nút "Mua ngay" trên thẻ sẽ điều hướng trực tiếp đến trang chi tiết sản phẩm.
- Danh mục theo nhu cầu (Gaming Phone, Flagship, Tầm trung, Phổ thông).

#### FR-02: Danh Sách & Lọc Điện Thoại (P0)
- Bộ lọc đa tiêu chí chi tiết bao gồm:
  - **Hãng**: Samsung, Apple, OPPO, Xiaomi, Motorola, vivo, realme, HONOR, Tecno, Nokia, Masstel, Mobell, Nubia.
  - **Giá**: Các khoảng giá (Dưới 2 triệu, 2-4 triệu, 4-7 triệu, 7-13 triệu, 13-20 triệu, Trên 20 triệu) và thanh trượt giá (Range Slider) từ 0đ đến 65.000.000đ.
  - **Loại điện thoại**: Android, iPhone (iOS), Điện thoại AI, Điện thoại gập, Điện thoại phổ thông.
  - **Nhu cầu**: Chơi game / Cấu hình cao, Pin khủng trên 7000 mAh, Chụp ảnh, quay phim, Livestream, Mỏng nhẹ.
  - **RAM**: 3 GB, 4 GB, 6 GB, 8 GB, 12 GB, 16 GB.
  - **Độ phân giải màn hình**: QQVGA, QVGA, HD+, Full HD+, 1.5K, 1.5K+, 2K+, QXGA+, Retina (iPhone).
  - **Tần số quét**: 60 Hz, 90 Hz, 120 Hz, 144 Hz, 165 Hz.
  - **Dung lượng lưu trữ (ROM)**: 64 GB, 128 GB, 256 GB, 512 GB, 1 TB.
  - **Pin & Sạc**: Sạc nhanh (từ 20W), Sạc siêu nhanh (từ 60W), Sạc không dây.
  - **Tính năng đặc biệt**: Chỉnh ảnh AI, Hỗ trợ 5G, Kháng nước & bụi, Bảo mật khuôn mặt 3D, Công nghệ NFC.
- Bố cục: Hiển thị dạng thanh lọc nhanh nằm ngang ở phía trên danh sách sản phẩm (dropdown lựa chọn nhanh Hãng, Giá, Nhu cầu) kết hợp nút kích hoạt mở Popup Modal "Tất cả bộ lọc" ở giữa màn hình (Desktop) hoặc toàn màn hình dạng ngăn kéo dưới (Mobile). Các tiêu chí trong popup hiển thị dưới dạng hàng nút chip ngang (horizontal chips) giúp thao tác chạm/click dễ dàng, hiện đại.
- Tích hợp bộ chọn Sắp xếp giá (giá thấp - cao, giá cao - thấp) nằm ngang bên phải nút mở popup bộ lọc.
- URL phản ánh filter (`?hang=Samsung&ram=8gb`), badge bộ lọc có thể tắt nhanh.

#### FR-03: Chi Tiết Sản Phẩm (P0)
- Gallery đa phương tiện (bảng `product_media`): thumbnail carousel + zoom ảnh chính.
- **Biến thể sản phẩm (Variants) - UI 2 bước (Chuẩn Hoàng Hà):**
  1. **Lựa chọn phiên bản (Dung lượng RAM/ROM):** Hiển thị các nút phiên bản (ví dụ: 256GB, 512GB) kèm giá thấp nhất của phiên bản đó.
  2. **Lựa chọn màu sắc:** Dựa trên phiên bản đã chọn, hiển thị các nút màu sắc kèm ảnh thumbnail nhỏ (`image_url` từ bảng variant) và giá bán cụ thể của màu đó.
- **Tối ưu URL:** URL trang chi tiết sử dụng tham số `v` rút gọn thay vì toàn bộ `sku` dài (ví dụ: `?v=8-256-0` thay vì `?sku=iphone-15-pro-max-256gb-8-256-0`) để link gọn gàng, thân thiện hơn với người dùng và SEO.
- Tình trạng tồn kho sẽ thay đổi tương ứng theo biến thể (màu sắc + phiên bản) được chọn cuối cùng.
- Bảng thông số kỹ thuật chi tiết.

#### FR-04: Tìm Kiếm (P0)
- Autocomplete theo tên, model chip, hãng.
- Trang kết quả với highlight từ khóa.

#### FR-05: Authentication (P0)
- Đăng nhập/Đăng ký bằng Email, Họ Tên & Mật khẩu.
- Xác minh Email kích hoạt tài khoản bằng mã OTP 6 số.
- Cơ chế OTP: Thời hạn sử dụng mã là 60 giây. Cung cấp bộ đếm ngược trên UI và hiển thị tính năng "Gửi lại mã xác nhận" sau khi 60s hết hạn (chống spam). Yêu cầu xác thực email mới có thể đăng nhập và mua hàng.
- Quên mật khẩu / Reset password.

---

### Milestone 2: Mua hàng & Đơn hàng
*Yêu cầu M1 (Auth) đã hoàn thành.*

#### FR-06: Giỏ Hàng (P0)
- **Yêu cầu đăng nhập** để sử dụng giỏ hàng (lưu Database, không hỗ trợ localStorage cho Guest).
- Mini-cart ở header.
- Trang giỏ hàng: thay đổi số lượng, xóa SP. Chỉ cho phép thêm nếu `ton_kho > 0`.
- Tích hợp ô **Nhập mã giảm giá (Voucher)** ngay tại phần Tóm tắt đơn hàng của Giỏ hàng.
- Click "Thêm vào giỏ" → Toast "Thêm thành công". Click "Mua ngay" ở trang chi tiết → Tự động thêm vào giỏ và chuyển thẳng sang trang Thanh toán (Checkout).

#### FR-07: Đặt trước & Nhận tại cửa hàng — Click & Collect (P0)
- **Mô hình MVP**: 1 cửa hàng duy nhất, **100% thanh toán tại quầy** (không đặt cọc online).
- Checkout Flow: 
  - Khách hàng xem và có thể chỉnh sửa tại chỗ (local UI) **Họ và tên**, **Email**.
  - Xác nhận "Nhận tại cửa hàng" (duy nhất 1 địa chỉ mặc định).
  - Cung cấp SĐT liên hệ và ghi chú.
- Hẹn giờ nhận máy: Tách thành 2 dropdown chọn **Ngày nhận** (Hôm nay, Ngày mai, Ngày kia) và **Khung giờ nhận** (Sáng, Trưa, Chiều, Tối).
- Mã nhận hàng: Nhận QR Code/mã số sau khi đặt thành công, xuất trình khi nhận hàng.
- **Tích hợp Voucher:** Hỗ trợ nhập và áp dụng mã giảm giá trực tiếp trên trang Thanh toán (dữ liệu đồng bộ 2 chiều với Giỏ hàng).
- **Thành tiền** = `Tổng tiền hàng − Voucher giảm giá` (Phí ship = 0đ).

#### FR-08: Quản Lý Đơn Hàng — Customer (P0)
- Lịch sử đặt hàng với luồng trạng thái thống nhất:

  `Đã đặt → Đang chuẩn bị → Chờ nhận hàng → Hoàn thành | Đã hủy`

- Hủy đơn:
  - Khách chỉ tự hủy khi đơn ở `Đã đặt`. Sau khi chuyển `Đang chuẩn bị`, nút hủy bị vô hiệu hóa.
  - Tự động hủy nếu quá 24 giờ kể từ thời gian hẹn mà khách không đến nhận.
- Email xác nhận đặt hàng thành công.

---

### Milestone 3: Quản trị & Vận hành
*Yêu cầu M2 (Đơn hàng) đã hoàn thành.*

#### FR-09: Admin / Manager Dashboard (P0)
- **Phân quyền (RBAC):**
  - **Manager (Nhân viên tại quầy)**:
    - Gom hàng (Pick & Pack): Nhận thông báo đơn đặt trước để chuẩn bị hàng.
    - Quét mã QR khách để đối chiếu và xác nhận giao hàng.
    - Cập nhật phương thức thanh toán (Tiền mặt / Chuyển khoản). Hệ thống tự trừ tồn kho khi xác nhận Hoàn thành.
  - **Admin (Chủ shop)**: Toàn quyền hệ thống.
    - Cài đặt thời gian hủy đơn tự động (mặc định 24 giờ).
    - Báo cáo doanh thu và hiệu suất xử lý đơn.
- Quản lý sản phẩm (CRUD, import CSV, quản lý gallery ảnh/video, tồn kho).
- Quản lý đơn hàng: Lọc theo trạng thái, xem chi tiết, điều hướng luồng trạng thái.
- **Order Activity Log**: Lưu vết mọi hành động để audit.
- Quản lý Users, Reviews.
- **Thống kê doanh thu** (chỉ Admin): Biểu đồ theo Ngày/Tuần/Tháng, lịch sử lên đến 1 năm. Click vào mốc thời gian để xem danh sách đơn hàng tương ứng.

#### FR-10: Quản Lý Khuyến Mãi & Voucher (P1)
- CRUD Voucher (chỉ Admin có quyền):
  - Mã giảm giá, loại (% hoặc cố định VNĐ), mức giảm tối đa.
  - Điều kiện: Đơn tối thiểu, phạm vi áp dụng (toàn bộ hoặc SP/Hãng cụ thể).
  - Thời hạn (bắt đầu — kết thúc), giới hạn lượt sử dụng.
- Audit Log: Lưu người tạo, lịch sử cập nhật.

---

### Milestone 4: Nâng cao & Tương tác
*Yêu cầu M3 đã hoàn thành. FR-13 là P2 — triển khai nếu còn thời gian.*

#### FR-11: So Sánh Sản Phẩm (P1)
- So sánh sản phẩm ngay tại chân trang chi tiết sản phẩm. Hệ thống đề xuất các sản phẩm liên quan hoặc cho phép tìm kiếm nhanh sản phẩm khác để thêm vào bảng so sánh đối chiếu (tối đa 4 sản phẩm bao gồm cả sản phẩm đang xem).

#### FR-12: Đánh giá Sản phẩm (P1)
- Chỉ user đã mua (đơn `Hoàn thành`) mới được đánh giá. Mỗi user 1 đánh giá/sản phẩm.
- Customer: Sửa/Xóa đánh giá của mình. Admin/Manager: Sửa/Xóa mọi đánh giá (kiểm duyệt).
- Hiển thị điểm sao trung bình + tổng số đánh giá trên trang chi tiết.

#### FR-13: Trợ lý Ảo Tư vấn — Chatbot (P2)
- Widget chat nổi ở góc màn hình, thiết kế Soft & Clean.
- Trả lời FAQs (giao hàng, bảo hành, thanh toán).
- Tích hợp Gemini API cho NLP. Fallback về local heuristics nếu API lỗi.
- Gợi ý link sản phẩm khi nhận diện từ khóa hãng điện thoại. Lưu chat trong sessionStorage.

---

### 6.5 Phân Quyền Hệ Thống (RBAC Summary)

| Tính năng | Guest | Customer | Manager | Admin |
|---|---|---|---|---|
| **Xem SP, Tìm kiếm, Lọc, So sánh** | ✅ | ✅ | ✅ | ✅ |
| **Chatbot** | ✅ | ✅ | ✅ | ✅ |
| **Giỏ hàng** | ❌ (Cần login) | ✅ CRUD | ✅ | ✅ |
| **Đặt hàng (Checkout)** | ❌ | ✅ | ❌ | ❌ |
| **Quản lý Đơn hàng cá nhân** | ❌ | ✅ Xem, Hủy (khi `Đã đặt`) | ❌ | ❌ |
| **Đánh giá SP** | ❌ | ✅ Thêm (nếu đã mua), Sửa/Xóa của mình | ✅ Sửa/Xóa mọi đánh giá | ✅ Sửa/Xóa mọi đánh giá |
| **Quản lý Đơn hàng chung** | ❌ | ❌ | ✅ Xem & Cập nhật trạng thái | ✅ Toàn quyền |
| **Quản lý Sản phẩm (CRUD)** | ❌ | ❌ | ❌ | ✅ Toàn quyền |
| **Quản lý Voucher** | ❌ | ❌ | ❌ | ✅ Toàn quyền |
| **Quản lý Users & Phân quyền** | ❌ | ❌ | ❌ | ✅ Toàn quyền |
| **Thống kê Doanh thu** | ❌ | ❌ | ❌ | ✅ Toàn quyền |

---

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

### Database Schema sơ bộ

#### Bảng `products` — Thông số điện thoại chi tiết

| Nhóm | Trường | Kiểu | Mô tả | Ví dụ |
|---|---|---|---|---|
| **Cơ bản** | id | UUID | Khóa chính | |
| | slug | VARCHAR | URL-friendly name | `samsung-galaxy-s24-ultra` |
| | hang | VARCHAR | Hãng sản xuất | Samsung, Apple, Xiaomi, OPPO |
| | san_pham | VARCHAR | Tên sản phẩm | Galaxy S24 Ultra 256GB |
| | phan_khuc | ENUM | Phân khúc | `flagship`, `tam_trung`, `pho_thong`, `gaming` |
| | mo_ta | TEXT | Mô tả sản phẩm | |
| **Màn hình** | man_hinh_cong_nghe | VARCHAR | Công nghệ màn hình | Dynamic AMOLED 2X, Super Retina XDR |
| | man_hinh_kich_thuoc | DECIMAL | Kích thước (inch) | 6.8 |
| | man_hinh_do_phan_giai | VARCHAR | Độ phân giải | QHD+ (3120 × 1440) |
| | man_hinh_tan_so_quet | INTEGER | Tần số quét (Hz) | 120 |
| **Camera sau** | camera_sau | VARCHAR | Cấu hình camera sau | 200MP + 12MP + 50MP + 10MP |
| | camera_sau_tinh_nang | VARCHAR | Tính năng camera | OIS, zoom quang 5x, chống rung |
| **Camera trước** | camera_truoc | VARCHAR | Cấu hình camera trước | 12MP |
| **Hiệu năng** | chip | VARCHAR | Chip xử lý | Snapdragon 8 Gen 3, Apple A17 Pro |
| | he_dieu_hanh | VARCHAR | Hệ điều hành | Android 14, iOS 17 |
| **Pin & Sạc** | pin_mah | INTEGER | Dung lượng pin (mAh) | 5000 |
| | sac_nhanh_w | INTEGER | Công suất sạc nhanh (W) | 45 |
| **Kết nối** | ho_tro_5g | BOOLEAN | Hỗ trợ 5G | true |
| | nfc | BOOLEAN | Hỗ trợ NFC | true |
| | sim | VARCHAR | Loại SIM | 2 Nano SIM hoặc 1 Nano + 1 eSIM |
| **Thiết kế** | trong_luong_g | INTEGER | Trọng lượng (gram) | 232 |
| | chong_nuoc | VARCHAR | Chuẩn chống nước | IP68 |
| **Hệ thống** | created_at | TIMESTAMP | Ngày tạo | |
| | updated_at | TIMESTAMP | Ngày cập nhật | |
- `product_media`: id, product_id, url, loai (`image` | `video`), thu_tu, is_thumbnail
- `users`: id, email, email_verified, password_hash, ho_ten, so_dien_thoai, role
- `verification_tokens`: identifier, token, expires
- `vouchers`: id, ma_voucher, loai_giam_gia, gia_tri, toi_da_giam, don_toi_thieu, ap_dung_cho, bat_dau, ket_thuc, so_luong, da_su_dung, nguoi_tao_id, created_at, updated_at
- `orders`: id, user_id, tong_tien_hang, voucher_id, tien_giam_gia, thanh_tien, trang_thai, sdt_lien_he, ghi_chu, thoi_gian_hen_lay_hang, phuong_thuc_thanh_toan, ma_nhan_hang, created_at, updated_at
- `product_variants`: id, product_id, sku, ram_gb, dung_luong_gb, mau_sac, image_url, gia_goc, gia_ban, ton_kho, created_at, updated_at
- `order_items`: id, order_id, product_variant_id, so_luong, don_gia
- `order_activity_log`: id, order_id, hanh_dong, nguoi_thuc_hien_id, created_at
- `cart_items`: id, user_id, product_variant_id, so_luong
- `reviews`: id, product_id, user_id, so_sao, noi_dung, created_at, updated_at

---

## 12. Timeline và Milestones

| Milestone | Tuần | Deliverables | Acceptance Gate |
|---|---|---|---|
| **M1: Foundation** | W1-W2 | DB Schema, Seed Data, Trang chủ, Danh sách, Chi tiết, Auth. | Xem SP, đăng nhập/đăng ký hoạt động. |
| **M2: Order Flow** | W3-W4 | Giỏ hàng DB, Checkout Click & Collect, Quản lý đơn. | Đặt trước + nhận QR thành công. |
| **M3: Admin** | W5-W6 | Dashboard, CRUD SP, Voucher, Thống kê, Đánh giá, So sánh. | Tự động hủy đơn sau 24h chạy mượt. |
| **M4: Polish** | W7 | SEO, Performance, Bug fix, Vercel deploy, Chatbot (nếu kịp). | Lighthouse > 90. |

---

## 13. Rủi ro và kế hoạch giảm thiểu

| # | Rủi ro | Khả năng | Ảnh hưởng | Giảm thiểu |
|---|---|---|---|---|
| R-01 | Gửi email Brevo bị block/delay | Thấp | Trung bình | Xác thực domain, setup SPF/DKIM từ đầu. |
| R-02 | DB query chậm khi lọc nhiều tiêu chí | Thấp | Trung bình | Index trên Neon DB cho hang, ram_gb, gia_ban, dung_luong_gb. |
| R-03 | Vỡ layout trên điện thoại nhỏ | Trung bình | Trung bình | Test real device + Chrome devtools ở 375px liên tục. |

---

## 14. Resolved Questions

| # | Quyết định | Chi tiết | Người quyết định |
|---|---|---|---|
| 01 | Mô hình bán hàng | Click & Collect — 100% thanh toán tại quầy, không thanh toán online. | PO (Bao) |
| 02 | Hủy đơn hàng | Tự động hủy nếu khách không đến nhận sau 24 giờ kể từ thời điểm hẹn. | PO (Bao) |
| 03 | Quản lý ảnh | Lưu URL dạng `.webp` vào DB để tối ưu tốc độ tải. | PO (Bao) |
| 04 | Giỏ hàng | Bắt buộc đăng nhập mới được lưu giỏ hàng (không dùng localStorage cho Guest). | PO (Bao) |
| 05 | Quyền Voucher | Chỉ Admin có quyền CRUD voucher. Manager không có quyền. | PO (Bao) |

---

## 15. Change Log

| Phiên bản | Ngày | Người thay đổi | Nội dung thay đổi | Lý do |
|---|---|---|---|---|
| v4.6 | 2026-06-24 | Antigravity | Hoàn tất M2 & Chuẩn hóa Seeding: Khắc phục lỗi bất đồng bộ UI/DB với cơ chế UUID động. Đồng bộ ô nhập Voucher cho cả trang Giỏ hàng và Thanh toán. Cải tiến nút "Mua ngay" điều hướng thông minh. Cập nhật cơ chế xác thực Email dùng DateTime. | Nâng cao độ ổn định hệ thống, đồng nhất trải nghiệm mua hàng và xử lý dứt điểm các lỗi logic giỏ hàng/thanh toán. |
| v4.5 | 2026-06-24 | Antigravity | Tối ưu hóa URL biến thể bằng tham số `v` ngắn gọn. Đồng bộ Database với 130 sản phẩm từ HTML Mockup (chứa link ảnh Cloudinary chuẩn) thay cho dữ liệu mẫu cũ. | Cải thiện UX/SEO qua URL ngắn, giải quyết lỗi hiển thị ảnh (broken images) và nâng cao độ trung thực của giao diện so với bản thiết kế mockup. |
| v4.4 | 2026-06-24 | Antigravity | Bổ sung Product Variants: Cho phép 1 sản phẩm (vd: iPhone 15) có nhiều cấu hình (RAM, ROM) và Màu sắc khác nhau với giá và tồn kho riêng biệt. | Đáp ứng yêu cầu quản lý sản phẩm thực tế. |
| v4.3 | 2026-06-24 | Antigravity | Hoàn thiện luồng M2: Chuyển tính năng áp mã Voucher sang trang Giỏ hàng. Làm mịn giao diện Thanh toán (Click & Collect) với dropdown Chọn ngày (3 ngày) và Khung giờ (4 buổi), cho phép chỉnh sửa nhanh Họ tên/Email trực tiếp trên form. | Nâng cao trải nghiệm UX, đảm bảo khách hàng thấy rõ giá trị giảm giá trước khi vào thanh toán. |
| v4.2 | 2026-06-24 | Antigravity | Cập nhật luồng đăng ký: Yêu cầu OTP 6 số với thời hạn đếm ngược 60s và nút gửi lại mã. | Cải thiện bảo mật và UX cho tính năng xác thực email. |
| v4.1 | 2026-06-23 | Antigravity | Cập nhật cấu trúc bộ lọc trang chủ thành thanh lọc ngang kết hợp popup modal, hiển thị các tiêu chí dạng nút bấm/chips thay vì checkbox, bổ sung sắp xếp giá bên phải bộ lọc. | Tối ưu hóa UI/UX và cải thiện thao tác lọc trên thiết bị di động. |
| v4.0 | 2026-06-23 | Antigravity | Chuyển đổi toàn bộ PRD từ bán Laptop sang bán Điện thoại: đổi tên PhoneStore, cập nhật danh mục (Gaming Phone, Flagship, Tầm trung, Phổ thông), bộ lọc (Chip, Camera, Dung lượng, Pin), schema DB (chip, camera_chinh, camera_truoc, dung_luong_gb, pin_mah), personas và filter URL. | Yêu cầu PO chuyển ngành hàng. |

---

*Document owner: Bao | Review cycle: Mỗi phase | Next review: End of M1*
