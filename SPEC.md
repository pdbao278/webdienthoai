# Spec: PhoneStore — Click & Collect E-Commerce

## Mục tiêu (Objective)

Xây dựng một trang web thương mại điện tử B2C bán điện thoại thông minh theo mô hình **Click & Collect** (đặt hàng trực tuyến, thanh toán & nhận hàng tại cửa hàng). Hệ thống hướng tới đối tượng khách hàng muốn duyệt/lọc/so sánh điện thoại một cách dễ dàng, và quản trị viên/nhân viên quản lý sản phẩm, đơn hàng và các chương trình khuyến mãi.

### Kịch bản Người dùng & Tiêu chí Nghiệm thu (User Stories & Acceptance Criteria)

| # | Kịch bản Người dùng (User Story) | Tiêu chí Nghiệm thu (Acceptance Criteria) |
|---|---|---|
| US-01 | Là Khách vãng lai, tôi có thể duyệt, tìm kiếm và lọc điện thoại | Lọc theo thương hiệu, giá, RAM, bộ nhớ trong, màn hình, pin, tính năng. URL phản ánh các bộ lọc. |
| US-02 | Là Khách vãng lai, tôi có thể xem chi tiết điện thoại với thông số kỹ thuật & thư viện ảnh | Trang sản phẩm hiển thị hình ảnh, bảng thông số kỹ thuật, chọn 2 bước: Dung lượng -> Màu sắc (kèm thumbnail), giá và tồn kho cập nhật theo cấu hình cuối. URL tự động rút gọn với tham số `?v=` để chia sẻ dễ dàng hơn. |
| US-03 | Là Khách hàng, tôi có thể đăng ký/đăng nhập bằng email | Yêu cầu kích hoạt email. Tính năng quên/đặt lại mật khẩu hoạt động. |
| US-04 | Là Khách hàng, tôi có thể thêm điện thoại vào giỏ hàng | Giỏ hàng được lưu trong DB (yêu cầu đăng nhập). Kiểm tra tồn kho theo thời gian thực. |
| US-05 | Là Khách hàng, tôi có thể thanh toán bằng Click & Collect | Chọn khung giờ nhận hàng (tối đa 3 ngày). Nhận mã QR để nhận hàng. |
| US-06 | Là Khách hàng, tôi có thể quản lý đơn hàng của mình | Xem lịch sử đơn hàng, hủy đơn nếu trạng thái là `Đã đặt`. Tự động hủy sau 24 giờ kể từ thời gian hẹn nếu không đến nhận. |
| US-07 | Là Khách hàng, tôi có thể đánh giá sản phẩm đã mua | Chỉ áp dụng sau khi đơn hàng ở trạng thái `Hoàn thành`. Mỗi sản phẩm được đánh giá 1 lần. Có thể chỉnh sửa/xóa đánh giá của chính mình. |
| US-08 | Là Nhân viên cửa hàng, tôi có thể xử lý đơn hàng | Gom hàng & đóng gói, quét mã QR, xác nhận giao hàng, thiết lập phương thức thanh toán. |
| US-09 | Là Quản trị viên, tôi có thể quản lý mọi thứ | CRUD sản phẩm/voucher/người dùng. Xem thống kê doanh thu. Phân quyền RBAC đầy đủ. |
| US-10 | Là bất kỳ người dùng nào, tôi có thể sử dụng chatbot AI | Trả lời các câu hỏi thường gặp (FAQs), gợi ý sản phẩm qua Gemini API. Tự động chuyển sang heuristics cục bộ nếu có lỗi. |

### Tiêu chí Thành công (Success Criteria)

- [ ] Hoàn thiện tất cả tính năng từ FR-01 → FR-10 và kiểm thử end-to-end thành công.
- [ ] Luồng Click & Collect hoạt động ổn định: duyệt sản phẩm → giỏ hàng → thanh toán → nhận mã QR → xác nhận nhận hàng.
- [ ] Điểm số Lighthouse Performance > 90, LCP < 2.0s.
- [ ] Responsive tốt trên các kích thước màn hình từ: 375px → 1920px.
- [ ] Tự động hủy đơn hàng quá hạn 24 giờ so với giờ hẹn.
- [ ] Áp dụng đúng phân quyền RBAC: Guest/Customer/Manager/Admin.

