# Implementation Plan: M4 — Nâng cao & Tương tác (Hoàn thiện & Phát hành)

## Tổng quan

Milestone 4 là giai đoạn cuối cùng của PhoneStore, tập trung vào 3 mảng chính:
1. **SEO & Structured Data** — Tối ưu hóa metadata, JSON-LD Product schema, sitemap, robots.txt để đạt Lighthouse SEO > 90.
2. **Performance** — Tối ưu hóa hiệu năng tải trang (LCP < 2.0s), bundle size, lazy loading, caching headers.
3. **Chatbot AI** — Xây dựng trợ lý ảo tư vấn tích hợp Google Gemini API (FR-13, P2).

### Liên kết PRD

| FR | Tên | Priority | Status hiện tại |
|---|---|---|---|
| FR-14 | So sánh sản phẩm | P1 | ✅ Đã hoàn thành (CompareWidget + /compare page) |
| FR-15 | Đánh giá sản phẩm | P1 | ✅ Đã hoàn thành (ProductReviews + review API) |
| FR-13 | Chatbot AI (Gemini) | P2 | ❌ Chưa bắt đầu |
| NFR-01 | Performance (LCP < 2s, Lighthouse > 90) | — | ⚠️ Cần tối ưu |
| NFR-02 | SEO & Accessibility (JSON-LD, SSR/SSG) | — | ⚠️ Chỉ có metadata cơ bản ở root layout |
| NFR-03 | Security (Rate Limiting, CORS cụ thể) | — | ⚠️ CORS wildcard, chưa có rate limit |

---

## Phân tích Hiện trạng (Gap Analysis)

### Đã có (✅)
- Root layout metadata (title + description cơ bản)
- `revalidate: 60` trên trang chủ và trang chi tiết (ISR)
- `next/image` cho ảnh sản phẩm (tự động optimize)
- `priority={true}` trên ảnh chính PDP
- Font Inter được load qua `next/font/google` (đã tối ưu)
- FR-14 So sánh: CompareWidget trên PDP + trang /compare
- FR-15 Đánh giá: ProductReviews widget + API đầy đủ (add, delete, eligibility check)

### Thiếu (❌)
- **SEO**: Không có metadata riêng cho từng trang (phone listing, PDP, cart, orders...)
- **SEO**: Không có JSON-LD Product schema trên PDP
- **SEO**: Không có `robots.txt` và `sitemap.xml`
- **SEO**: Không có Open Graph / Twitter Card metadata
- **Performance**: Không có rate limiting trên backend
- **Performance**: CORS đang mở wildcard (`cors()` không options)
- **Security**: Không có security headers (CSP, HSTS, X-Content-Type-Options...)
- **Chatbot**: Chưa có bất kỳ code chatbot nào (không có Gemini SDK, không có routes, không có UI)
- **Backend**: Dòng `console.log('Backend restarted')` trong production code (`index.ts`)

---

## Quyết định Kiến trúc

1. **SEO Metadata**: Sử dụng Next.js `generateMetadata()` function cho từng route thay vì export tĩnh, cho phép metadata động dựa trên dữ liệu sản phẩm.
2. **JSON-LD**: Inject inline `<script type="application/ld+json">` vào PDP server component.
3. **Sitemap**: Sử dụng Next.js App Router `sitemap.ts` convention (dynamic sitemap).
4. **Robots.txt**: Sử dụng Next.js `robots.ts` convention.
5. **Chatbot**: Widget nổi góc phải dưới (FloatingChatWidget). Backend route `/api/chat` sử dụng `@google/generative-ai` SDK. Fallback về heuristics cục bộ nếu API lỗi.
6. **Rate Limiting**: Sử dụng `express-rate-limit` cho auth endpoints.
7. **Security Headers**: Middleware Express thêm headers chuẩn.

---

## Danh sách Task

### Phase 1: SEO Foundation (Task 1-4)

