# 02 FUNCTIONAL REQUIREMENTS

## 6. Functional Requirements

> **Nguyên tắc UI/UX (Global Design Rule):** Toàn bộ giao diện Frontend phải tuân thủ nghiêm ngặt tài liệu [DESIGN.md](file:///d:/myproject/webdienthoai/DESIGN.md) (Phong cách Soft & Clean: Tone màu Slate/Sky, bo góc `rounded-xl`/`rounded-2xl`, nút bấm mượt mà `duration-200`). Bất kỳ task Frontend nào sai lệch thiết kế đều bị đánh giá là chưa hoàn thành (Failed DoD).
> 
> **Ký hiệu:** P0 = Must Have, P1 = Should Have, P2 = Nice to Have.

| Milestone | Tên giai đoạn | Chức năng (FR) |
|---|---|---|
| **M1** | Xác thực & Phân quyền (Auth & RBAC) | FR-01, FR-02 |
| **M2** | Quản trị & Hiển thị Sản phẩm (Product Core) | FR-03, FR-04 |
| **M3** | Khám phá & Danh mục (Discovery) | FR-05, FR-06 |
| **M4** | Tìm kiếm & So sánh (Search & Compare) | FR-07, FR-08 |
| **M5** | Khuyến mãi & Giỏ hàng (Promo & Cart) | FR-09, FR-10 |
| **M6** | Đặt hàng & Lịch sử cá nhân (Checkout) | FR-11, FR-12 |
| **M7** | Vận hành & Thống kê (Operations) | FR-13, FR-14 |
| **M8** | Tương tác & Nâng cao (Engagement) | FR-15, FR-16 |
| **M9** | Tính năng Mở rộng (Extensions) | FR-17 |

---

### Milestone 1: Xác thực & Phân quyền (Auth & RBAC)
*(Xây dựng nền móng người dùng và bảo mật hệ thống từ Database đến Frontend)*

> **Tiêu chí hoàn thành (DoD):**
> 1. Đăng ký tài khoản gửi mã OTP (giả lập hoặc qua email) và đếm ngược 60s hoạt động đúng.
> 2. Đăng nhập thành công và được phân quyền truy cập các API riêng biệt (Guest / Customer / Admin).
> 3. Admin thay đổi được Role (Quyền) của người dùng khác nhưng không thể tự hạ quyền của chính mình.

#### FR-01: Authentication (P0)
- Đăng nhập/Đăng ký bằng Email, Họ Tên & Mật khẩu.
- Xác minh Email kích hoạt tài khoản bằng mã OTP 6 số.
- Cơ chế OTP: Thời hạn sử dụng mã là 60 giây. Cung cấp bộ đếm ngược trên UI và hiển thị tính năng "Gửi lại mã xác nhận" sau khi 60s hết hạn (chống spam). Yêu cầu xác thực email mới có thể đăng nhập và mua hàng.
- Quên mật khẩu / Reset password.

#### FR-02: Quản Lý Người Dùng & Phân Quyền (P1)
- **Danh sách người dùng** (chỉ Admin): Xem danh sách toàn bộ người dùng đăng ký trên hệ thống kèm thông tin liên lạc và trạng thái xác thực Email.
- **Tìm kiếm**: Tìm kiếm nhanh người dùng theo Họ tên, Email, SĐT.
- **Quản lý phân quyền (RBAC)**: Admin có khả năng thay đổi vai trò:
  - `CUSTOMER` (Khách hàng tiêu chuẩn).
  - `MANAGER` (Nhân viên tại quầy, bị giới hạn truy cập).
  - `ADMIN` (Toàn quyền quản trị).
- **Quy tắc an toàn**: Ngăn chặn Admin tự hạ hoặc thay đổi quyền của chính mình.

---

### Milestone 2: Quản trị & Hiển thị Sản phẩm (Product Core)
*(Tạo luồng khép kín: Admin tạo dữ liệu sản phẩm -> Frontend hiển thị chi tiết sản phẩm)*

> **Tiêu chí hoàn thành (DoD):**
> 1. Admin tạo Sản phẩm gốc và các Biến thể (Variants) thành công; hệ thống tự sinh mã SKU chuẩn format.
> 2. Khi Admin xóa hoặc ẩn ảnh, API Cloudinary Delete tự động được gọi.
> 3. Trang Chi tiết sản phẩm hiển thị đúng UI chọn 2 bước (Cấu hình -> Màu sắc). URL và Giá bán thay đổi ngay lập tức khi chọn biến thể.

#### FR-03: Quản Lý Sản Phẩm - Admin (P0)
- CRUD sản phẩm, import CSV, quản lý gallery ảnh/video. Bắt buộc tích hợp API xóa file vật lý của Cloudinary khi xóa ảnh hoặc xóa/ẩn sản phẩm để tránh rò rỉ bộ nhớ.
- Cơ chế Soft-delete (Ẩn/Hiện sản phẩm) để bảo toàn lịch sử đơn hàng. Phân tab (Khả dụng / Đã ngừng).
- Quản lý tồn kho (Inventory).
- **Ràng buộc xóa an toàn (Safe Delete Variant)**: Ngăn chặn xóa vĩnh viễn variant nếu đã có đơn hàng. Admin chỉ được ẩn hoặc hạ tồn kho về 0.

#### FR-04: Chi Tiết Sản Phẩm (P0)
- **Bố cục:** 2 cột (tỷ lệ 7:5). Cột trái: Gallery → Mô tả → Thông số. Cột phải: Variant Selector → Giá → CTA → Chính sách.
- **Breadcrumb:** 4 cấp (Trang chủ / Điện thoại / [Hãng] / [Tên SP]).
- **Gallery:** Ảnh chính tỷ lệ 4:3, thumbnail carousel bên dưới.
- **Biến thể sản phẩm (Variants) - UI 2 bước:** (1) Chọn dung lượng (RAM/ROM) -> (2) Chọn màu sắc.
- **Tối ưu URL:** Tham số `v` rút gọn thay vì `sku` đầy đủ (VD: `?v=8-256-0`).
- **Giá bán:** Hiển thị giá khuyến mãi, giá gốc gạch ngang. Cảnh báo "Tạm hết hàng" khi `tonKho <= 0`.
- **CTA Buttons:** "Thêm vào giỏ" và "MUA NGAY". "MUA NGAY" ghi đè số lượng (`overrideQuantity: true`) và chuyển thẳng sang `/checkout`.

---

### Milestone 3: Khám phá & Danh mục (Discovery)
*(Trang chủ và luồng duyệt danh sách sản phẩm)*

> **Tiêu chí hoàn thành (DoD):**
> 1. Component Product Card tự động lấy đúng giá bán của biến thể rẻ nhất làm "Giá từ...".
> 2. Bộ lọc danh sách hoạt động trơn tru (kết hợp nhiều tiêu chí: Hãng + RAM + Giá).
> 3. Trạng thái bộ lọc được lưu hoàn toàn trên URL Params (VD: `?hang=Apple&ram_gb=8`) giúp chia sẻ link dễ dàng.

#### FR-05: Trang Chủ (P0)
- Hero banner tự động cuộn.
- Dãy logo Hãng điện thoại (scroll ngang).
- Grid điện thoại bán chạy, nổi bật. Hiển thị "Giá từ ..." lấy từ variant rẻ nhất. Nút "Mua ngay" điều hướng đến chi tiết sản phẩm.
- Danh mục theo nhu cầu (Gaming, Flagship, Tầm trung, Phổ thông).

#### FR-06: Danh Sách & Lọc Điện Thoại (P0)
- Bộ lọc đa tiêu chí: Hãng, Giá (Range Slider), Loại điện thoại, Nhu cầu, RAM, Độ phân giải, Tần số quét, ROM, Pin & Sạc, Tính năng đặc biệt.
- UI Bộ lọc: Thanh lọc nhanh nằm ngang kết hợp popup modal (Chips design).
- Tích hợp bộ chọn Sắp xếp giá (giá thấp - cao, cao - thấp).
- URL đồng bộ filter (`?hang=Samsung&ram=8gb`).

---

### Milestone 4: Tìm kiếm & So sánh (Search & Compare)
*(Các công cụ nâng cao hỗ trợ ra quyết định mua hàng)*

> **Tiêu chí hoàn thành (DoD):**
> 1. Thanh tìm kiếm trên Header cho ra kết quả Autocomplete nhanh chóng.
> 2. Trang danh sách có thể kết hợp từ khóa tìm kiếm (`q`) với các bộ lọc hiện tại mà không bị lỗi mất dữ liệu.
> 3. Bảng so sánh (tối đa 4 SP) hiển thị đúng cấu hình hàng ngang để đối chiếu.

#### FR-07: Tìm Kiếm & Bộ Lọc Mở Rộng (P0)
- **Tìm kiếm toàn cục:** Thanh tìm kiếm Header cho phép Autocomplete theo tên, hãng.
- **Tìm kiếm tùy trang:** Kết hợp từ khóa (`q`) với bộ lọc và sắp xếp trên trang danh sách. Trạng thái lưu trên URL Params.

#### FR-08: So Sánh Sản Phẩm (P1)
- So sánh sản phẩm tại chân trang chi tiết. Đề xuất sản phẩm liên quan hoặc tìm kiếm nhanh để đối chiếu cấu hình (tối đa 4 sản phẩm).

---

### Milestone 5: Khuyến mãi & Giỏ hàng (Promo & Cart)
*(Tích hợp logic Voucher phức tạp trực tiếp vào Giỏ hàng)*

> **Tiêu chí hoàn thành (DoD):**
> 1. User không thể thêm quá 5 máy của cùng 1 biến thể vào giỏ hàng.
> 2. Voucher tính toán đúng số tiền giảm chỉ dựa trên các sản phẩm hợp lệ trong giỏ (không áp dụng bừa bãi).
> 3. Nếu user thay đổi số lượng giỏ hàng khiến tổng tiền không còn đạt mức "Đơn tối thiểu", Voucher tự động bị hủy và hiển thị cảnh báo.

#### FR-09: Quản Lý Khuyến Mãi & Voucher - Admin (P1)
- CRUD Voucher: Mã, loại (% hoặc VNĐ), mức giảm tối đa.
- Phạm vi áp dụng: `tat_ca`, `hang:<Brand>`, `phan_khuc:<Segment>`.
- **Đơn tối thiểu:** Chỉ tính tổng tiền của sản phẩm hợp lệ (`eligibleSubtotal`).
- **Tính nguyên tử (Concurrency):** Cập nhật transaction nguyên tử chặn race condition khi nhiều user áp mã.
- **Cập nhật động (Reactive Validation):** Tự động tính toán lại hoặc hủy voucher nếu user thay đổi số lượng trong giỏ hàng làm rớt hạng đơn tối thiểu.

#### FR-10: Giỏ Hàng (P0)
- **Yêu cầu đăng nhập** (lưu Database). Mini-cart ở header.
- Trang giỏ hàng: Thay đổi số lượng, xóa SP. Thêm nếu `ton_kho > 0`.
- **Giới hạn chống đầu cơ:** Tối đa 5 máy cho mỗi phiên bản trên một giỏ hàng.
- Tích hợp ô **Nhập mã giảm giá** tại Tóm tắt đơn hàng, đồng bộ logic với FR-09. Có nút hủy (dấu X) mã.

---

### Milestone 6: Đặt hàng & Lịch sử cá nhân (Checkout)
*(Luồng tạo đơn hàng Click & Collect và quản lý cá nhân)*

> **Tiêu chí hoàn thành (DoD):**
> 1. Dropdown chọn Khung giờ nhận hàng tự động làm mờ (disabled) các khung giờ trong quá khứ của "Hôm nay".
> 2. Đặt hàng thành công sinh ra QR Code/Mã đơn hàng và lưu DB với trạng thái `Đã đặt`. Giỏ hàng bị làm trống.
> 3. User có thể chủ động bấm "Hủy đơn" thành công trên giao diện nếu đơn vẫn ở trạng thái `Đã đặt`.

#### FR-11: Đặt trước & Nhận tại cửa hàng — Click & Collect (P0)
- **100% thanh toán tại quầy** (không đặt cọc online).
- Chỉnh sửa nhanh Họ tên, Email, nhập SĐT liên hệ, Ghi chú.
- **Hẹn giờ nhận máy:** Dropdown Ngày (Hôm nay, Ngày mai...) và Khung giờ. Vô hiệu hóa khung giờ quá khứ.
- Mã nhận hàng QR Code. Đồng bộ Voucher. Tổng tiền hàng − Voucher (Free ship).

#### FR-12: Quản Lý Đơn Hàng — Customer (P0)
- Lịch sử đặt hàng: `Đã đặt → Đang chuẩn bị → Chờ nhận hàng → Hoàn thành | Đã hủy`.
- Khách tự hủy khi đơn `Đã đặt`.
- Tự động hủy quá hạn 24h. Email xác nhận đơn.

---

### Milestone 7: Vận hành & Thống kê (Operations & Analytics)
*(Công cụ cho nhân viên và chủ shop xử lý đơn)*

> **Tiêu chí hoàn thành (DoD):**
> 1. Giao diện giả lập quét QR code hoạt động để tự động đổi trạng thái đơn sang `Hoàn thành`.
> 2. Số lượng Tồn kho (`tonKho`) của biến thể tự động bị trừ đi chính xác sau khi đơn chuyển `Hoàn thành`.
> 3. Biểu đồ thống kê tính toán chính xác tổng doanh thu dựa trên các đơn đã `Hoàn thành`.

#### FR-13: Quản Lý Đơn Hàng & Vận Hành - Admin/Manager (P0)
- Lọc/tìm kiếm đơn. Modal chi tiết (mặt hàng, tổng tiền, phương thức, ghi chú).
- Nhảy cóc trạng thái (linh hoạt). 
- **Gom hàng** (Manager nhận thông báo).
- **QR Scanner Simulator:** Quét mã nhận hàng chuyển đơn sang `Hoàn thành`.
- **Order Activity Log:** Nhật ký thao tác. Trừ tồn kho khi hoàn thành.

#### FR-14: Thống Kê & Tổng Quan Quản Trị (P0)
- Phân quyền Manager bị chặn khỏi Thống kê, Sản phẩm, Voucher.
- Admin Search toàn cục (Đơn hàng, User, SP).
- Biểu đồ doanh thu (Ngày/Tuần/Tháng).

---

### Milestone 8: Tương tác & Nâng cao (Engagement)
*(Các tính năng tương tác với khách hàng sau mua)*

> **Tiêu chí hoàn thành (DoD):**
> 1. Hệ thống chỉ cho phép User đã mua hàng (`Hoàn thành`) mới được gửi Đánh giá (Review).
> 2. Admin có thể ẩn/xóa đánh giá vi phạm.
> 3. Chatbot Gemini mở lên và có khả năng trả lời các câu hỏi cơ bản về cửa hàng dựa trên heuristic/prompt.

#### FR-15: Đánh giá Sản phẩm (P1)
- User đã mua (đơn `Hoàn thành`) mới được đánh giá (1 bài/sản phẩm).
- Customer tự sửa/xóa. Admin kiểm duyệt (sửa/xóa mọi đánh giá).
- Hiển thị điểm trung bình, widget form ẩn mặc định.

#### FR-16: Trợ lý Ảo Tư vấn — Chatbot (P2)
- Widget góc màn hình (Soft & Clean). Tích hợp Gemini API trả lời FAQs.
- Gợi ý link SP theo từ khóa. Lưu sessionStorage.

---

### Milestone 9: Tính năng Mở rộng (Extensions)
*(Các nghiệp vụ đặc thù được yêu cầu bổ sung độc lập so với luồng MVP)*

> **Tiêu chí hoàn thành (DoD):**
> 1. Admin truy cập trang `Flash Sale` và cấu hình thành công các sản phẩm vào khung giờ nhất định.
> 2. Giao diện trang chủ hiển thị đúng các mặt hàng giảm giá theo khung giờ hệ thống hiện tại.

#### FR-17: Quản Lý & Hiển Thị Flash Sale (P0) - [NEW Tính Năng Mới]
> **Ghi chú:** Đây là nghiệp vụ mở rộng mới được bổ sung độc lập.
- **Quản trị (Admin):** CRUD các khung giờ Flash Sale. Admin có thể thêm các sản phẩm/biến thể (chọn màu sắc, dung lượng) vào Flash Sale, thiết lập giá Flash Sale (`gia_flash_sale`), số lượng giới hạn và thời gian (`batDau`, `ketThuc`). Chỉ tài khoản `ADMIN` mới có quyền truy cập chức năng này.
- **Tự động hóa giá:** Giá sản phẩm tự động cập nhật về `gia_flash_sale` khi đến giờ và tự nhảy về giá gốc khi hết giờ, quản lý hoàn toàn bằng logic thời gian thực ở Backend thay vì cronjob.
- **Trang chủ:** Hiển thị khu vực Flash Sale giữa 2 phần Banner. Tích hợp bộ đếm ngược thời gian (Countdown Timer) tránh lỗi Hydration. Hiển thị thanh trạng thái số lượng (Đã bán X/Tổng Y).
- **Giới hạn mua hàng:** Mỗi khách hàng chỉ được mua tối đa 1 sản phẩm Flash Sale cho mỗi biến thể. Nếu mua từ 2 sản phẩm trở lên, sản phẩm đầu tiên tính giá Flash Sale, các sản phẩm còn lại tính giá gốc. Logic này áp dụng xuyên suốt từ Giỏ hàng tới lúc Checkout.

---

### 6.5 Phân Quyền Hệ Thống (RBAC Summary)

| Tính năng | Guest | Customer | Manager | Admin |
|---|---|---|---|---|
| **Xem SP, Tìm kiếm, Lọc, So sánh** | ✅ | ✅ | ✅ | ✅ |
| **Chatbot** | ✅ | ✅ | ✅ | ✅ |
| **Giỏ hàng** | ❌ (Cần login) | ✅ CRUD | ✅ | ✅ |
| **Đặt hàng (Checkout)** | ❌ | ✅ | ❌ | ❌ |
| **Quản lý Đơn hàng cá nhân** | ❌ | ✅ Xem, Hủy (`Đã đặt`) | ❌ | ❌ |
| **Đánh giá SP** | ❌ | ✅ Thêm (đã mua), Sửa/Xóa của mình | ✅ Sửa/Xóa mọi đánh giá | ✅ Sửa/Xóa mọi đánh giá |
| **Quản lý Đơn hàng chung** | ❌ | ❌ | ✅ Xem & Cập nhật trạng thái | ✅ Toàn quyền |
| **Quản lý Sản phẩm (CRUD)** | ❌ | ❌ | ❌ | ✅ Toàn quyền |
| **Quản lý Voucher** | ❌ | ❌ | ❌ | ✅ Toàn quyền |
| **Quản lý Users & Phân quyền** | ❌ | ❌ | ❌ | ✅ Toàn quyền |
| **Thống kê Doanh thu** | ❌ | ❌ | ❌ | ✅ Toàn quyền |