---

## Công nghệ sử dụng (Tech Stack)

| Tầng (Layer) | Công nghệ | Phiên bản |
|---|---|---|
| **Monorepo** | npm workspaces | — |
| **Frontend** | Next.js (App Router) + TypeScript | 16+ |
| **Styling** | Tailwind CSS | v4 |
| **Trạng thái Client** | Zustand | Mới nhất |
| **Trạng thái Server** | TanStack Query | v5+ |
| **Backend** | Node.js + Express + TypeScript | Node 22 LTS |
| **ORM** | Prisma | Mới nhất |
| **Cơ sở dữ liệu** | PostgreSQL (Neon serverless) | — |
| **Xác thực** | JWT + bcrypt | — |
| **Xác thực dữ liệu** | Zod (sử dụng chung schema, cả hai phía) | Mới nhất |
| **Email** | Brevo SMTP | — |
| **Phương tiện** | Cloudinary SDK (tự động chuyển đổi sang WebP) | — |
| **Chatbot AI** | Google Gemini API (`@google/generative-ai`) | — |
| **Kiểm thử** | Vitest (unit) + Playwright (E2E) | — |
| **Triển khai (Deploy)** | Vercel (frontend) + Railway (backend) | — |

---

## Câu lệnh (Commands)

```bash
# Thư mục gốc (monorepo)
npm install                          # Cài đặt tất cả các workspace dependencies
npm run dev                          # Khởi chạy cả dev server frontend & backend
npm run build                        # Build tất cả các workspaces
npm run lint                         # Lint tất cả các workspaces
npm run test                         # Chạy tất cả các bài kiểm thử (tests)

# Frontend (web/frontend)
npm run dev --workspace=web/frontend
npm run build --workspace=web/frontend
npm run lint --workspace=web/frontend
npm run test --workspace=web/frontend

# Backend (web/backend)
npm run dev --workspace=web/backend
npm run build --workspace=web/backend
npm run lint --workspace=web/backend
npm run test --workspace=web/backend

# Cơ sở dữ liệu (Database)
npx prisma migrate dev --schema=web/backend/prisma/schema.prisma
npx prisma db seed --schema=web/backend/prisma/schema.prisma
npx prisma studio --schema=web/backend/prisma/schema.prisma

# E2E (Kiểm thử đầu-cuối)
npx playwright test
```

---

## Cấu trúc Dự án (Project Structure)

