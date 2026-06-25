# Spec: Tái cấu trúc Quản lý Sản phẩm — Mô hình "Sản phẩm Gốc + Phiên bản kế thừa"

## Objective

### Vấn đề hiện tại

Cấu trúc dữ liệu hiện tại lưu **mỗi "dòng máy + dung lượng" thành 1 Product riêng biệt**, rồi `ProductVariant` chỉ phân biệt theo màu sắc. Ví dụ:

```
Product: "Galaxy S26 Ultra 256GB" → Variant(16-256-Đen), Variant(16-256-Trắng)
Product: "Galaxy S25 Ultra 256GB" → Variant(12-256-Đen), Variant(12-256-Bạc)
```

**Hệ quả:**
- Admin phải tạo **nhiều Product trùng lặp** cho cùng 1 dòng máy nhưng khác dung lượng (VD: Galaxy S26 Ultra 256GB vs 512GB → 2 Product).
- Mỗi Product yêu cầu nhập lại toàn bộ thông số kỹ thuật (chip, camera, pin...) dù giống hệt nhau.
- Variant yêu cầu nhập **SKU thủ công** — dễ gây trùng lặp hoặc lỗi cú pháp.
- Trên frontend, khách hàng **không thể chuyển đổi giữa các dung lượng** trên cùng 1 trang chi tiết sản phẩm (phải navigate sang Product khác).

### Giải pháp đề xuất

Chuyển sang mô hình **"Sản phẩm Gốc (Base Product) + Phiên bản (Variant) kế thừa đầy đủ"**:

```
Product: "Galaxy S26 Ultra"
  ├── Variant(16GB-256GB, Đen, 34.990.000đ, ảnh riêng)
  ├── Variant(16GB-256GB, Trắng, 34.990.000đ, ảnh riêng)  
  ├── Variant(16GB-512GB, Đen, 39.990.000đ, ảnh riêng)
  └── Variant(16GB-512GB, Trắng, 39.990.000đ, ảnh riêng)
```

**Lợi ích:**
1. Admin chỉ tạo **1 Product duy nhất** cho mỗi dòng máy → nhập thông số 1 lần.
2. Variant kế thừa trọn vẹn: mỗi variant mang đầy đủ **RAM, ROM, Màu sắc, Giá, Tồn kho, Ảnh riêng**.
3. **Không cần SKU phức tạp** — hệ thống tự sinh SKU từ `slug + RAM + ROM + index_màu`.
4. Frontend cho phép chọn **dung lượng → màu sắc** trên cùng 1 trang (đúng mô hình TGDD/CellphoneS).
5. Giảm lượng Products trong DB xuống ~50% (mỗi dòng máy chỉ còn 1 record).

### User & Target

- **Admin**: CRUD sản phẩm đơn giản hơn, chỉ nhập thông tin cơ bản (tên, hãng, phân khúc, thông số) 1 lần. Thêm variant chỉ cần chọn RAM/ROM/Màu/Giá/Tồn kho.
- **Khách hàng**: Trải nghiệm chọn phiên bản mượt mà hơn (chọn cấu hình → chọn màu) trên cùng 1 trang.

---

## ASSUMPTIONS I'M MAKING

1. **Mỗi dòng điện thoại có 1 Product duy nhất**, không còn tách theo dung lượng (VD: "Galaxy S26 Ultra" thay vì "Galaxy S26 Ultra 256GB").
2. **SKU tự động sinh** từ hệ thống, Admin không cần nhập thủ công. Format: `{slug}-{ramGb}-{dungLuongGb}-{colorIndex}`.
3. **Thông số kỹ thuật vẫn nằm trên Product** (không di chuyển xuống Variant). Chỉ RAM, ROM, Màu, Giá, Tồn kho, Ảnh là thuộc tính của Variant.
4. **`imageUrl` trên Variant** sẽ là ảnh đại diện cho variant đó (ảnh theo màu), còn **`ProductMedia`** vẫn là gallery chung của Product.
5. **Tên sản phẩm (`sanPham`)** sẽ không chứa dung lượng nữa (VD: "Galaxy S26 Ultra" thay vì "Galaxy S26 Ultra 256GB"). Dung lượng hiển thị từ Variant.
6. **Slug** cũng sẽ không chứa dung lượng (VD: `galaxy-s26-ultra` thay vì `galaxy-s26-ultra-256gb`).
7. **Dữ liệu seed** cần được gộp lại: các Product cùng dòng máy sẽ merge thành 1, variants được gom vào.
8. **Frontend ProductCard** hiển thị "Giá từ X" lấy từ variant có `giaBan` thấp nhất — logic này đã đúng, không cần thay đổi.
9. **Order history** sẽ không bị ảnh hưởng vì `OrderItem` tham chiếu đến `ProductVariant.id` (UUID) — migration sẽ phải giữ nguyên variant IDs hoặc reset DB (seed lại).

