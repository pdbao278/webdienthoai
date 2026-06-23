# AGENTS.md - Hướng dẫn Phát triển Dự án PhoneStore

Tài liệu này cung cấp hướng dẫn tóm tắt và quy tắc tích hợp dành cho AI Agent khi phát triển trong repository này. Chi tiết về nghiệp vụ và giao diện đã được định nghĩa sẵn trong [PRD.md](file:///d:/myproject/webdienthoai/PRD.md) và [design.md](file:///d:/myproject/webdienthoai/design.md).

---

## 1. Tóm tắt Dự án (Project Summary)
- **Tên dự án**: PhoneStore (Mô hình Click & Collect - Đặt online, nhận và thanh toán tại cửa hàng).
- **Phong cách UI/UX**: Soft & Clean Tech-Store (Tối giản, dịu mắt, tone màu pastel/slate-sky, bo góc tròn `rounded-xl`/`rounded-2xl`).

## 2. Công nghệ Cốt lõi (Tech Stack)
- **Kiến trúc**: Monorepo (npm workspaces) — 2 ứng dụng tách biệt trong 1 Git repo.
- **Frontend** (`web/frontend`): Next.js 16+ (App Router), Tailwind CSS v4, Zustand, TanStack Query, Zod. Deploy: Vercel.
- **Backend** (`web/backend`): Node.js + Express/Fastify, Prisma, Neon DB (PostgreSQL), JWT + bcrypt. Deploy: Railway/Render.
- **Shared** (`web/shared`): Zod schemas, TypeScript types, constants dùng chung.
- **Security & Validation**: JWT + bcrypt, Zod (bắt buộc validate input cả 2 phía).
- **Integrations**: Brevo (Email), Cloudinary (WebP Media), Google Gemini API (Chatbot).

## 3. Quy tắc Tương tác & Tích hợp OpenCode (Skill-driven Execution)
Repository này tích hợp hệ thống OpenCode sử dụng mô hình thực thi định hướng skill.

### Nguyên tắc Cốt lõi
- Nếu một tác vụ trùng với một skill sẵn có trong thư mục `skills/`, Agent **BẮT BUỘC** phải gọi skill đó.
- Không tự ý triển khai trực tiếp nếu đã có skill tương ứng. Các skill nằm tại `skills/<skill-name>/SKILL.md`.

### Bản đồ Ánh xạ Ý định (Intent → Skill Mapping)
- Tính năng mới / Functionality → `spec-driven-development`, sau đó đến `incremental-implementation` và `test-driven-development`
- Lập kế hoạch / Phân rã công việc → `planning-and-task-breakdown`
- Bug / Lỗi / Hành vi bất thường → `debugging-and-error-recovery`
- Đánh giá mã nguồn (Code review) → `code-review-and-quality`
- Tối giản hóa / Tái cấu trúc code → `code-simplification`
- Thiết kế API / Interface → `api-and-interface-design`
- Thiết kế UI / Frontend → `frontend-ui-engineering`

### Bản đồ Vòng đời Dự án (Lifecycle Mapping)
Agent tuân thủ lifecycle sau:
`DEFINE (spec-driven-development) -> PLAN (planning-and-task-breakdown) -> BUILD (incremental-implementation + TDD) -> VERIFY (debugging-and-error-recovery) -> REVIEW (code-review-and-quality) -> SHIP (shipping-and-launch)`

## 4. Các Lưu ý Quan trọng (Critical Code Rules)
- **Không dùng placeholder**: Luôn viết code hoàn chỉnh, không dùng `// TODO: implement later`.
- **Bảo toàn Documentation**: Giữ nguyên tất cả các comment và docstring hiện có không liên quan đến thay đổi của bạn.
- **Xác thực dữ liệu nghiêm ngặt**: Tất cả các input từ người dùng bắt buộc đi qua Zod schema trước khi xử lý.
- **Xử lý Edge Cases**: Chú ý xử lý các trạng thái hết hàng, hết hạn voucher, quá hạn đơn hàng (24h tự hủy), và phân quyền người dùng (RBAC).

## 5. Quy trình & Quy tắc Tải Ảnh lên Cloudinary (Cloudinary Integration & Image CRUD)
Để tối ưu hóa hình ảnh (NFR-01) và quản lý tài nguyên hiệu quả, các AI Agent phát triển dự án cần tuân thủ:
- **Biến môi trường**: Cấu hình tại `.env.local` gồm: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
- **Quy trình Tải Ảnh (Create/Update)**:
  1. Client gửi file lên API Route `/api/upload` (Route Handler backend sử dụng Node.js SDK `cloudinary`).
  2. Bắt buộc validate dữ liệu đầu vào bằng **Zod** (Giới hạn kích thước file <= 5MB và kiểu file là ảnh).
  3. API Route phải tự động convert định dạng ảnh sang WebP (`format: "webp"`) và áp dụng nén chất lượng (`quality: "auto:good"`) trước khi lưu lên Cloud.
  4. Trả về đồng thời `secure_url` (URL ảnh) và `public_id` (mã định danh ảnh) để lưu vào database.
- **Thiết kế Schema Database**: Bảng sản phẩm bắt buộc phải có hai trường để lưu trữ: `image_url` và `image_public_id`.
- **Quy trình Xóa Ảnh (Delete)**: Khi thực hiện xóa sản phẩm khỏi Database, **BẮT BUỘC** phải gọi hàm API của Cloudinary (`cloudinary.v2.uploader.destroy(image_public_id)`) để xóa file vật lý trên Cloud, tránh rò rỉ dung lượng lưu trữ của hệ thống.