```
webdienthoai/
├── package.json              # Thư mục gốc — cấu hình npm workspaces
├── tsconfig.base.json        # Cấu hình TypeScript dùng chung
├── .env.local                # Biến môi trường (được gitignore)
├── PRD.md                    # Tài liệu yêu cầu sản phẩm
├── DESIGN.md                 # Hệ thống thiết kế UI/UX
├── SPEC.md                   # File này (Đặc tả kỹ thuật)
├── AGENTS.md                 # Quy tắc dành cho AI Agent
│
├── web/
│   ├── frontend/             # Next.js 16+ App Router
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── next.config.ts
│   │   ├── public/           # Tài nguyên tĩnh (favicon, robots.txt)
│   │   └── src/
│   │       ├── app/          # Các trang App Router
│   │       │   ├── (shop)/   # Nhóm route cửa hàng công khai
│   │       │   │   ├── page.tsx              # Trang chủ (FR-01)
│   │       │   │   ├── phone/
│   │       │   │   │   ├── page.tsx          # Danh sách SP + bộ lọc (FR-02)
│   │       │   │   │   └── [slug]/
│   │       │   │   │       └── page.tsx      # Chi tiết sản phẩm (FR-03)
│   │       │   │   ├── cart/page.tsx          # Giỏ hàng (FR-06)
│   │       │   │   ├── checkout/page.tsx      # Thanh toán (FR-07)
│   │       │   │   └── orders/page.tsx        # Đơn hàng khách hàng (FR-08)
│   │       │   ├── (auth)/   # Nhóm route xác thực
│   │       │   │   ├── login/page.tsx
│   │       │   │   ├── register/page.tsx
│   │       │   │   ├── verify-email/page.tsx
│   │       │   │   └── forgot-password/page.tsx
│   │       │   ├── admin/    # Dashboard quản trị (FR-09)
│   │       │   │   ├── layout.tsx
│   │       │   │   ├── page.tsx              # Tổng quan số liệu thống kê
│   │       │   │   ├── products/page.tsx
│   │       │   │   ├── orders/page.tsx
│   │       │   │   ├── vouchers/page.tsx
│   │       │   │   ├── users/page.tsx
│   │       │   │   └── reviews/page.tsx
│   │       │   ├── layout.tsx
│   │       │   └── globals.css
│   │       ├── components/   # Các component UI tái sử dụng
│   │       │   ├── ui/       # Component cơ bản (Button, Input, Modal, Toast...)
│   │       │   ├── layout/   # Header, Footer, Sidebar, MobileNav
│   │       │   ├── product/  # ProductCard, ProductGrid, FilterBar...
│   │       │   ├── cart/     # MiniCart, CartItem...
│   │       │   ├── order/    # OrderCard, QRCode, StatusBadge...
│   │       │   └── chat/     # ChatWidget, ChatBubble...
│   │       ├── hooks/        # React hooks tùy chỉnh
│   │       ├── stores/       # Zustand stores
│   │       ├── lib/          # Utilities, API client, hằng số
│   │       └── types/        # TypeScript types riêng cho frontend
│   │
│   ├── backend/              # Express REST API
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── seed.ts
│   │   │   └── migrations/
│   │   └── src/
│   │       ├── index.ts              # File chạy chính Express app
│   │       ├── routes/               # Định nghĩa các routes
│   │       │   ├── auth.routes.ts
│   │       │   ├── product.routes.ts
│   │       │   ├── cart.routes.ts
│   │       │   ├── order.routes.ts
│   │       │   ├── voucher.routes.ts
│   │       │   ├── review.routes.ts
│   │       │   ├── user.routes.ts
│   │       │   ├── upload.routes.ts
│   │       │   └── chat.routes.ts
│   │       ├── controllers/          # Trình xử lý yêu cầu (handlers)
│   │       ├── services/             # Logic nghiệp vụ (business logic)
│   │       ├── middlewares/          # Auth, RBAC, validate, rate-limit
│   │       ├── lib/                  # Prisma client, Cloudinary, Brevo, Gemini
│   │       └── types/               # TypeScript types riêng cho backend
│   │
│   └── shared/               # Code dùng chung (Zod schemas, types, hằng số)
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           ├── schemas/      # Các schema xác thực Zod
│           │   ├── product.schema.ts
│           │   ├── auth.schema.ts
│           │   ├── order.schema.ts
│           │   ├── voucher.schema.ts
│           │   ├── review.schema.ts
│           │   └── cart.schema.ts
│           ├── types/        # TypeScript interfaces dùng chung
│           └── constants/    # Enums, giá trị cấu hình, tùy chọn bộ lọc
│
├── e2e/                      # Các bài kiểm thử đầu-cuối Playwright
│   ├── playwright.config.ts
│   └── tests/
│
├── data/                     # Dữ liệu seed, import CSV
├── docs/                     # Tài liệu bổ sung
└── scripts/                  # Các script tiện ích
```

---

## Phong cách Code (Code Style)

### Quy tắc đặt tên (Naming Conventions)

| Thành phần | Quy tắc | Ví dụ |
|---|---|---|
| File/Thư mục | kebab-case | `product-card.tsx`, `auth.routes.ts` |
| Component React | PascalCase | `ProductCard`, `FilterBar` |
| Hàm/Biến | camelCase | `getProductBySlug`, `isLoading` |
| Hằng số/Enum | UPPER_SNAKE_CASE | `ORDER_STATUS`, `MAX_COMPARE_ITEMS` |
| Cột DB (Prisma) | snake_case (Tiếng Việt) | `gia_ban`, `ton_kho`, `trang_thai` |
| Schema Zod | camelCase + hậu tố Schema | `createProductSchema`, `loginSchema` |
| API Route | kebab-case, RESTful | `GET /api/products`, `POST /api/orders` |

### Code mẫu — Backend Route + Controller

```typescript
// web/backend/src/routes/product.routes.ts
import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { validate } from "../middlewares/validate.middleware";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { createProductSchema } from "@phonestore/shared/schemas/product.schema";

const router = Router();

router.get("/", ProductController.list);
router.get("/:slug", ProductController.getBySlug);
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  validate(createProductSchema),
  ProductController.create
);

export default router;
```