#### Task 1: SEO — Metadata động cho tất cả các trang

**Mô tả:** Thêm `generateMetadata()` hoặc export `metadata` tĩnh cho mỗi route page. PDP sẽ sử dụng `generateMetadata()` để tạo title/description dựa trên tên sản phẩm thực tế.

**Acceptance criteria:**
- [ ] Mỗi trang có `<title>` riêng biệt và mô tả phù hợp
- [ ] PDP có title = `{sanPham} | PhoneStore` và description chứa thông số chính
- [ ] Open Graph metadata (og:title, og:description, og:image) trên PDP
- [ ] Twitter Card metadata trên PDP

**Verification:**
- [ ] Build thành công: `npm run build`
- [ ] Kiểm tra source HTML của mỗi trang thấy `<title>` khác nhau
- [ ] `curl` kiểm tra PDP thấy OG tags

**Dependencies:** None
**Files likely touched:**
- `web/frontend/src/app/page.tsx` (thêm metadata)
- `web/frontend/src/app/phone/page.tsx` (thêm metadata)
- `web/frontend/src/app/phone/[slug]/page.tsx` (generateMetadata)
- `web/frontend/src/app/cart/page.tsx` (thêm metadata)
- `web/frontend/src/app/checkout/page.tsx` (thêm metadata)
- `web/frontend/src/app/orders/page.tsx` (thêm metadata)
- `web/frontend/src/app/login/page.tsx` (thêm metadata)
- `web/frontend/src/app/register/page.tsx` (thêm metadata)
- `web/frontend/src/app/compare/page.tsx` (thêm metadata)

**Estimated scope:** Medium (3-5 files chính, nhiều file nhỏ)

---

#### Task 2: SEO — JSON-LD Product Schema trên PDP

**Mô tả:** Inject JSON-LD `Product` schema vào trang chi tiết sản phẩm để Google hiểu dữ liệu sản phẩm (giá, tên, hình ảnh, đánh giá, tồn kho).

**Acceptance criteria:**
- [ ] Mỗi PDP render `<script type="application/ld+json">` với schema `Product`
- [ ] Schema chứa: name, description, image, brand, sku, offers (price, availability, priceCurrency: VND)
- [ ] Schema chứa aggregateRating nếu có review

