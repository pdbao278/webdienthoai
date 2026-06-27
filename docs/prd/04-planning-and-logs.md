# 04 PLANNING AND LOGS

## 12. Timeline và Milestones

| Milestone | Tuần | Deliverables | Acceptance Gate |
|---|---|---|---|
| **M1: Auth & RBAC** | W1 | Xác thực OTP, Quản lý phân quyền User. | Đăng nhập và chia quyền chuẩn xác. |
| **M2: Product Core** | W2 | Quản lý Sản phẩm (Admin), Chi tiết Sản phẩm. | Thêm SP & hiển thị đúng biến thể. |
| **M3: Discovery** | W3 | Trang chủ, Bộ lọc danh sách điện thoại. | Tìm SP theo nhu cầu dễ dàng. |
| **M4: Search & Compare** | W3 | Tìm kiếm nâng cao, So sánh sản phẩm. | Gợi ý đúng SP khi gõ từ khóa. |
| **M5: Promo & Cart** | W4 | Quản lý Voucher, Giỏ hàng. | Áp mã giảm giá tự động cập nhật giỏ. |
| **M6: Checkout** | W5 | Checkout Click & Collect, Quản lý đơn KH. | Hoàn tất đơn và sinh QR Code. |
| **M7: Operations** | W6 | Quản lý Đơn hàng Admin, Thống kê Doanh thu. | Trừ kho và thống kê đúng tiền. |
| **M8: Engagement** | W7 | Đánh giá SP, Chatbot AI, Deploy. | Tương tác thông minh, tải trang nhanh. |

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
| v4.16 | 2026-06-25 | Antigravity | Tái cấu trúc FR siêu nhỏ (Micro-Milestones): Chia thành 8 Milestones, mỗi Milestone đúng 2 FR có liên quan mật thiết với nhau (ví dụ: User + RBAC, Voucher + Cart). Đánh lại số thứ tự từ FR-01 đến FR-16. | Giúp AI (và lập trình viên) tập trung vào một scope cực hẹp, tăng độ chính xác (trên 95%) khi thực thi và dễ dàng viết TDD. |
| v4.15 | 2026-06-25 | Antigravity | Tái cấu trúc Yêu cầu chức năng (FR): Chia nhỏ từ 4 thành 6 Milestones (M1-M6), tối đa 3 FR mỗi milestone để đảm bảo tính module và dễ quản lý. Chỉnh sửa lỗi đánh số trùng lặp FR-13 thành FR-16. | Tăng tính khả thi và quản lý rủi ro tốt hơn trong từng sprint (tuần). |
| v4.14 | 2026-06-25 | Antigravity | Cập nhật đồng bộ PRD với Spec tái cấu trúc sản phẩm: xóa dung lượng khỏi tên SP gốc. Bổ sung rule xóa vật lý Cloudinary (FR-12), vô hiệu hóa khung giờ quá khứ (FR-07) và giới hạn mua tối đa 5 máy/biến thể (FR-06). | Đảm bảo tính toàn vẹn hệ thống, ngăn chặn rò rỉ lưu trữ (storage leak) và chống đầu cơ. |
| v4.13 | 2026-06-24 | Antigravity | Triển khai cơ chế Soft Delete (vô hiệu hóa `isActive = false`) cho Voucher thay vì chặn xóa khi voucher đã được áp dụng trong đơn hàng. Cập nhật schema DB, các API tạo/sửa/xóa và đặt hàng để bắt điều kiện `isActive`. | Đảm bảo tính toàn vẹn lịch sử đơn hàng nhưng vẫn cho phép Admin dọn dẹp danh sách voucher một cách thân thiện (UX tốt hơn thay vì ném lỗi 400). |
| v4.12 | 2026-06-24 | Antigravity | Bổ sung TDD và xử lý 4 lỗi nghiêm trọng về Voucher: (1) Giới hạn mức giảm theo `eligibleSubtotal`, (2) Hoàn `daSuDung` khi user hủy đơn, (3) Hoàn `tonKho` & `daSuDung` khi admin hủy đơn, (4) Chặn admin xóa voucher đã dùng trong đơn hàng. | Vá lỗ hổng nghiệp vụ, ngăn chặn thất thoát khuyến mãi và bảo toàn lịch sử đơn hàng. |
| v4.11 | 2026-06-24 | Antigravity | Triển khai cơ chế tự động hủy voucher và cảnh báo khi giỏ hàng thay đổi không còn đạt điều kiện áp dụng (ngăn chặn gian lận voucher). Viết thêm test case bảo vệ cho backend order creation. | Bảo mật hệ thống thanh toán và tránh thất thoát doanh thu từ lạm dụng voucher. |
| v4.10 | 2026-06-24 | Antigravity | Khắc phục lỗi cộng dồn số lượng khi click "Mua ngay": bổ sung tham số `overrideQuantity` vào Zod schema và API thêm giỏ hàng, cập nhật frontend store và trang PDP để ghi đè số lượng cố định về 1 thay vì cộng dồn. | Đáp ứng yêu cầu nghiệp vụ về luồng đặt hàng trực tiếp qua nút "Mua ngay". |
| v4.9 | 2026-06-24 | Antigravity | Kiểm tra toàn diện hệ thống voucher: triển khai ràng buộc phạm vi áp dụng (`apDungCho`), tính toán giảm giá và đơn tối thiểu trên các sản phẩm hợp lệ, Reactive UI cập nhật giảm giá theo giỏ hàng, chuẩn hóa in hoa mã và bảo vệ chống race condition. | Đáp ứng chính xác yêu cầu nghiệp vụ về điều kiện áp dụng voucher và bảo mật giao dịch. |
| v4.8 | 2026-06-24 | Antigravity | Bổ sung tính năng hiển thị và hủy áp dụng mã giảm giá (voucher) bằng dấu X trực tiếp tại Tóm tắt đơn hàng. | Đáp ứng yêu cầu nghiệp vụ về UX cho luồng đặt hàng và giỏ hàng. |
| v4.7 | 2026-06-24 | Antigravity | Đồng bộ tài liệu Design & PRD với UI thực tế: Cập nhật FR-03 (bố cục Grid 7:5, CTA theme Rose thay Sky, xóa sticky cột phải, Variant Selector 2 bước, Buy Box, Chính sách BH). Cập nhật wireframe trang chi tiết (section 6.3) phản ánh đúng cấu trúc component hiện tại. | Đảm bảo tài liệu thiết kế luôn đồng bộ với code thực tế, tránh lệch lạc khi phát triển tiếp. |
| v4.6 | 2026-06-24 | Antigravity | Hoàn tất M2 & Chuẩn hóa Seeding: Khắc phục lỗi bất đồng bộ UI/DB với cơ chế UUID động. Đồng bộ ô nhập Voucher cho cả trang Giỏ hàng và Thanh toán. Cải tiến nút "Mua ngay" điều hướng thông minh. Cập nhật cơ chế xác thực Email dùng DateTime. | Nâng cao độ ổn định hệ thống, đồng nhất trải nghiệm mua hàng và xử lý dứt điểm các lỗi logic giỏ hàng/thanh toán. |
| v4.5 | 2026-06-24 | Antigravity | Tối ưu hóa URL biến thể bằng tham số `v` ngắn gọn. Đồng bộ Database với 130 sản phẩm từ HTML Mockup (chứa link ảnh Cloudinary chuẩn) thay cho dữ liệu mẫu cũ. | Cải thiện UX/SEO qua URL ngắn, giải quyết lỗi hiển thị ảnh (broken images) và nâng cao độ trung thực của giao diện so với bản thiết kế mockup. |
| v4.4 | 2026-06-24 | Antigravity | Bổ sung Product Variants: Cho phép 1 sản phẩm (vd: iPhone 15) có nhiều cấu hình (RAM, ROM) và Màu sắc khác nhau với giá và tồn kho riêng biệt. | Đáp ứng yêu cầu quản lý sản phẩm thực tế. |
| v4.3 | 2026-06-24 | Antigravity | Hoàn thiện luồng M2: Chuyển tính năng áp mã Voucher sang trang Giỏ hàng. Làm mịn giao diện Thanh toán (Click & Collect) với dropdown Chọn ngày (3 ngày) và Khung giờ (4 buổi), cho phép chỉnh sửa nhanh Họ tên/Email trực tiếp trên form. | Nâng cao trải nghiệm UX, đảm bảo khách hàng thấy rõ giá trị giảm giá trước khi vào thanh toán. |
| v4.2 | 2026-06-24 | Antigravity | Cập nhật luồng đăng ký: Yêu cầu OTP 6 số với thời hạn đếm ngược 60s và nút gửi lại mã. | Cải thiện bảo mật và UX cho tính năng xác thực email. |
| v4.1 | 2026-06-23 | Antigravity | Cập nhật cấu trúc bộ lọc trang chủ thành thanh lọc ngang kết hợp popup modal, hiển thị các tiêu chí dạng nút bấm/chips thay vì checkbox, bổ sung sắp xếp giá bên phải bộ lọc. | Tối ưu hóa UI/UX và cải thiện thao tác lọc trên thiết bị di động. |
| v4.0 | 2026-06-23 | Antigravity | Chuyển đổi toàn bộ PRD từ bán Laptop sang bán Điện thoại: đổi tên PhoneStore, cập nhật danh mục (Gaming Phone, Flagship, Tầm trung, Phổ thông), bộ lọc (Chip, Camera, Dung lượng, Pin), schema DB (chip, camera_chinh, camera_truoc, dung_luong_gb, pin_mah), personas và filter URL. | Yêu cầu PO chuyển ngành hàng. |

---

*Document owner: Bao | Review cycle: Mỗi phase | Next review: End of M1*