### Code mẫu — Component Frontend

```tsx
// web/frontend/src/components/product/ProductCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@phonestore/shared/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Tìm variant có giá thấp nhất để hiển thị
  const minVariant = product.variants.reduce((prev, curr) => prev.gia_ban < curr.gia_ban ? prev : curr, product.variants[0]);
  const discount = Math.round(
    ((minVariant.gia_goc - minVariant.gia_ban) / minVariant.gia_goc) * 100
  );

  return (
    <Link
      href={`/phone/${product.slug}`}
      className="group block rounded-2xl bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:bg-slate-800"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50/50">
        <Image
          src={product.image_url}
          alt={product.san_pham}
          fill
          className="object-contain p-4"
          sizes="(max-width: 640px) 50vw, 25vw"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 rounded-lg bg-rose-50 px-2 py-1 text-xs font-medium text-rose-600">
            -{discount}%
          </span>
        )}
      </div>
      <h3 className="mt-3 text-sm font-medium text-slate-800 line-clamp-2 dark:text-slate-100">
        {product.san_pham} {minVariant.dung_luong_gb}GB
      </h3>
      <p className="mt-1 text-base font-semibold text-rose-600">
        {formatCurrency(minVariant.gia_ban)}
      </p>
      {discount > 0 && (
        <p className="text-xs text-slate-400 line-through">
          {formatCurrency(minVariant.gia_goc)}
        </p>
      )}
    </Link>
  );
}
```

### Quy tắc cốt lõi (Key Conventions)

- Kích hoạt **TypeScript strict mode** trên tất cả các package.
- Xác thực bằng **Zod** cho TẤT CẢ các đầu vào từ người dùng (cả ở client và server).
- **Không viết code placeholder (giữ chỗ)** — mọi hàm phải được triển khai hoàn chỉnh.
- **Xử lý lỗi** — sử dụng các phản hồi lỗi có kiểu dữ liệu rõ ràng, không được nuốt lỗi.
- **Imports** — sử dụng alias `@/` cho frontend, và `@phonestore/shared` cho package dùng chung.

---

## Chiến lược Kiểm thử (Testing Strategy)

| Cấp độ (Level) | Framework | Vị trí (Location) | Phạm vi (Scope) |
|---|---|---|---|
| **Unit** | Vitest | Đặt cùng file `*.test.ts` | Logic nghiệp vụ, hàm tiện ích, Zod schemas |
| **Integration** | Vitest + Supertest | `web/backend/src/**/*.test.ts` | Các API endpoints, middleware, truy vấn DB |
| **Component** | Vitest + React Testing Library | `web/frontend/src/**/*.test.tsx` | UI components, hooks |
| **E2E** | Playwright | `e2e/tests/` | Toàn bộ luồng người dùng (duyệt, giỏ hàng, checkout, admin) |

### Yêu cầu về độ bao phủ (Coverage Requirements)

- Unit/Integration: Độ bao phủ dòng code **≥ 80%** cho phần logic nghiệp vụ (`services/`, `lib/`).
- E2E: Bao phủ tất cả các luồng quan trọng (xác thực, mua hàng, CRUD phía admin).

### Các kịch bản kiểm thử E2E quan trọng

1. Khách duyệt sản phẩm → lọc → xem chi tiết sản phẩm.
2. Đăng ký → xác thực email → đăng nhập.
3. Đăng nhập → thêm vào giỏ hàng → thanh toán → nhận mã QR.
4. Khách hàng xem danh sách đơn hàng → hủy đơn hàng (khi trạng thái là `Đã đặt`).
5. Tự động hủy đơn hàng sau 24 giờ (được giả lập).
6. Nhân viên quét mã QR → xác nhận giao hàng → số lượng tồn kho giảm đi.
7. Admin thực hiện CRUD sản phẩm, voucher.
8. Admin xem báo cáo thống kê doanh thu.

---

## Ranh giới phát triển (Boundaries)

### Luôn luôn làm (Always Do)