> **→ Correct me now or I'll proceed with these.**

---

## Tech Stack

Không thay đổi — sử dụng stack hiện tại:
- **Backend**: Express + Prisma + Neon PostgreSQL
- **Frontend**: Next.js 16+ (App Router) + Tailwind CSS v4
- **Shared**: Zod schemas, TypeScript types
- **Media**: Cloudinary

---

## Commands

```
Build shared:     cd web/shared && npm run build
Build backend:    cd web/backend && npm run build
Dev backend:      cd web/backend && npm run dev
Dev frontend:     cd web/frontend && npm run dev
Test:             cd web/backend && npm test
DB migrate:       cd web/backend && npx prisma migrate dev --name restructure-product-variants
DB seed:          cd web/backend && npx prisma db seed
Prisma generate:  cd web/backend && npx prisma generate
```

---

## Project Structure

Các file bị ảnh hưởng:

```
shared/src/schemas/admin.schema.ts          → Cập nhật Zod schema (bỏ SKU bắt buộc, thêm auto-generate)
web/backend/prisma/schema.prisma            → Cập nhật ProductVariant (bỏ unique SKU)
web/backend/src/controllers/
    admin.product.controller.ts             → Cập nhật CRUD logic (auto-gen SKU, gộp variant)
    product.controller.ts                   → Cập nhật query logic (slug không còn chứa dung lượng)
web/backend/prisma/seed.ts                  → Gộp data: merge products cùng dòng máy
data/dienthoai/<Brand>/data.json            → Tái cấu trúc dữ liệu seed (merge products)

web/frontend/src/app/admin/products/page.tsx  → Đơn giản hóa form CRUD (bỏ trường SKU)
web/frontend/src/components/product/
    ProductInteractiveSection.tsx              → Đã hoạt động đúng (group by RAM/ROM → Color)
    ProductCard.tsx                            → Kiểm tra hiển thị khi tên không chứa dung lượng
web/frontend/src/app/phone/[slug]/page.tsx    → Kiểm tra lại SKU resolution logic
```

---

## Code Style

Giữ nguyên quy ước hiện tại:
- Prisma model dùng camelCase, `@map` sang snake_case
- Controller trả JSON chuẩn `{ data, error, pagination }`
- Zod validate trước khi xử lý
- Frontend component dùng Tailwind CSS v4

### Ví dụ Auto-generate SKU:

```typescript
// Hàm tự sinh SKU từ slug + variant info
const generateSku = (productSlug: string, ramGb: number, dungLuongGb: number, colorIndex: number): string => {
  return `${productSlug}-${ramGb}-${dungLuongGb}-${colorIndex}`;
};

// Ví dụ kết quả:
// "galaxy-s26-ultra-16-256-0"  → 16GB RAM, 256GB ROM, màu thứ 1
// "galaxy-s26-ultra-16-512-1"  → 16GB RAM, 512GB ROM, màu thứ 2
```

### Ví dụ Admin form đơn giản hóa:

```tsx
// TRƯỚC: Admin phải nhập SKU thủ công
<Input label="SKU" value={v.sku} onChange={...} />

// SAU: SKU tự sinh, Admin chỉ nhập RAM/ROM/Màu/Giá/Tồn kho
// Không có trường SKU trên UI
```

---

## Testing Strategy

