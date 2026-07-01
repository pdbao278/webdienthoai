# TÀI LIỆU THIẾT KẾ GIAO DIỆN (DESIGN SYSTEM & UI/UX SPECIFICATIONS)
*Dự án: Hệ thống Thương mại Điện tử Điện Thoại (PhoneStore)*
*Phong cách: Hiện đại, Chuyên nghiệp, Tối giản, Màu sắc dịu mắt (Soft & Clean Tech-Store)*
*(Chỉ tham khảo cấu trúc bố cục của thegioididong.com, không sử dụng bộ nhận diện màu sắc vàng/đen truyền thống)*

## Mục Lục

- [1. Hệ Thống Thiết Kế (Design System)](#1-hệ-thống-thiết-kế-design-system)
  - [1.1 Bảng Màu Dịu Mắt (Soothing Color Palette)](#11-bảng-màu-dịu-mắt-soothing-color-palette)
  - [1.2 Typography & Fonts](#12-typography--fonts)
  - [1.3 Cấu Trúc Khối & Spacing](#13-cấu-trúc-khối--spacing)
- [2. Bố Cục Chung (Global Layout)](#2-bố-cục-chung-global-layout)
  - [2.1 Header & Menu Danh Mục Dọc (HoangHa Style)](#21-header--menu-danh-mục-dọc-hoangha-style)
  - [2.2 Footer (Chân Trang)](#22-footer-chân-trang)
- [3. Thiết Kế Các Trang & Thành Phần UI Chi Tiết](#3-thiết-kế-các-trang--thành-phần-ui-chi-tiết)
  - [3.1 Trang Chủ (`/`)](#31-trang-chủ)
  - [3.2 Trang Danh Sách Điện Thoại (`/phone`)](#32-trang-danh-sách-điện-thoại-phone)
  - [3.3 Trang Chi Tiết Sản Phẩm (`/phone/[slug]`)](#33-trang-chi-tiết-sản-phẩm-phoneslug)
  - [3.4 Khối So Sánh Tại Trang Chi Tiết](#34-khối-so-sánh-tại-trang-chi-tiết)
  - [3.5 Giỏ Hàng (`/cart`) & Thanh Toán (`/checkout`)](#35-giỏ-hàng-cart--thanh-toán-checkout)
  - [3.6 Trang Admin Dashboard (`/admin`)](#36-trang-admin-dashboard-admin)
- [4. Hiệu Ứng Tương Tác & Chuyển Động Nhẹ Nhàng (Micro-interactions)](#4-hiệu-ứng-tương-tác--chuyển-động-nhẹ-nhàng-micro-interactions)
- [5. Tối Ưu Hóa Trải Nghiệm Trên Thiết Bị Di Động (Mobile-First)](#5-tối-ưu-hóa-trải-nghiệm-trên-thiết-bị-di-động-mobile-first)
- [6. Phác Thảo Bố Cục Giao Diện (Wireframe Sketches)](#6-phác-thảo-bố-cục-giao-diện-wireframe-sketches)
  - [6.1 Trang Chủ (`/`)](#61-trang-chủ)
  - [6.2 Trang Danh Sách Sản Phẩm (`/phone`)](#62-trang-danh-sách-sản-phẩm-phone)
  - [6.3 Trang Chi Tiết Sản Phẩm (`/phone/[slug]`)](#63-trang-chi-tiết-sản-phẩm-phoneslug)
  - [6.4 Bản Vẽ Mô Phỏng Giao Diện (Mockup Image)](#64-bản-vẽ-mô-phỏng-giao-diện-mockup-image)
- [7. Định Hướng Mở Rộng Sản Phẩm (Laptop & Phụ kiện)](#7-định-hướng-mở-rộng-sản-phẩm-laptop--phụ-kiện)
  - [7.1 Tái Cấu Trúc Cơ Sở Dữ Liệu (Database Schema)](#71-tái-cấu-trúc-cơ-sở-dữ-liệu-database-schema)
  - [7.2 Thay Đổi Định Tuyến & Cấu Trúc Thư Mục (Routing & Folder Structure)](#72-thay-đổi-định-tuyến--cấu-trúc-thư-mục-routing--folder-structure)
  - [7.3 Điều Chỉnh Giao Diện Người Dùng (UI/UX Adaptation)](#73-điều-chỉnh-giao-diện-người-dùng-uiux-adaptation)
  - [7.4 Trang Chi Tiết & So Sánh](#74-trang-chi-tiết--so-sánh)

---

## 1. Hệ Thống Thiết Kế (Design System)

Hệ thống thiết kế của PhoneStore hướng tới sự chuyên nghiệp, hiện đại và tập trung tối đa vào trải nghiệm người dùng bằng cách sử dụng các gam màu dịu mắt, tránh gây mỏi mắt khi sử dụng trong thời gian dài. 

### 1.1 Bảng Màu Dịu Mắt (Soothing Color Palette)

Hệ thống sử dụng thiết kế nền sáng thanh lịch (Bright Light Theme) làm chủ đạo, kết hợp tông màu xanh dương bầu trời (Sky/Blue) để tạo cảm giác tin cậy và màu đỏ/cam (Rose/Orange) ở các nhãn giá/giảm giá để kích thích hiệu ứng tâm lý mua sắm gấp gáp.

| Loại màu | Light Mode (Nền sáng thanh lịch) | Dark Mode (Nền tối chống mỏi mắt) | Ứng dụng & Cảm xúc |
|---|---|---|---|
| **Primary (Chủ đạo)** | `#0284C7` (Sky-600) | `#38BDF8` (Sky-400) | Xanh bầu trời dịu nhẹ: Dùng cho thanh điều hướng, các nút hành động chính, trạng thái active. |
| **Secondary (Phụ)** | `#2563EB` (Blue-600) | `#60A5FA` (Blue-400) | Xanh dương đậm: Dùng cho liên kết, trạng thái hover của menu và các tab điều hướng phụ. |
| **Neutral Dark (Chữ chính)** | `#1E293B` (Slate-800) | `#F1F5F9` (Slate-100) | Xám đá đậm: Đảm bảo độ tương phản vừa phải, không bị gắt như màu đen thuần `#000`. |
| **Neutral Light (Chữ phụ)** | `#64748B` (Slate-500) | `#94A3B8` (Slate-400) | Xám trung tính: Dùng cho mô tả phụ, thông số kỹ thuật, đường kẻ phân cách. |
| **Background (Nền chính)** | `#F8FAFC` (Slate-50) | `#0F172A` (Slate-900) | Màu nền nhẹ nhàng, ngả xanh slate nhẹ giúp dịu mắt hơn màu trắng tinh. |
| **Surface (Nền thẻ/Card)** | `#FFFFFF` (White) | `#1E293B` (Slate-800) | Nền cho các khối sản phẩm, khung chi tiết sản phẩm. |
| **Borders (Đường viền)** | `#E2E8F0` (Slate-200) | `#334155` (Slate-300/10%) | Viền mảnh tinh tế, tạo cảm giác ngăn cách mềm mại. |
| **Success (Thành công)** | `#059669` (Emerald-600) | `#34D399` (Emerald-400) | Màu xanh lá dịu cho thông báo thành công, nhãn "Còn hàng". |
| **Warning/Price (Nhấn mạnh)** | `#E11D48` (Rose-600) | `#FB7185` (Rose-400) | Đỏ hoa hồng / Đỏ cam rực rỡ: Dùng cho nhãn giảm giá, giá khuyến mãi và bộ đếm ngược Flash Sale để tạo hiệu ứng tâm lý kích thích tiêu dùng. |

### 1.2 Typography & Fonts

*   **Font chữ chính**: `Inter` (Font chữ không chân chuẩn mực của giao diện hiện đại, tối ưu cho khả năng đọc thông số kỹ thuật) phối hợp với `Outfit` cho các tiêu đề lớn nhằm tạo điểm nhấn chuyên nghiệp.
*   **Kích thước & Trọng số**:
    *   `Display Title`: `font-bold text-3xl tracking-tight` (Dịu dàng hơn các font quá dày, tạo cảm giác thoáng đãng).
    *   `Section Title`: `font-semibold text-xl text-slate-800 dark:text-slate-100` (Không dùng viết hoa toàn bộ để tăng độ thân thiện).
    *   `Body Text`: `text-sm text-slate-600 dark:text-slate-400` (Khoảng cách dòng thoải mái `leading-relaxed`).

### 1.3 Cấu Trúc Khối & Spacing

*   **Bo góc (Border Radius)**: Sử dụng bo góc mềm mại `rounded-xl` (12px) hoặc `rounded-2xl` (16px) cho toàn bộ card, button, banner. Tránh các góc nhọn sắc nét để giao diện trông thân thiện và hiện đại.
*   **Đổ bóng (Shadows)**: Sử dụng bóng đổ cực mịn `shadow-sm` hoặc `shadow-md` với độ mờ cao và opacity thấp (dưới 5%) để tạo chiều sâu tự nhiên, tránh cảm giác nặng nề.

---

## 2. Bố Cục Chung (Global Layout)

### 2.1 Header & Menu Danh Mục Dọc (HoangHa Style)

Hệ thống sử dụng thiết kế **Menu Danh mục dọc bên trái** (phối hợp cùng Slide Banner lớn bên phải) theo phong cách của HoangHaMobile làm phương án điều hướng chính. 

Mặc dù danh mục đầy đủ gồm cả Điện thoại, Laptop và Phụ kiện, nhưng trong bản **MVP chỉ kích hoạt mục Điện thoại**. Các mục còn lại sẽ hiển thị ở trạng thái chờ để giữ nguyên cấu trúc khung giao diện cho tương lai.

#### Cấu trúc hiển thị của Menu dọc trong bản MVP:
```
+----------------------------------------+
|  DANH MỤC SẢN PHẨM                     |
+----------------------------------------+
|  📱 Điện thoại                         | ---> Kích hoạt hoàn toàn (Active)
|      • Điện thoại Flagship             |      Hover mở Menu con chi tiết bên cạnh
|      • Tầm trung                       |
|      • Phổ thông giá rẻ                |
|      • Gaming Phone                    |
|      • Apple (iPhone)                  |
|  💻 Laptop (Sắp ra mắt)           🔒   | ---> Bị khóa (Muted & Disabled)
|  🔌 Phụ kiện (Sắp ra mắt)         🔒   | ---> Bị khóa (Muted & Disabled)
+----------------------------------------+
```

#### Chi tiết tương tác và hiệu ứng UI:
1.  **Danh mục Điện thoại (Đang hoạt động)**:
    *   *Trạng thái*: Hiển thị rõ nét, khi hover vào sẽ chuyển sang màu xanh Teal chủ đạo (`text-teal-600` hoặc `text-sky-500` tùy theme).
    *   *Mega Menu con*: Khi hover vào mục Điện thoại, một bảng danh mục phụ (Mega Menu) sử dụng hiệu ứng kính mờ (`backdrop-blur bg-white/95`) sẽ trượt nhẹ sang bên phải hiển thị chi tiết theo hãng sản xuất (Apple, Samsung, Xiaomi, OPPO...) và các khoảng giá nhanh để người dùng lọc.
2.  **Danh mục Laptop & Phụ kiện (Trạng thái chờ MVP)**:
    *   *Hiển thị*: Tên danh mục dùng màu chữ xám nhạt (`text-slate-400` / `dark:text-slate-600`) để thể hiện trạng thái chưa sẵn sàng, ở góc phải dòng có icon khóa 🔒 nhỏ mờ.
    *   *Tương tác*: Khi người dùng di chuột vào dòng này:
        *   Con trỏ chuột biến thành dạng chặn (`cursor-not-allowed`).
        *   Hiển thị một Tooltip nhỏ gọn, dịu mắt phía trên con trỏ với nội dung: *"Danh mục Laptop / Phụ kiện sẽ sớm ra mắt trong Phase 2!"*.
        *   Khi click vào sẽ không có phản hồi chuyển trang (vô hiệu hóa sự kiện click).

#### Các thành phần khác trên Header:
*   **Ô tìm kiếm Autocomplete**: Dạng pill-shaped tối giản, nền xám nhạt (`bg-slate-100` ở Light Mode). Khi focus sẽ đổi sang viền xanh Sky và mở rộng danh sách gợi ý. Không có nút tìm kiếm màu mè gắt, chỉ sử dụng icon kính lúp mảnh ở góc phải.
*   **Giỏ hàng**: Icon giỏ hàng mảnh đi kèm số lượng nằm trong một hình tròn nhỏ màu xám nhạt, chỉ chuyển sang màu Primary khi có sản phẩm bên trong.
*   **Thương hiệu**: Các thương hiệu được hiển thị bằng chữ viết thường kèm logo monochrome đơn giản (màu xám, chỉ sáng lên màu Primary khi hover).

### 2.2 Footer (Chân Trang)

Được thiết kế với tone màu Slate trầm (`bg-slate-100` cho Light Mode và `bg-slate-950` cho Dark Mode). Khoảng cách giữa các cột rộng rãi, chữ căn lề gọn gàng, sử dụng các icon outline mảnh để kết nối mạng xã hội.

---

## 3. Thiết Kế Các Trang & Thành Phần UI Chi Tiết

### 3.1 Trang Chủ (`/`)

*   **Hero Banner (Tỉ lệ vàng 21:9)**:
    *   Sử dụng hình ảnh thiết kế 3D tối giản hoặc chụp sản phẩm điện thoại với tone màu nền trung tính (Muted background). 
    *   Nội dung text trên banner tinh tế, font mảnh, nút kêu gọi hành động (CTA) nhỏ gọn bo tròn cao.
*   **Thanh Hãng Điện Thoại (Brand Row)**:
    *   Các thương hiệu điện thoại hiển thị dưới dạng card nhỏ bo góc mềm mại, nền trong suốt với viền mảnh. Khi hover sẽ hiển thị hiệu ứng đổi màu viền sang xanh Sky nhẹ nhàng.
*   **Grid Điện Thoại Nổi Bật (Hot Deals Grid)**:
    *   Sử dụng nhãn giảm giá tinh tế màu đỏ hồng nổi bật trên nền hồng nhạt (`bg-rose-50 text-rose-600 border border-rose-100/40`) để tạo điểm nhấn thị giác kích thích mua sắm.
    *   **Product Card**: 
        *   Hình ảnh sản phẩm nằm trên nền xám siêu nhạt (`bg-slate-50/80`) để nổi bật máy.
        *   Tên sản phẩm màu xám đá đậm (`text-slate-800`).
        *   Giá bán khuyến mãi màu đỏ Rose cuốn hút (`text-rose-600`), giá gốc màu xám nhạt gạch ngang.
        *   Rating hiển thị bằng các ngôi sao màu vàng cát dịu (`text-amber-400`), không chói.
*   **Khối Flash Sale (Khuyến mãi online)**:
    *   **Tiêu đề & Top Bar**: Tiêu đề "Khuyến mãi online" ở góc trái. Bar ngang chứa các logo badge đặc trưng (FLASH SALE nền xanh dương gradient `from-blue-600 to-sky-500`, GIẢM ĐẾN 50% xanh nhạt `bg-sky-50 text-sky-600`). Bên cạnh là các Tab danh mục (Điện Thoại, Apple, Laptop...).
    *   **Thanh Timeline**: Luôn hiển thị 5 mốc giờ cố định (00:00, 09:00, 12:00, 15:00, 18:00) cho dù có sản phẩm hay không, thiết kế dạng Segmented Control bo tròn trên nền `bg-slate-100`. Khung giờ đang Active sẽ có nền màu xanh dương `bg-sky-600 text-white shadow-sm`, bên cạnh chứa bộ đếm ngược định dạng khối `00 : 39 : 30` (số đỏ chữ đỏ nền đỏ hồng nhạt `bg-rose-50 text-rose-600 border border-rose-100/40` nhằm thôi thúc mua hàng). Hệ thống có tính năng cuộn ngang tự động (auto-scroll) tới khung giờ hiện hành.
    *   **Product Card**: Thẻ trắng phẳng, tên sản phẩm hover đổi màu đỏ hồng (`group-hover:text-rose-600`). Giá giảm màu đỏ nổi bật (`text-rose-600`). Phía dưới là giá gốc gạch ngang kèm tag % giảm giá màu đỏ (`bg-rose-50 text-rose-600`). **Lưu ý**: Nếu khung giờ chưa bắt đầu, giá sẽ bị ẩn một phần (vd: `1?.???.??? ₫`) để tạo sự tò mò.
    *   **Progress Bar & Flame Icon**: Thanh trạng thái số lượng nằm ở đáy card, hình viên thuốc nền cam nhạt (`bg-orange-100`), gradient từ cam đến đỏ hồng (`from-orange-400 to-rose-500`) biểu trưng ngọn lửa cùng icon `Flame` chuyển động nhấp nháy (pulse) nhằm tối ưu hiệu ứng tâm lý khan hiếm. Nếu đang diễn ra: "Còn X/Y suất", nếu chưa diễn ra: "Mở bán X suất" (mức progress ở 0%).
    *   **Trạng thái rỗng**: Nếu một khung giờ chưa có sản phẩm Flash Sale, khối UI sản phẩm sẽ hiện thông báo "Chưa có sản phẩm flash sale.. Vui lòng quay lại sau nhé!".
*   **Các Banner phụ (Secondary Banners)**:
    *   Bố cục: Sử dụng Grid 2 cột responsive (`grid-cols-1 md:grid-cols-[1.35fr_1fr] gap-6`) tách biệt hoàn toàn cột chữ mô tả bên trái và cột ảnh sản phẩm bên phải. Điều này triệt tiêu hoàn toàn lỗi chữ đè lên ảnh.
    *   Màu nền: Sử dụng gradient nhẹ nhàng, sáng và sang trọng (`from-sky-50 via-white to-blue-50/40` hoặc `from-blue-50/50 via-white to-sky-100/30`) đồng bộ với hệ thống.
*   **Điện Thoại Theo Loại (Category Tabs)**:
    *   Các tab phân loại (Flagship, Tầm trung, Gaming...) chuyển đổi bằng hiệu ứng trượt mượt mà (smooth indicator).

### 3.2 Trang Danh Sách Điện Thoại (`/phone`)

#### 3.2.1 Bộ Lọc Ngang & Popup Modal Tiêu Chí (Horizontal Quick Filters & Master Popup Modal)
Hệ thống kết hợp giữa tính năng chọn nhanh và cấu hình bộ lọc chuyên sâu thông qua:
*   **Thanh lọc nhanh ngang (Top Filter Bar)**: Đặt ở trên cùng lưới sản phẩm, gồm các dropdown menu rút gọn cho các tiêu chí phổ biến nhất (**Hãng, Giá, Nhu cầu**). Khi click, popover dropdown mở ra chứa các hộp kiểm/nút chọn tương ứng. 
*   **Nút mở Popup bộ lọc ("Tất cả bộ lọc")**: Đặt ngay trên thanh ngang bên cạnh các bộ lọc nhanh. Khi click sẽ mở popup modal bán phần hoặc toàn màn hình (trên Mobile) hiển thị tất cả các thuộc tính kỹ thuật chuyên sâu (RAM, ROM, Màn hình, Tần số quét, Tính năng đặc biệt...).
*   **Thiết kế dạng Chips ngang (Horizontal Chips)**: Các tuỳ chọn tiêu chí trong popup được thiết kế dạng các nút bấm/chip bo góc bo tròn nhỏ gọn (`filter-chip`) thay thế hoàn toàn cho checkbox/radio truyền thống. Khi click chọn, chip chuyển sang trạng thái active (viền xanh Sky, chữ xanh, nền mờ nhạt).
*   **Khóa cuộn nền trang (Scroll Locking)**: Khi popup bộ lọc mở ra, class `modal-open` được áp dụng vào thẻ `<body>` để ngăn chặn hiện tượng cuộn nền trang chính (scroll leakage), giữ trải nghiệm cuộn mượt mà ổn định bên trong popup.
*   **Bộ chọn sắp xếp giá (Price Sort Select)**: Đặt ở góc phải thanh lọc (bên phải nút "Tất cả bộ lọc"), hỗ trợ sắp xếp sản phẩm nhanh chóng theo giá (Thấp - Cao, Cao - Thấp).

#### 3.2.2 Lưới Sản Phẩm & Điều Hướng
*   Khoảng cách giữa các card sản phẩm lớn (gap-6) tạo không gian thoáng đãng ("khoảng thở" cho mắt).
*   Pagination dạng số thanh mảnh, tối giản hoặc nút "Xem thêm sản phẩm" với hiệu ứng fade-in tự nhiên khi tải thêm dữ liệu.

---

### 3.3 Trang Chi Tiết Sản Phẩm (`/phone/[slug]`)

Bố cục 2 cột gọn gàng sử dụng CSS Grid 12 cột (tỷ lệ `7:5` — cột trái chiếm `lg:col-span-7`, cột phải chiếm `lg:col-span-5`). Cột phải **không sử dụng** `sticky` để tránh cắt nội dung khi nội dung cột phải dài hơn viewport.

#### Tiêu đề sản phẩm & Meta
*   Tên sản phẩm hiển thị `text-2xl md:text-3xl font-extrabold text-slate-900`.
*   Ngay bên dưới tiêu đề: Rating sao vàng dịu (`text-amber-400`) kèm số lượng đánh giá, và liên kết **"So sánh cấu hình"** (`text-sky-600 font-semibold`) để cuộn mượt xuống khu vực so sánh.

#### Cột Trái (Gallery, Mô tả & Thông số)
*   **Gallery Ảnh**:
    *   Khung ảnh chính `aspect-[4/3]` (tỷ lệ ngang, thu gọn hơn so với `aspect-square`), bo góc `rounded-2xl`, padding `p-2`, nền trắng.
    *   Thumbnail slider phía dưới gọn gàng (`w-14 h-14`, `rounded-lg`), viền xanh Blue `border-blue-600` khi active.
*   **Mô tả sản phẩm**: Khối nội dung `moTa` với nút "Đọc thêm" để thu gọn/mở rộng.
*   **Bảng thông số kỹ thuật**: Hiển thị chi tiết đầy đủ dựa trên dữ liệu product + variant.

#### Cột Phải: Giá Bán & Quyết Định Mua Sắm
*   **Bộ chọn biến thể (Variant Selector)** — UI 2 bước:
    1. Chọn **Dung lượng** (nút chip bo `rounded-xl`, active có `border-blue-500 bg-blue-50/50`).
    2. Chọn **Màu sắc** (nút chip bo `rounded-full` kèm chấm tròn màu sắc thực tế).
*   **Khung Giá & Khuyến Mãi (Buy Box)**:
    *   Nền `bg-rose-50/30` với viền `border-rose-100`, nhãn "Giá bán Online" `text-rose-500`.
    *   Giá khuyến mãi hiển thị to `text-3xl font-extrabold text-rose-600`.
    *   Giá gốc gạch ngang `text-slate-400 line-through`, badge giảm giá `bg-rose-100 text-rose-600`.
    *   Hiển thị cảnh báo "Tạm hết hàng" khi `tonKho <= 0`.
*   **Các Nút Hành Động (CTA Buttons)** — Grid 2 cột ngang hàng:
    *   Nút **"Thêm vào giỏ"** (trái): Nút viền mảnh Rose (`border-rose-500 text-rose-600 hover:bg-rose-50/50`), nền trong suốt, `rounded-2xl h-14`.
    *   Nút **"MUA NGAY"** (phải): Khối đặc Rose (`bg-rose-600 hover:bg-rose-700 text-white font-extrabold`), `rounded-2xl h-14`, khi click sẽ thêm vào giỏ rồi chuyển thẳng sang `/checkout`.
    *   Cả hai nút bị vô hiệu hóa (`disabled:opacity-50`) khi hết hàng.
*   **Chính sách mua hàng & Bảo hành**: Card `bg-slate-50/50 border-slate-100 rounded-2xl` chứa các dòng thông tin kèm icon `text-blue-500`.
*   **Đánh giá sản phẩm (Ultra-compact widget)**:
    *   Nằm ngay dưới card chính sách, trong cùng cột phải. Thiết kế `p-3 rounded-xl` cực gọn.
    *   Header 1 dòng: Nhãn "ĐÁNH GIÁ" + sao trung bình (8px) + điểm + số lượng. Nút **"✎ Viết"** nhỏ ở góc phải (chỉ hiện khi eligible).
    *   Form đánh giá **ẩn mặc định**, chỉ mở khi click "✎ Viết" (collapsible).
    *   Danh sách review dạng inline 1 dòng: `★★★★★ Tên — Comment`. Mặc định hiển thị **2 review**, nút "Xem tất cả" khi có nhiều hơn.
    *   Nút xóa review chỉ hiện khi hover (opacity transition).

---

### 3.4 Khối So Sánh Tại Trang Chi Tiết

*   **Vị trí**: Nằm dưới cùng của trang chi tiết sản phẩm, sau phần mô tả và đánh giá.
*   **Bố cục**: Chia làm 2 phần chính:
    1.  **Thanh chọn sản phẩm so sánh**:
        *   *Sản phẩm liên quan*: Hiển thị danh sách 2-3 chip/nút bấm chứa tên sản phẩm liên quan (ví dụ: đối thủ cùng phân khúc). Khi click vào sẽ lập tức thêm sản phẩm đó vào bảng so sánh.
        *   *Ô tìm kiếm nhanh*: Một input cho phép gõ từ khóa tên điện thoại, hiển thị dropdown danh sách kết quả để click chọn thêm.
    2.  **Bảng so sánh đối chiếu (tối đa 4 sản phẩm bao gồm cả sản phẩm hiện tại)**:
        *   Thiết kế bảng dạng lưới (Grid-based table) phẳng, không dùng các đường viền đen đậm mà dùng viền xám siêu nhạt (`border-slate-100`).
        *   Các cột hiển thị: Cột 1 là sản phẩm chính (đang xem), các cột tiếp theo là các sản phẩm được thêm vào để so sánh.
        *   Các dòng so sánh được tô màu xen kẽ nhẹ nhàng (Zebra striping bằng màu `bg-slate-50/50`) để người dùng dễ đối chiếu thông số kỹ thuật (Màn hình, Camera, Pin, Chip, RAM, ROM...).
        *   Có nút "Xóa" (x) ở đầu mỗi cột sản phẩm so sánh để người dùng dễ dàng loại bỏ khỏi bảng.

---

### 3.5 Giỏ Hàng (`/cart`), Thanh Toán (`/checkout`) & Theo Dõi Đơn Hàng (`/orders`)

*   **Giỏ hàng (`cart.html`)**:
    *   *Quản lý trạng thái:* Đồng bộ dữ liệu với `localStorage` thông qua mảng `cartItems`. Trạng thái số lượng trên huy hiệu giỏ hàng ở header được cập nhật theo thời gian thực.
    *   *Giao diện:* Danh sách sản phẩm hiển thị dạng bảng phẳng, tối giản, hình ảnh sản phẩm là SVG minh họa nhỏ gọn, kèm nút tăng/giảm số lượng và nút xóa thùng rác tinh tế.
    *   *Mã giảm giá (Voucher):* Tích hợp khung nhập mã hỗ trợ cả mã hệ thống sẵn có lẫn mã tự tạo từ trang quản trị.
        *   *Trạng thái thành công:* Giao diện nhập mã biến đổi thành thẻ hiển thị code có phong cách Soft & Clean với nền xanh lá pastel (`bg-emerald-50`, `border-emerald-200`). Dòng trên hiển thị icon vé giảm giá (`fa-solid fa-ticket`) cùng mã code in hoa, góc phải có nút hủy áp dụng dạng dấu X (`fa-solid fa-xmark` chuyển màu Rose khi hover). Dòng dưới hiển thị icon dấu tích tròn (`fa-solid fa-circle-check`) và nhãn "Đã áp dụng thành công" màu xanh lá dịu mắt, tránh hiện tượng co cụm và vỡ chữ trên khung dọc nhỏ. Khi áp dụng thành công, thông tin giảm giá sẽ hiển thị và tổng tiền được tính toán lại ngay tại chỗ.
*   **Thanh toán Click & Collect (`checkout.html`)**:
    *   *Tóm tắt đơn hàng:* Hiển thị mini-list các dòng máy đã chọn kèm giá bán, số lượng và tổng tiền sau khi đã trừ chiết khấu voucher.
    *   *Thông tin đặt trước:* Form nhập Họ tên, SĐT, Email (bắt buộc). Hỗ trợ chọn nhanh ngày hẹn nhận hàng (Hôm nay, Ngày mai, Ngày kia) và chọn khung giờ nhận máy tại cửa hàng.
    *   *Phiếu biên nhận nhận hàng:* Khi nhấn đặt hàng, giỏ hàng tự động được xóa trống, đơn hàng lưu vào `orders` trong `localStorage`. Hệ thống hiển thị một Modal dạng Vé nhận hàng (Receipt ticket) chứa mã đơn hàng ngẫu nhiên `ORD-XXXXXX`, mã QR Code giả lập và thông tin ngày giờ hẹn để khách hàng chụp lại màn hình.
*   **Theo dõi đơn hàng (`/orders`)**:
    *   *Giao diện Tab trạng thái (Các cột):* Sử dụng thanh Tab ngang (Tất cả | Đã đặt | Đang chuẩn bị | Chờ nhận hàng | Hoàn thành | Đã hủy) để phân loại trạng thái đơn. Mỗi tab (cột) đều có nhãn hiển thị kèm **số lượng đơn hàng** thuộc trạng thái đó. Khi người dùng click vào tab, hệ thống tự động lọc chi tiết danh sách phía dưới.
    *   *Lịch sử mua hàng:* Hiển thị danh sách các đơn hàng đã đặt của người dùng dưới dạng card thông tin phẳng, bo góc mềm mại.
    *   *Hành động nhanh:*
        *   Nút **Hủy đơn**: Chỉ sáng và bấm được khi đơn hàng ở trạng thái ban đầu (`Đã đặt`). Khi chuyển sang các trạng thái sau, nút sẽ bị vô hiệu hóa.
        *   **Mã nhận hàng QR**: Hiển thị QR Code tĩnh inline với thẻ đơn hàng (trừ khi đơn đã hủy hoặc hoàn thành) để khách hàng đưa cho nhân viên tại quầy quét xác nhận nhận máy.

---

### 3.6 Trang Admin Dashboard (`/admin`)

Trang quản trị được thiết kế dạng Layout 2 cột (Sidebar bên trái và Vùng làm việc hiển thị nội dung Tab bên phải) sử dụng Javascript để chuyển đổi qua lại giữa các tab mượt mà.

*   **Tổng quan (Dashboard Tab)**:
    *   Hiển thị 3 thẻ chỉ số nhanh ở trên cùng: Tổng doanh thu tạm tính, Tổng số đơn hàng, và Tổng sản phẩm.
    *   Bên dưới là **Biểu đồ doanh thu tuần này** dạng Area Chart trực quan.
*   **Quản lý đơn hàng (`/admin/orders`)**:
    *   *Giao diện Tab trạng thái (Các cột):* Hệ thống lọc đơn hàng sử dụng thanh Tab ngang (Tất cả | Đã đặt | Đang chuẩn bị | Chờ nhận hàng | Hoàn thành | Đã hủy) thay thế cho Select Dropdown truyền thống. Mỗi tab hoạt động như một cột trạng thái, hiển thị rõ **tổng số lượng đơn hàng** bên trong. Click vào một tab sẽ hiển thị chi tiết danh sách đơn thuộc cột đó.
    *   *Cập nhật trạng thái:* Quản trị viên cập nhật trạng thái đơn hàng (kéo đơn sang trạng thái tiếp theo) thông qua thẻ `<select>` trạng thái nằm ngay trên từng dòng của bảng (Table row). Dữ liệu được đồng bộ hóa tức thì với Backend qua API.
*   **Trình mô phỏng quét mã QR (QR Scanner Simulator)**:
    *   Một cửa sổ mô phỏng camera quét mã QR tích hợp. Người dùng quản trị có thể click chọn nhanh mã đơn hàng đang ở trạng thái chờ nhận máy hoặc nhập thủ công, sau đó bấm xác nhận quét.
    *   Khi quét thành công, hệ thống giả lập âm thanh bíp và chuyển trạng thái đơn hàng thành `Hoàn thành` ngay lập tức, tự động cộng dồn doanh thu và cập nhật kho hàng.
*   **Quản lý kho sản phẩm (Products Tab)**:
    *   Hiển thị danh sách sản phẩm hiện tại. Hỗ trợ Form thêm mới sản phẩm tùy chỉnh (nhập Tên, Thương hiệu, Phân khúc, Giá gốc, Giá khuyến mãi, Chip, RAM, ROM, Mô tả). Sản phẩm thêm mới sẽ xuất hiện ở trang chủ và bộ lọc như sản phẩm mặc định.
*   **Quản lý khuyến mãi (Vouchers Tab)**:
    *   Hiển thị danh sách các mã giảm giá đang chạy. Hỗ trợ tạo mới mã giảm giá (Voucher) với cấu hình loại giảm giá (giảm cố định hoặc giảm theo %), hạn mức giảm tối đa và số lượng mã phát hành.

---

## 4. Hiệu Ứng Tương Tác & Chuyển Động Nhẹ Nhàng (Micro-interactions)

Để tạo ra cảm giác cao cấp và chuyên nghiệp, toàn bộ chuyển động trên trang được giới hạn ở tốc độ nhanh nhưng mượt mà (`duration-200` đến `duration-300` với kiểu chuyển động `ease-in-out`):

*   **Hover Card**: Card sản phẩm chỉ nâng lên nhẹ nhàng (`hover:-translate-y-1`) và đổ bóng rất nhạt để tránh gây rối mắt khi cuộn danh sách lớn.
*   **Skeleton Loader**: Khung xương giả lập cấu trúc trang web khi tải dữ liệu sử dụng màu xám Slate cực nhạt (`bg-slate-200/60` sang `bg-slate-200/30`) chạy hiệu ứng shimmer chậm rãi, tạo cảm giác dễ chịu.
*   **Toast Alert**: Hộp thông báo thêm sản phẩm thành công trượt nhẹ nhàng từ góc phải, sử dụng nền kính mờ dịu mắt, không che khuất các nội dung quan trọng.
*   **Compare Drawer**: Ngăn kéo so sánh nổi trượt lên nhẹ nhàng từ đáy màn hình với viền trên được làm mờ tinh tế.

---

## 5. Tối Ưu Hóa Trải Nghiệm Trên Thiết Bị Di Động (Mobile-First)

*   **Thanh Điều Hướng Đáy (Sticky Bottom Bar)**:
    *   Thiết kế mỏng nhẹ, nền kính mờ ôm sát đáy màn hình. Các icon chức năng (Trang Chủ, Tìm Kiếm, Giỏ Hàng, Đơn Hàng/Quản Trị) được thiết kế dạng outline mảnh, chỉ tô màu xanh Sky khi được chọn.
*   **Lọc bằng ngăn kéo Drawer**:
    *   Khi người dùng click vào nút lọc trên di động, bảng tùy chọn bộ lọc trượt êm ái từ cạnh phải màn hình ra, bố cục chia ngăn rõ ràng, dễ dàng thao tác bằng một tay.
*   **Touch Targets**:
    *   Mọi nút bấm và liên kết trên Mobile đều được thiết kế rộng rãi (tối thiểu `44px` chiều cao) với khoảng cách đệm (padding) hợp lý để tối ưu hóa thao tác chạm, mang lại cảm giác mượt mà và chính xác.

---

## 6. Phác Thảo Bố Cục Giao Diện (Wireframe Sketches)

Dưới đây là phác thảo cấu trúc bố cục (ASCII Wireframes) của các trang quan trọng, thể hiện sự kết hợp giữa cấu trúc khoa học của thegioididong.com và phong cách hiện đại, dịu mắt.

### 6.1 Trang Chủ (`/`)

```
+-----------------------------------------------------------------------------------------+
|  PhoneStore     [ Tìm kiếm sản phẩm... 🔍 ]           Giỏ Hàng (0)   Đơn Hàng   Quản Trị  |
+-----------------------------------------------------------------------------------------+
|  Tất cả  |  Apple  |  Samsung  |  Xiaomi  |  OPPO  |  Vivo  |  Gaming Phone  |            |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   +---------------------------------------------------------------------------------+   |
|   |  HERO BANNER (Tỉ lệ 21:9 - Bo góc 16px - Nền Slate mượt mà)                     |   |
|   |  "Bắt trọn khoảnh khắc, kết nối tương lai với Smartphone thế hệ mới"            |   |
|   |  [ Xem Bộ Sưu Tập ]                                                             |   |
|   +---------------------------------------------------------------------------------+   |
|                                                                                         |
|   HÃNG ĐIỆN THOẠI NỔI BẬT (Icon phẳng, đơn sắc nhã nhặn, hover mới sáng lên Sky Blue)   |
|   [ Apple ]   [ Samsung ]   [ Xiaomi ]   [ OPPO ]   [ Vivo ]   [ Realme ]   [ Honor ]   |
|                                                                                         |
|   SẢN PHẨM BÁN CHẠY (Grid 4 cột thoáng đãng, bóng mờ siêu nhẹ)                         |
|   +------------------+  +------------------+  +------------------+  +------------------+ |
|   | Ảnh Điện thoại   |  | Ảnh Điện thoại   |  | Ảnh Điện thoại   |  | Ảnh Điện thoại   | |
|   | iPhone 15 Pro Max|  | Galaxy S24 Ultra |  | Xiaomi 14        |  | OPPO Reno11 5G   | |
|   | 256GB            |  | 256GB            |  | 12GB - 256GB     |  | 8GB - 256GB      | |
|   | 29.590.000đ      |  | 30.490.000đ      |  | 21.990.000đ      |  | 10.990.000đ      | |
|   | 31.990.000đ -7%  |  | 33.990.000đ -10% |  | 22.990.000đ -4%  |  | 11.990.000đ -8%  | |
|   | 4.9 ★ (420đg)    |  | 4.8 ★ (384đg)    |  | 4.7 ★ (165đg)    |  | 4.5 ★ (192đg)    | |
|   +------------------+  +------------------+  +------------------+  +------------------+ |
+-----------------------------------------------------------------------------------------+
```

### 6.2 Trang Danh Sách Sản Phẩm (`/phone`)

```
+-----------------------------------------------------------------------------------------+
|  PhoneStore     [ Tìm kiếm sản phẩm... 🔍 ]           Giỏ Hàng (0)   Đơn Hàng   Quản Trị  |
+-----------------------------------------------------------------------------------------+
|  Trang chủ / Điện thoại                                                                 |
|                                                                                         |
|  BỘ LỌC TÌM KIẾM (Thanh bộ lọc ngang & Hành động)                                       |
|  [ Hãng v ]  [ Giá v ]  [ Nhu cầu v ]           [ 🎛️ Tất cả bộ lọc ] [ Sắp xếp v ]       |
|                                                                                         |
|  Bộ lọc đang chọn: [ Samsung x ]  [ Dưới 20 triệu x ] [ Xóa tất cả ]                    |
|  -------------------------------------------------------------------------------------  |
|  Tìm thấy 24 sản phẩm Điện thoại Samsung từ 10 đến 20 Triệu                             |
|                                                                                         |
|  +------------------+  +------------------+  +------------------+  +------------------+ |
|  | Ảnh Điện thoại   |  | Ảnh Điện thoại   |  | Ảnh Điện thoại   |  | Ảnh Điện thoại   | |
|  | Galaxy A55 5G    |  | Galaxy A35 5G    |  | Galaxy S23 FE    |  | Galaxy M54 5G    | |
|  | 10.490.000đ      |  | 8.290.000đ       |  | 13.990.000đ      |  | 11.500.000đ      | |
|  | 4.6 ★ (128đg)    |  | 4.5 ★ (114đg)    |  | 4.8 ★ (232đg)    |  | 4.7 ★ (141đg)    | |
|  +------------------+  +------------------+  +------------------+  +------------------+ |
+-----------------------------------------------------------------------------------------+
```

### 6.3 Trang Chi Tiết Sản Phẩm (`/phone/[slug]`)

```
+-----------------------------------------------------------------------------------------+
|  PhoneStore     [ Tìm kiếm sản phẩm... 🔍 ]           Giỏ Hàng (0)   Đơn Hàng   Quản Trị  |
+-----------------------------------------------------------------------------------------+
|  Trang chủ / Điện thoại / Xiaomi / Samsung Galaxy S24 Ultra                              |
|  Samsung Galaxy S24 Ultra 256GB                                                          |
|  ★ 4.8 / 5 (384 đánh giá) | ⊕ So sánh cấu hình                                          |
|  -------------------------------------------------------------------------------------  |
|  [ Cột Trái: col-span-7 (Gallery+Mô tả+Specs) ] | [ Cột Phải: col-span-5 (Buy Box)  ]   |
|                                               |                                          |
|  +---------------------------------------+    | 1. CHỌN DUNG LƯỢNG:                      |
|  |                                       |    |  [ 4GB-128GB ]  [ 8GB-256GB ]            |
|  |               ẢNH LỚN                 |    |                                          |
|  |                                       |    | 2. CHỌN MÀU SẮC:                         |
|  +---------------------------------------+    |  [ ● Đen ]  [ ● Trắng ]  [ ● Xanh ]     |
|  [ Ảnh 1 ] [ Ảnh 2 ] [ Ảnh 3 ] [ Ảnh 4 ]      |                                          |
|                                               | GIÁ BÁN ONLINE:      (Rose-50/30 BG)     |
|  MÔ TẢ SẢN PHẨM                               | 30.490.000 đ  3̶3̶.̶9̶9̶0̶.̶0̶0̶0̶  -10%          |
|  Galaxy S24 Ultra mở ra kỷ nguyên AI mới      |                                          |
|  với khung viền Titanium bền bỉ...            | [ Thêm vào giỏ (viền Rose) ][ MUA NGAY ] |
|  [ Đọc thêm bài viết v ]                      |                                          |
|                                               | CHÍNH SÁCH MUA HÀNG & BẢO HÀNH:          |
|  BẢNG THÔNG SỐ KỸ THUẬT                       | 🔄 Hư gì đổi nấy 12 tháng               |
|  Màn hình: Dynamic AMOLED 2X, 6.8"            | 🛡️ Bảo hành chính hãng 1 năm             |
|  Chip: Snapdragon 8 Gen 3 for Galaxy          | 📦 Bộ SP gồm: Hộp, Sách, Cáp...         |
|  RAM/ROM: 12GB/256GB                           |                                          |
|                                               |                                          |
|  ═══════════════════════════════════════════════════════════════════                      |
|  SO SÁNH SẢN PHẨM (CompareWidget)                                                       |
|  ═══════════════════════════════════════════════════════════════════                      |
|  ĐÁNH GIÁ TỪ KHÁCH HÀNG (ProductReviews)                                                |
+-----------------------------------------------------------------------------------------+
```

### 6.4 Bản Vẽ Mô Phỏng Giao Diện (Mockup Image)
Dưới đây là hình ảnh phác thảo giao diện trang chủ theo định hướng thiết kế mới:

![Mockup Giao Diện Trang Chủ PhoneStore](file:///C:/Users/Bao/.gemini/antigravity/brain/e3cdcea0-42bd-4fed-9db8-ced6a7feca7c/laptop_store_ui_1781689117879.png)

---

## 7. Định Hướng Mở Rộng Sản Phẩm (Laptop & Phụ kiện)

Khi hệ thống mở rộng quy mô kinh doanh thêm **Laptop** và **Phụ kiện (Accessories)**, cấu trúc thiết kế giao diện và cơ sở dữ liệu sẽ được điều chỉnh linh hoạt theo hướng mô-đun hóa để tránh phải viết lại toàn bộ mã nguồn.

### 7.1 Tái Cấu Trúc Cơ Sở Dữ Liệu (Database Schema)

Để lưu trữ các sản phẩm có thuộc tính khác nhau mà không làm phình to hoặc phân mảnh bảng dữ liệu, có hai cách tiếp cận chuyên nghiệp:

*   **Giải pháp Đa năng (Khuyến nghị - EAV hoặc JSONB)**:
    *   Tách các trường thông tin cơ bản dùng chung (id, tên, giá, hãng, hình ảnh, loại sản phẩm, số lượng tồn kho) vào bảng `products`.
    *   Đưa tất cả thông số kỹ thuật đặc thù vào một cột duy nhất là `specs` có kiểu dữ liệu **JSONB** trong PostgreSQL.
    *   *Ví dụ cấu trúc cột specs JSONB*:
        *   **Điện thoại**: `{"ram": "8GB", "pin": "5000mAh", "camera": "50MP", "sim": "2 SIM"}`
        *   **Laptop**: `{"ram": "16GB", "cpu": "Intel i7", "ssd": "512GB", "screen": "14 inch"}`
        *   **Phụ kiện (Sạc dự phòng)**: `{"dung_luong": "20000mAh", "cong_suat": "22.5W", "cong_ket_noi": "Type-C"}`
*   **Giải pháp Phân tách Bảng (Polymorphic)**:
    *   Giữ bảng `products` làm bảng cha.
    *   Tạo thêm các bảng con liên kết khóa ngoại 1-1: `phone_details`, `laptop_details`, `accessory_details` để chứa các thông số đặc thù của từng loại sản phẩm.

### 7.2 Thay Đổi Định Tuyến & Cấu Trúc Thư Mục (Routing & Folder Structure)

Để tối ưu hóa việc tái sử dụng mã nguồn và quản lý trang, cấu trúc routing trong `frontend/src/app` sẽ được chuyển đổi linh hoạt:

*   **Chuyển đổi sang Route Động theo Danh mục (Dynamic Category Routing)**:
    Thay vì đặt cứng thư mục `/phone`, hệ thống sẽ sử dụng thư mục động `/[category]`:
    ```
    frontend/src/app/(shop)/
    ├── [category]/
    │   ├── page.tsx          # Danh sách sản phẩm theo danh mục (phone, laptop, accessory)
    │   └── [slug]/
    │       └── page.tsx      # Chi tiết sản phẩm động tương ứng với slug
    ```
*   Khi người dùng truy cập `/phone`, `[category]` nhận giá trị `phone`. Khi truy cập `/laptop`, `[category]` nhận giá trị `laptop`. Cách làm này giúp giảm 70% lượng code giao diện lặp lại.

### 7.3 Điều Chỉnh Giao Diện Người Dùng (UI/UX Adaptation)

#### 7.3.1 Header & Navigation (Thanh Điều Hướng)
*   Tầng 2 của Header sẽ được thiết kế lại để phân loại rõ ràng các danh mục chính:
    ```
    [ LOGO ] [ Tìm kiếm ] ...
    -------------------------------------------------------------------------------
    [ 📱 Điện thoại ]   [ 💻 Laptop ]   [ 🎧 Phụ kiện ]   [ 🏷️ Khuyến mãi ]
    ```
*   Khi di chuột (Hover) vào "Laptop" hoặc "Phụ kiện", một **Mega Menu** (Menu lớn) kính mờ trượt xuống hiển thị danh sách các thương hiệu phổ biến (Dell, HP, Asus) hoặc danh mục phụ kiện (Sạc, Tai nghe, Ốp lưng).

#### 7.3.2 Bộ Lọc Động (Dynamic Filter System)
*   Thành phần bộ lọc (Filter Component) sẽ tự động thay đổi các popover tùy chọn dựa theo danh mục sản phẩm đang xem:
    *   *Nếu `category === 'phone'`*: Hiện bộ lọc Dung lượng pin, Số SIM, Độ phân giải camera, Dung lượng bộ nhớ (128GB, 256GB...).
    *   *Nếu `category === 'laptop'`*: Hiện bộ lọc CPU (Core i5, Ryzen 5), RAM (8GB, 16GB), Ổ cứng SSD, Card đồ họa rời.

#### 7.3.3 Thẻ Sản Phẩm Đa Năng (Adaptive Product Card)
*   Phần tóm tắt thông số kỹ thuật (Spec tags) ở chân card sản phẩm sẽ hiển thị linh hoạt dựa theo loại sản phẩm:
    *   Điện thoại: Hiển thị dung lượng pin & bộ nhớ (Ví dụ: `5000 mAh | 256GB`).
    *   Laptop: Hiển thị tag CPU & RAM (Ví dụ: `Ultra 7 | 16GB`).
    *   Phụ kiện: Hiển thị thuộc tính chính (Ví dụ: `Sạc nhanh 65W | Type-C`).

#### 7.3.4 Trang Chi Tiết & So Sánh
*   Trang chi tiết sản phẩm sẽ tự động render bảng cấu hình tương ứng dựa vào schema thông số kỹ thuật của loại sản phẩm đó.
*   Trang so sánh sản phẩm sẽ giới hạn người dùng chỉ được so sánh các sản phẩm **cùng loại** (chỉ so sánh Điện thoại với Điện thoại, Laptop với Laptop). Hệ thống sẽ hiện thông báo nhắc nhở nếu người dùng cố ý so sánh chéo danh mục.