- Chạy `npm run lint` and `npm run test` trước khi commit.
- Xác thực TẤT CẢ dữ liệu đầu vào bằng Zod schema (cả ở client + server).
- Sử dụng Cloudinary cho việc tải ảnh: tự động chuyển đổi sang WebP, lưu cả `image_url` và `image_public_id` vào DB.
- Xóa tài nguyên trên Cloudinary khi xóa sản phẩm (`cloudinary.v2.uploader.destroy`).
- Mã hóa mật khẩu bằng bcrypt (tối thiểu 12 vòng).
- Sử dụng `@phonestore/shared` cho các types/schemas dùng chung giữa frontend và backend.
- Tuân thủ ma trận phân quyền RBAC được định nghĩa trong PRD §6.5.
- Viết mã nguồn hoàn chỉnh, sẵn sàng cho production — không viết TODO hoặc placeholder.
- Giữ nguyên các comment và docstring hiện có không liên quan trực tiếp đến các thay đổi của bạn.

### Cần hỏi ý kiến trước (Ask First)

- Thay đổi schema cơ sở dữ liệu (thêm/xóa/đổi tên cột hoặc bảng).
- Thêm các thư viện npm mới.
- Thay đổi chiến lược xác thực (authentication).
- Thay đổi cấu trúc workspace monorepo.
- Thay đổi hợp đồng API (API contract - định dạng request/response).
- Thay đổi cấu hình CI/CD hoặc triển khai (deploy).

### Không bao giờ làm (Never Do)

- Commit file `.env.local` hoặc bất kỳ thông tin nhạy cảm nào lên Git.
- Lưu trữ mật khẩu ở dạng văn bản thuần (plain text).
- Sử dụng `localStorage` cho giỏ hàng (bắt buộc lưu DB, yêu cầu đăng nhập).
- Cho phép khách vãng lai (Guest) thêm sản phẩm vào giỏ hàng hoặc thực hiện checkout.
- Bỏ qua bước xác thực Zod đối với bất kỳ dữ liệu đầu vào nào của người dùng.
- Xóa các bài kiểm thử bị lỗi (failing tests) mà không có sự đồng ý rõ ràng.
- Sử dụng Redux (thay thế bằng Zustand).
- Sử dụng file cấu hình TailwindCSS (Tailwind v4 sử dụng cấu hình bằng CSS).

---

## Câu hỏi đã giải quyết (Resolved Questions)

> Tất cả các câu hỏi đã được giải quyết bởi PO (Bao) vào ngày 2026-06-24.

| # | Câu hỏi | Quyết định | Lý do quyết định |
|---|---|---|---|
| 1 | Chiến lược xác thực | **(A) JWT được cấp bởi Express backend** | Kiến trúc tách biệt hoàn toàn — backend sở hữu toàn bộ logic auth. Frontend lưu trữ JWT trong cookie httpOnly. |
| 2 | Dịch vụ gửi Email | **Brevo hạn mức 300/ngày là đủ** cho MVP | Lưu lượng gửi mail dự kiến thấp trong quá trình phát triển & giai đoạn đầu ra mắt. |
| 3 | Dữ liệu mẫu (Seed) | **Đồng bộ 130 sản phẩm từ HTML Mockup** | Thay thế 13 sản phẩm giả lập ban đầu để tái tạo giao diện (ảnh mượt, chuẩn thiết kế Cloudinary) giống hệt HTML Mockup. |
| 4 | Mã QR Code | **Chỉ chứa mã đơn hàng** (`ORD-XXXXXX`) | Giữ thiết kế đơn giản. Nhân viên quét mã và tra cứu chi tiết trên hệ thống. |
| 5 | Giao diện tối (Dark Mode) | **(B) Chỉ làm Light mode cho MVP** | Tuân thủ các token Light Mode trong DESIGN.md. Dark mode sẽ được dời sang các phase sau. |
| 6 | Trợ lý ảo Chatbot | **Xây dựng phiên bản tối giản** | Chứa FAQs cơ bản + tích hợp Gemini API. Tự động fallback về logic heuristics nội bộ. Đưa vào cột mốc M4. |

---

## Sơ đồ Cơ sở Dữ liệu (Database Schema)

> Dựa trên PRD §11 — schema Prisma chi tiết sẽ nằm tại `web/backend/prisma/schema.prisma`.