**Verification:**
- [ ] Build thành công
- [ ] Kiểm tra HTML source trang PDP thấy JSON-LD đúng chuẩn
- [ ] Validate bằng [Google Rich Results Test](https://search.google.com/test/rich-results)

**Dependencies:** Task 1
**Files likely touched:**
- `web/frontend/src/app/phone/[slug]/page.tsx`

**Estimated scope:** Small (1 file)

---

#### Task 3: SEO — Dynamic Sitemap & Robots.txt

**Mô tả:** Tạo sitemap.xml động liệt kê tất cả trang sản phẩm và robots.txt chuẩn.

**Acceptance criteria:**
- [ ] `/sitemap.xml` trả về danh sách URL tất cả sản phẩm + trang tĩnh
- [ ] `/robots.txt` cho phép crawl, trỏ đến sitemap
- [ ] Sitemap tự động cập nhật khi có sản phẩm mới (dynamic generation)

**Verification:**
- [ ] Truy cập `localhost:3000/sitemap.xml` thấy XML hợp lệ
- [ ] Truy cập `localhost:3000/robots.txt` thấy nội dung đúng

**Dependencies:** None
**Files likely touched:**
- `web/frontend/src/app/sitemap.ts` (NEW)
- `web/frontend/src/app/robots.ts` (NEW)

**Estimated scope:** Small (2 files mới)

---

#### Task 4: SEO — Semantic HTML & Heading Audit

**Mô tả:** Kiểm tra và đảm bảo mỗi trang chỉ có 1 `<h1>`, heading hierarchy đúng, semantic HTML elements (main, article, nav, section) đúng vị trí.

**Acceptance criteria:**
- [ ] Mỗi trang chỉ có duy nhất 1 `<h1>`
- [ ] Heading hierarchy: h1 → h2 → h3 không bị nhảy cấp
- [ ] Sử dụng semantic tags phù hợp

**Verification:**
- [ ] Build thành công
- [ ] Manual audit heading structure trên browser DevTools

**Dependencies:** None
**Files likely touched:**
- Các page components nếu cần chỉnh sửa

**Estimated scope:** Small (audit, sửa nhỏ)

---

### Checkpoint: Phase 1 — SEO Foundation
- [ ] Tất cả page đều có metadata riêng
- [ ] PDP có JSON-LD Product schema
- [ ] Sitemap và robots.txt hoạt động
- [ ] `npm run build` thành công
- [ ] Review trước khi tiếp tục Phase 2

---

### Phase 2: Performance & Security (Task 5-7)

#### Task 5: Backend — Rate Limiting, Security Headers & CORS tightening

**Mô tả:** Thêm rate limiting cho auth endpoints, cấu hình security headers, và giới hạn CORS origins.

**Acceptance criteria:**
- [ ] Auth endpoints (`/api/auth/*`) bị rate limit (ví dụ: 10 req/phút)
- [ ] Security headers: `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Strict-Transport-Security`
- [ ] CORS chỉ cho phép origins cụ thể (frontend URL)
- [ ] Xóa `console.log('Backend restarted')` ở cuối `index.ts`

**Verification:**
- [ ] Build backend thành công
- [ ] Test rate limit: gửi 11 request liên tục đến `/api/auth/login` → request thứ 11 bị reject 429
- [ ] Kiểm tra response headers chứa security headers

**Dependencies:** None
**Files likely touched:**
- `web/backend/src/index.ts`
- `web/backend/src/middlewares/rate-limit.middleware.ts` (NEW)

**Estimated scope:** Small (2 files)

---

#### Task 6: Frontend — Performance Optimization

**Mô tả:** Tối ưu hóa hiệu năng frontend: lazy load components nặng, optimize bundle, review image loading strategy.

**Acceptance criteria:**
- [ ] Các component nặng (CompareWidget, FilterBar modal) được dynamic import với `next/dynamic`
- [ ] Font Awesome được load tối ưu hơn (subset hoặc chuyển sang sử dụng icon component)
- [ ] Kiểm tra không có unnecessary re-renders trên các trang chính
- [ ] Ảnh sản phẩm sử dụng `sizes` attribute chính xác

**Verification:**
- [ ] `npm run build` → kiểm tra bundle size
- [ ] Lighthouse Performance score >= 90 trên trang chủ

**Dependencies:** None
**Files likely touched:**
- `web/frontend/src/app/phone/[slug]/page.tsx`
- `web/frontend/src/app/layout.tsx`
- `web/frontend/src/components/product/CompareWidget.tsx`

**Estimated scope:** Small-Medium

---

#### Task 7: Frontend — Cải thiện Accessibility cơ bản

**Mô tả:** Đảm bảo keyboard navigation, ARIA labels cho các interactive elements, color contrast.

**Acceptance criteria:**
- [ ] Tất cả buttons, links có focus ring visible
- [ ] Các modal (filter popup, compare popup) có focus trap
- [ ] Các ảnh sản phẩm có `alt` text mô tả đúng
- [ ] Form fields có associated labels

**Verification:**
- [ ] Manual test keyboard navigation qua các trang chính
- [ ] Lighthouse Accessibility score >= 90

**Dependencies:** None
**Files likely touched:**
- Các component UI nếu thiếu accessibility attributes

**Estimated scope:** Small

---

### Checkpoint: Phase 2 — Performance & Security
- [ ] Rate limit hoạt động trên auth routes
- [ ] Security headers xuất hiện trong response
- [ ] Lighthouse Performance >= 90, Accessibility >= 90
- [ ] `npm run build` thành công
- [ ] Review trước khi tiếp tục Phase 3

---

### Phase 3: Chatbot AI — FR-13 (Task 8-10)

#### Task 8: Backend — Chatbot API route với Gemini

**Mô tả:** Tạo route `POST /api/chat` tích hợp Google Gemini API. Xây dựng system prompt phù hợp cho PhoneStore (tư vấn sản phẩm, FAQs, gợi ý link). Fallback sang heuristics cục bộ khi Gemini API lỗi.

**Acceptance criteria:**
- [ ] Route `POST /api/chat` nhận `{ message: string, history?: Array }` và trả về `{ reply: string }`
- [ ] System prompt hướng dẫn Gemini trả lời như nhân viên tư vấn PhoneStore (bằng tiếng Việt)
- [ ] Khi nhận diện tên hãng/sản phẩm, gợi ý link trang sản phẩm (`/phone?hang=...`)
- [ ] Khi Gemini API lỗi (timeout, quota, network), tự động fallback về câu trả lời chuẩn bị sẵn (local heuristics)
- [ ] Rate limit cho chat endpoint (20 req/phút)

**Verification:**
- [ ] Test API bằng `curl` hoặc Postman
- [ ] Test fallback bằng cách đặt API key sai

**Dependencies:** None (có thể song song với Phase 1-2)
**Files likely touched:**
- `web/backend/src/controllers/chat.controller.ts` (NEW)
- `web/backend/src/routes/chat.routes.ts` (NEW)
- `web/backend/src/lib/gemini.ts` (NEW)
- `web/backend/src/index.ts` (register route)

**Estimated scope:** Medium (4 files)

---

#### Task 9: Frontend — Chat Widget UI

**Mô tả:** Xây dựng widget chat nổi ở góc phải dưới màn hình. Thiết kế Soft & Clean phù hợp design system. Lưu lịch sử chat trong `sessionStorage`.

**Acceptance criteria:**
- [ ] Nút chat nổi tròn ở góc phải dưới (fixed position)
- [ ] Click mở panel chat có header, danh sách tin nhắn, ô nhập
- [ ] Tin nhắn user hiển thị bên phải (bubble xanh), bot bên trái (bubble trắng)
- [ ] Loading indicator khi chờ phản hồi
- [ ] Lưu chat history vào `sessionStorage` để không mất khi chuyển trang
- [ ] Hiển thị lời chào mặc định khi mở chat lần đầu
- [ ] Responsive trên mobile (full-width panel)

**Verification:**
- [ ] Build thành công
- [ ] Manual test: gửi tin nhắn, nhận phản hồi, chuyển trang giữ lịch sử
- [ ] Test mobile viewport

**Dependencies:** Task 8
**Files likely touched:**
- `web/frontend/src/components/chat/ChatWidget.tsx` (NEW)
- `web/frontend/src/components/chat/ChatBubble.tsx` (NEW)
- `web/frontend/src/app/layout.tsx` (mount ChatWidget)

**Estimated scope:** Medium (3 files)

---

#### Task 10: Chatbot — Heuristics & FAQ fallback

**Mô tả:** Xây dựng bộ heuristics cục bộ cho chatbot khi Gemini không khả dụng. Match từ khóa để trả lời FAQs cơ bản.

**Acceptance criteria:**
- [ ] Nhận diện câu hỏi về: giao hàng, bảo hành, thanh toán, đổi trả, giờ mở cửa
- [ ] Nhận diện tên hãng (Apple, Samsung, Xiaomi...) → gợi ý link `/phone?hang=...`
- [ ] Trả lời mặc định cho câu hỏi không nhận diện được

**Verification:**
- [ ] Unit test cho heuristics matcher
- [ ] Manual test khi Gemini bị tắt

**Dependencies:** Task 8
**Files likely touched:**
- `web/backend/src/lib/chat-heuristics.ts` (NEW)
- `web/backend/src/controllers/chat.controller.ts` (update fallback)

**Estimated scope:** Small (2 files)

---

### Checkpoint: Phase 3 — Chatbot Complete
- [ ] Chatbot hoạt động end-to-end
- [ ] Fallback heuristics hoạt động khi Gemini lỗi
- [ ] Chat history lưu trong sessionStorage
- [ ] `npm run build` thành công

---

### Phase 4: Final Polish & Bug Fix (Task 11-12)

#### Task 11: Code Cleanup & Console.log Audit

**Mô tả:** Rà soát toàn bộ codebase, xóa `console.log` debug statements, xóa code thừa, đảm bảo không có TODO comments.

**Acceptance criteria:**
- [ ] Không còn `console.log` trong production code (trừ error logging có chủ đích)
- [ ] Không còn TODO/FIXME comments
- [ ] Tất cả imports đều được sử dụng
- [ ] `npm run build` cả frontend và backend thành công không warning

**Verification:**
- [ ] `grep -r "console.log" web/` → chỉ còn error handlers
- [ ] `npm run build` clean

**Dependencies:** Task 1-10
**Files likely touched:** Nhiều file (audit toàn bộ)

**Estimated scope:** Small-Medium

---

#### Task 12: Final Build Verification & Lighthouse Audit

**Mô tả:** Chạy build production, chạy Lighthouse audit trên các trang chính, fix bất kỳ issue nào để đạt score > 90.

**Acceptance criteria:**
- [ ] `npm run build` thành công không warning cả frontend và backend
- [ ] Lighthouse Performance >= 90 trên trang chủ
- [ ] Lighthouse SEO >= 90 trên trang chủ và PDP
- [ ] Lighthouse Accessibility >= 90
- [ ] Backend test suite pass: `npm run test --workspace=web/backend`

**Verification:**
- [ ] Lighthouse reports lưu lại
- [ ] Screenshot kết quả

**Dependencies:** Task 11
**Files likely touched:** Tùy theo issues phát hiện

**Estimated scope:** Small-Medium

---

### Checkpoint: M4 Complete 🚀
- [ ] Tất cả acceptance criteria đã đạt
- [ ] Build production thành công
- [ ] Lighthouse scores >= 90 (Performance, SEO, Accessibility)
- [ ] Chatbot hoạt động (hoặc graceful fallback)
- [ ] Sẵn sàng deploy

---

## Rủi ro & Giảm thiểu

| Rủi ro | Khả năng | Ảnh hưởng | Giảm thiểu |
|---|---|---|---|
| Gemini API key không có / quota hết | Trung bình | Thấp | Fallback heuristics luôn sẵn sàng; chatbot vẫn trả lời được FAQs |
| Lighthouse score không đạt 90 do Font Awesome CDN | Cao | Trung bình | Chuyển sang import icon selectively hoặc dùng icon SVG inline |
| Bundle size lớn do client components | Trung bình | Trung bình | Dynamic import + code splitting |

## Câu hỏi mở

> [!IMPORTANT]
> **Q1: Gemini API Key** — Bạn có sẵn Google Gemini API Key để tích hợp chatbot không? Nếu chưa có, chatbot sẽ chỉ sử dụng heuristics cục bộ (FAQs chuẩn bị sẵn).

> [!IMPORTANT]
> **Q2: Deploy target** — Bạn muốn deploy frontend lên Vercel và backend lên Railway/Render trong M4 này không, hay chỉ tập trung hoàn thiện code + build production?

> [!NOTE]
> **Q3: Font Awesome** — Hiện đang load toàn bộ Font Awesome 6.4 từ CDN (CSS file ~70KB). Có muốn chuyển sang dùng icon component (ví dụ: `react-icons`) để giảm bundle không? Điều này sẽ cần refactor nhiều component.