### Kiểm thử Backend
- **File test hiện có**: `web/backend/src/routes/admin.product.test.ts`
- Cập nhật test cases:
  - Tạo product không cần SKU → hệ thống tự sinh
  - Tạo product với nhiều variant (đa dung lượng, đa màu)
  - Update product: thêm/xóa variant → SKU tự cập nhật
  - Kiểm tra ràng buộc: không xóa variant đã có đơn hàng

### Kiểm thử Frontend
- Kiểm tra thủ công trên browser:
  - Admin tạo product mới → chỉ nhập tên, hãng, thông số, variant (RAM/ROM/Màu/Giá)
  - Trang chi tiết sản phẩm: chọn cấu hình → màu → giá thay đổi đúng
  - URL `?v=` hoạt động đúng với SKU mới

### Kiểm thử Migration
- Chạy `npx prisma migrate dev` không lỗi
- Chạy `npx prisma db seed` với dữ liệu đã gộp → không trùng slug

---

## Boundaries

### Always do
- Validate input bằng Zod schema trước khi xử lý
- Auto-generate SKU — Admin không bao giờ phải nhập thủ công
- Giữ nguyên `onDelete: Cascade` cho Product → Variant
- Kiểm tra lịch sử đơn hàng trước khi xóa variant (safe delete constraint)
- Bảo toàn toàn bộ comment/docstring không liên quan đến thay đổi

### Ask first
- Thay đổi schema database (migration) — cần confirm trước khi chạy
- Xóa dữ liệu cũ (seed lại DB) — cần confirm
- Thay đổi format slug hiện tại (có thể ảnh hưởng SEO/bookmarks)
- Thay đổi cấu trúc data.json files

### Never do
- Xóa SKU unique constraint trên DB mà không thay thế bằng cơ chế khác
- Commit credentials hoặc API keys
- Xóa test files mà không thay thế
- Để placeholder `// TODO: implement later`
- Thay đổi logic đơn hàng/giỏ hàng/voucher (out of scope)

---

## Success Criteria

1. ✅ **Admin tạo Product mới** chỉ cần nhập: Tên sản phẩm, Hãng, Phân khúc, Mô tả, Thông số kỹ thuật (tất cả optional). **Không nhập SKU**.
2. ✅ **Admin thêm Variant** chỉ cần nhập: RAM (GB), ROM (GB), Màu sắc, Giá gốc, Giá bán, Tồn kho. SKU tự sinh.
3. ✅ **Mỗi dòng máy = 1 Product** trong DB. VD: "Galaxy S26 Ultra" chỉ có 1 record, các dung lượng (256GB, 512GB) là variants.
4. ✅ **Frontend PDP**: Khách hàng chọn Dung lượng → Màu trên cùng 1 trang, không cần navigate.
5. ✅ **ProductCard** hiển thị "Giá từ X" đúng (variant giá thấp nhất).
6. ✅ **URL `?v=`** hoạt động đúng với SKU format mới.
7. ✅ **Seed thành công** với dữ liệu đã gộp, không lỗi slug trùng lặp.
8. ✅ **Backend test** pass toàn bộ.
9. ✅ **Safe delete**: Không xóa variant có lịch sử đơn hàng.

---

## Open Questions

1. **Slug cũ vs slug mới**: Slug hiện tại chứa dung lượng (`galaxy-s26-ultra-256gb`). Slug mới sẽ không chứa (`galaxy-s26-ultra`). Có muốn tạo redirect 301 cho slug cũ hay chấp nhận 404? (Vì MVP nên có thể chấp nhận reset).

2. **Merge data.json**: Có ~130 sản phẩm trong DB. Một số dòng máy có thể đã có 2-3 entries cho cùng model (khác dung lượng). Cần viết script tự động merge hay chỉnh tay data.json?

3. **SKU format**: Đề xuất `{slug}-{ramGb}-{dungLuongGb}-{colorIndex}`. Có phù hợp không? Hay muốn format khác?

4. **Tên sản phẩm hiển thị**: "Galaxy S26 Ultra" hay "Samsung Galaxy S26 Ultra"? (Hiện tại đang lưu "Galaxy S26 Ultra 256GB" — bỏ phần dung lượng và hãng đã có trường riêng).