### Các bảng chính (Core Tables)

| Bảng | Mục đích | Các trường chính |
|---|---|---|
| `users` | Tài khoản người dùng | id, email, email_verified, password_hash, ho_ten, sdt, role (ADMIN/MANAGER/CUSTOMER), created_at |
| `verification_tokens` | Xác thực email & đặt lại mật khẩu | identifier, token, expires |
| `products` | Danh mục điện thoại | id, slug, hang, san_pham, phan_khuc, mo_ta, + tất cả các trường cấu hình từ PRD |
| `product_variants` | Biến thể sản phẩm (SKU) | id, product_id, sku, ram_gb, dung_luong_gb, mau_sac, image_url, gia_goc, gia_ban, ton_kho |
| `product_media` | Ảnh/video sản phẩm | id, product_id, url, public_id, loai (image/video), thu_tu, is_thumbnail |
| `cart_items` | Giỏ hàng của người dùng | id, user_id, product_variant_id, so_luong |
| `orders` | Đơn hàng của khách hàng | id, user_id, tong_tien_hang, voucher_id, tien_giam_gia, thanh_tien, trang_thai, sdt_lien_he, ghi_chu, thoi_gian_hen, phuong_thuc_thanh_toan, ma_nhan_hang, created_at |
| `order_items` | Chi tiết mặt hàng đơn hàng | id, order_id, product_variant_id, so_luong, don_gia |
| `order_activity_log` | Lịch sử hoạt động đơn hàng | id, order_id, hanh_dong, nguoi_thuc_hien_id, created_at |
| `vouchers` | Mã giảm giá | id, ma_voucher, loai_giam_gia, gia_tri, toi_da_giam, don_toi_thieu, ap_dung_cho, bat_dau, ket_thuc, so_luong, da_su_dung, nguoi_tao_id |
| `reviews` | Đánh giá sản phẩm | id, product_id, user_id, so_sao, noi_dung, created_at, updated_at |

### Luồng Trạng thái Đơn hàng (Order Status Flow)

```
Đã đặt → Đang chuẩn bị → Chờ nhận hàng → Hoàn thành
                                        ↘ Đã hủy
```

### Ma trận Phân quyền RBAC (RBAC Matrix)

| Chức năng | Guest | Customer | Manager | Admin |
|---|---|---|---|---|
| Duyệt/Tìm kiếm/Lọc/So sánh | ✅ | ✅ | ✅ | ✅ |
| Giỏ hàng | ❌ | ✅ | ✅ | ✅ |
| Thanh toán | ❌ | ✅ | ❌ | ❌ |
| Quản lý đơn hàng cá nhân | ❌ | ✅ | ❌ | ❌ |
| Đánh giá sản phẩm | ❌ | ✅ (nếu đã mua) | ✅ (kiểm duyệt) | ✅ (kiểm duyệt) |
| Xử lý đơn hàng | ❌ | ❌ | ✅ | ✅ |
| CRUD sản phẩm | ❌ | ❌ | ❌ | ✅ |
| CRUD Voucher | ❌ | ❌ | ❌ | ✅ |
| Quản lý người dùng | ❌ | ❌ | ❌ | ✅ |
| Thống kê doanh thu | ❌ | ❌ | ❌ | ✅ |

---

## Thiết kế API (REST)

### Các API Công khai (Public Endpoints)

```
GET    /api/products              # Danh sách sản phẩm (hỗ trợ lọc, phân trang, sắp xếp)
GET    /api/products/:slug        # Lấy thông tin sản phẩm bằng slug
GET    /api/products/:id/reviews  # Lấy danh sách đánh giá của sản phẩm
POST   /api/auth/register         # Đăng ký tài khoản mới
POST   /api/auth/login            # Đăng nhập, trả về token JWT
POST   /api/auth/verify-email     # Xác thực mã token email
POST   /api/auth/forgot-password  # Yêu cầu đặt lại mật khẩu
POST   /api/auth/reset-password   # Đặt lại mật khẩu bằng mã token
GET    /api/search?q=             # Tìm kiếm sản phẩm (autocomplete)
POST   /api/chat                  # Gửi tin nhắn chatbot (sử dụng Gemini API)
```

### Các API Yêu cầu Xác thực (Khách hàng)

```
GET    /api/cart                   # Lấy giỏ hàng của người dùng hiện tại
POST   /api/cart                   # Thêm sản phẩm vào giỏ hàng
PATCH  /api/cart/:id               # Cập nhật số lượng của sản phẩm trong giỏ
DELETE /api/cart/:id               # Xóa sản phẩm khỏi giỏ hàng
POST   /api/orders                 # Tạo đơn hàng mới (thanh toán)
GET    /api/orders                 # Xem danh sách đơn hàng đã mua
GET    /api/orders/:id             # Xem chi tiết một đơn hàng
PATCH  /api/orders/:id/cancel      # Hủy đơn hàng (nếu đang ở trạng thái Đã đặt)
POST   /api/reviews                # Gửi đánh giá mới (chỉ được phép khi đã mua hàng)
PATCH  /api/reviews/:id            # Cập nhật đánh giá của chính mình
DELETE /api/reviews/:id            # Xóa đánh giá của chính mình
```

### API dành cho Nhân viên (Manager Endpoints)

```
GET    /api/admin/orders           # Danh sách tất cả đơn hàng (có bộ lọc)
PATCH  /api/admin/orders/:id/status  # Cập nhật trạng thái đơn hàng
POST   /api/admin/orders/:id/scan  # Xác nhận đã giao hàng qua quét mã QR
PATCH  /api/admin/reviews/:id      # Kiểm duyệt/chỉnh sửa đánh giá bất kỳ
DELETE /api/admin/reviews/:id      # Xóa đánh giá bất kỳ
```

### API dành cho Quản trị viên (Admin Endpoints)

```
POST   /api/admin/products         # Thêm mới sản phẩm
PATCH  /api/admin/products/:id     # Cập nhật thông tin sản phẩm
DELETE /api/admin/products/:id     # Xóa sản phẩm (+ dọn dẹp tài nguyên trên Cloudinary)
POST   /api/admin/upload           # Tải hình ảnh lên Cloudinary
POST   /api/admin/products/import  # Nhập dữ liệu sản phẩm hàng loạt từ CSV
CRUD   /api/admin/vouchers         # Toàn quyền quản lý voucher khuyến mãi
CRUD   /api/admin/users            # Toàn quyền quản lý tài khoản người dùng
GET    /api/admin/stats             # Xem thống kê doanh thu (theo ngày/tuần/tháng)
```

---

## Các Cột mốc phát triển (Milestones)

| Giai đoạn | Thời gian | Cột mốc (Milestones) / Kết quả mong đợi | Liên kết FR & US |
|---|---|---|---|
| **M1: Nền tảng & Danh mục** | Tuần 1-2 | Cấu hình monorepo, sơ đồ database + seed dữ liệu mẫu, Trang chủ, Trang danh sách + bộ lọc, Trang chi tiết sản phẩm, Xác thực người dùng (đăng ký/đăng nhập/xác thực email) | **FR-01 → FR-05**<br>**US-01 → US-03** |
| **M2: Luồng mua sắm** | Tuần 3-4 | Giỏ hàng lưu DB, Luồng thanh toán Click & Collect, Quản lý đơn hàng cá nhân, Gửi email thông báo đơn hàng | **FR-06 → FR-08**<br>**US-04 → US-06** |
| **M3: Admin & Vận hành** | Tuần 5-6 | Dashboard quản trị, CRUD sản phẩm, Xử lý đơn hàng & quét QR, Quản lý Voucher, Đánh giá, So sánh sản phẩm, Báo cáo doanh thu | **FR-09 → FR-12**<br>**US-07 → US-09** |
| **M4: Hoàn thiện & Phát hành** | Tuần 7 | Tối ưu hóa SEO, Tối ưu hiệu năng tải trang, Sửa lỗi, Triển khai chatbot tối giản, Deploy ứng dụng lên Vercel/Railway | **FR-13, NFRs**<br>**US-10** |

---

*Phiên bản đặc tả: v1.1 | Ngày tạo: 24/06/2026 | Nguồn: PRD.md v4.4 + DESIGN.md*
*Bước tiếp theo: PO xem xét bản đặc tả và trả lời các câu hỏi mở → chuyển tiếp sang Giai đoạn 2: Lập kế hoạch (Plan)*
