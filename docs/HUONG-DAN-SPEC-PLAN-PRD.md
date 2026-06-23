# Hướng Dẫn Spec và Plan cho PRD với 12 FR / 5 Milestones

## Tổng Quan

Tài liệu này hướng dẫn cách sử dụng quy trình Spec-Driven Development và Planning để triển khai một PRD (Product Requirements Document) có 12 chức năng (Functional Requirements) được chia thành 5 Milestones.

## Chiến Lược Tổng Thể: 3 Cách Tiếp Cận

Bạn có thể chọn 1 trong 3 cách sau tùy theo quy mô và mức độ phức tạp:

### 🎯 Cách 1: Spec Toàn Bộ → Plan Chi Tiết Từng Milestone (Khuyến nghị)

**Khi nào dùng:** PRD có cấu trúc rõ ràng, các FR ít phụ thuộc lẫn nhau, team có kinh nghiệm.

**Quy trình:**
```
1. Tạo 1 SPEC tổng thể (SPEC.md) cho toàn bộ 12 FR
2. Tạo 5 PLAN riêng biệt, mỗi plan cho 1 Milestone
3. Implement từng Milestone theo thứ tự
```

**Ưu điểm:**
- ✅ Có tầm nhìn toàn cảnh từ đầu
- ✅ Tránh conflict kiến trúc giữa các Milestone
- ✅ Dễ ước lượng timeline và resource tổng thể
- ✅ Review một lần cho toàn bộ kiến trúc

**Nhược điểm:**
- ⚠️ Mất nhiều thời gian ban đầu
- ⚠️ Có thể phải điều chỉnh SPEC nếu yêu cầu thay đổi

---

### 🎯 Cách 2: Spec + Plan Từng Milestone (Linh hoạt nhất)

**Khi nào dùng:** PRD có yêu cầu chưa rõ ràng, có thể thay đổi, hoặc cần delivery nhanh từng phase.

**Quy trình:**
```
1. Tạo SPEC-M1 + PLAN-M1 → Implement M1
2. Tạo SPEC-M2 + PLAN-M2 → Implement M2
3. ... (lặp lại cho M3, M4, M5)
```

**Ưu điểm:**
- ✅ Ship nhanh từng milestone
- ✅ Linh hoạt thay đổi yêu cầu
- ✅ Học hỏi từ milestone trước để cải thiện milestone sau
- ✅ Phù hợp với Agile/Scrum

**Nhược điểm:**
- ⚠️ Có thể phải refactor kiến trúc sau này
- ⚠️ Cần discipline để maintain consistency

---

### 🎯 Cách 3: Spec Toàn Bộ → Plan Toàn Bộ (Chỉ dành cho dự án nhỏ)

**Khi nào dùng:** PRD đơn giản, 12 FR có thể hoàn thành trong 2-3 sprint, team nhỏ.

**Quy trình:**
```
1. Tạo 1 SPEC tổng thể (SPEC.md)
2. Tạo 1 PLAN tổng thể (PLAN.md) với tất cả tasks
3. Implement theo thứ tự tasks
```

**Ưu điểm:**
- ✅ Đơn giản, ít documentation
- ✅ Phù hợp dự án nhỏ

**Nhược điểm:**
- ⚠️ Không phù hợp với dự án lớn
- ⚠️ Khó quản lý khi task list dài

---

## Chi Tiết Cách 1: Spec Toàn Bộ → Plan Từng Milestone (KHUYẾN NGHỊ)

### Bước 1: Tạo SPEC Tổng Thể

**Với Claude Code / Kiro:**

```markdown
/spec

Tôi có một PRD với 12 chức năng được chia thành 5 Milestones:

**Milestone 1: Xác thực và Quản lý người dùng**
- FR1: Đăng ký tài khoản
- FR2: Đăng nhập/Đăng xuất
- FR3: Quản lý hồ sơ người dùng

**Milestone 2: Quản lý sản phẩm**
- FR4: Thêm sản phẩm (Admin)
- FR5: Sửa/Xóa sản phẩm (Admin)
- FR6: Tìm kiếm và lọc sản phẩm

**Milestone 3: Giỏ hàng và Đơn hàng**
- FR7: Thêm sản phẩm vào giỏ hàng
- FR8: Thanh toán
- FR9: Xem lịch sử đơn hàng

**Milestone 4: Tính năng nâng cao**
- FR10: Đánh giá sản phẩm
- FR11: Wishlist

**Milestone 5: Admin Dashboard**
- FR12: Thống kê và báo cáo

Tech stack: [Ghi rõ tech stack của bạn]

Hãy tạo một SPEC tổng thể cho toàn bộ dự án này.
```

**Output:** File `SPEC.md` chứa:
- Objective (mục tiêu tổng thể)
- Tech Stack đầy đủ
- Database Schema tổng thể
- API Contracts cho tất cả 12 FR
- Project Structure
- Code Style
- Testing Strategy
- Boundaries (quy tắc)
- Success Criteria tổng thể

### Bước 2: Tạo Plan Cho Milestone 1

**Prompt:**

```markdown
/plan

Dựa trên SPEC.md đã tạo, hãy tạo plan chi tiết cho MILESTONE 1 bao gồm:
- FR1: Đăng ký tài khoản
- FR2: Đăng nhập/Đăng xuất  
- FR3: Quản lý hồ sơ người dùng

Yêu cầu:
- Breakdown thành các tasks nhỏ có thể implement trong 1 session
- Mỗi task có acceptance criteria rõ ràng
- Xác định dependency graph
- Thêm checkpoints sau mỗi 2-3 tasks
- Estimate scope cho từng task

Lưu kết quả vào: tasks/milestone-1-plan.md
```

**Output:** File `tasks/milestone-1-plan.md` chứa:
- Overview của Milestone 1
- Dependency graph
- Task list chi tiết (10-20 tasks)
- Checkpoints
- Risk mitigation

### Bước 3: Implement Milestone 1

**Prompt:**

```markdown
Hãy implement Task 1 trong milestone-1-plan.md theo quy trình incremental-implementation:

1. Implement phần nhỏ nhất có thể test được
2. Chạy tests
3. Verify
4. Commit
5. Tiếp tục slice tiếp theo

Sau mỗi 2-3 tasks, dừng lại để tôi review.
```

**Lưu ý quan trọng:**
- Agent sẽ tự động apply `incremental-implementation` skill
- Mỗi task được chia thành nhiều slices nhỏ
- Test và verify sau mỗi slice
- Commit thường xuyên

### Bước 4: Checkpoint Sau Milestone 1

Sau khi hoàn thành Milestone 1:

```markdown
Chạy checkpoint cho Milestone 1:
- [ ] All tests pass
- [ ] Build succeeds
- [ ] Manual test: User có thể đăng ký, đăng nhập, và chỉnh sửa profile
- [ ] Code review passed
- [ ] Ready to deploy to staging

Nếu tất cả OK, chúng ta sẽ chuyển sang Milestone 2.
```

### Bước 5-8: Lặp Lại Cho Milestone 2-5

Với mỗi Milestone còn lại:

```markdown
/plan

Dựa trên SPEC.md, hãy tạo plan chi tiết cho MILESTONE [N] bao gồm:
[List các FR trong milestone này]

Lưu ý: 
- Dựa trên code đã implement ở các milestone trước
- Tái sử dụng patterns và components có sẵn
- Không refactor code cũ trừ khi absolutely necessary

Lưu kết quả vào: tasks/milestone-[N]-plan.md
```

---

## Chi Tiết Cách 2: Spec + Plan Từng Milestone

### Bước 1: Spec + Plan Milestone 1

**Prompt:**

```markdown
/spec

Tôi có PRD với 12 FR chia thành 5 Milestones. Hãy tạo SPEC chi tiết cho MILESTONE 1:

**Milestone 1: Xác thực và Quản lý người dùng**
- FR1: Đăng ký tài khoản (email/password, validation, confirmation email)
- FR2: Đăng nhập/Đăng xuất (session management, JWT)
- FR3: Quản lý hồ sơ người dùng (edit profile, change password, upload avatar)

Tech stack: [Your tech stack]

Context cho các milestone sau (không cần implement ngay):
- M2: Quản lý sản phẩm
- M3: Giỏ hàng và Đơn hàng
- M4: Tính năng nâng cao
- M5: Admin Dashboard

Hãy tạo SPEC để:
1. Đáp ứng đầy đủ M1
2. Thiết kế database schema có thể mở rộng cho M2-M5
3. Thiết kế API structure có thể scale

Lưu vào: SPEC-M1.md
```

**Sau đó tạo plan:**

```markdown
/plan

Dựa trên SPEC-M1.md, tạo plan implementation chi tiết.
Lưu vào: tasks/milestone-1-plan.md
```

### Bước 2: Implement Milestone 1

```markdown
Implement từng task trong milestone-1-plan.md theo thứ tự.
Áp dụng incremental-implementation và test-driven-development.
```

### Bước 3: Spec + Plan Milestone 2

**Prompt:**

```markdown
/spec

Hãy tạo SPEC cho MILESTONE 2: Quản lý sản phẩm

**Yêu cầu:**
- FR4: Thêm sản phẩm (Admin only)
- FR5: Sửa/Xóa sản phẩm (Admin only)
- FR6: Tìm kiếm và lọc sản phẩm (Public)

**Context từ M1:**
- Đã có: User authentication, role-based access
- Database: [Paste relevant schema từ M1]
- API structure: [Paste relevant patterns từ M1]

Hãy tạo SPEC để:
1. Tái sử dụng auth system từ M1
2. Extend database schema với Products table
3. Tạo admin middleware cho authorization
4. Thiết kế search/filter architecture có thể scale

Lưu vào: SPEC-M2.md
```

### Bước 4-7: Lặp Lại Cho M3, M4, M5

---

## Cấu Trúc File Khuyến Nghị

### Cách 1: Spec Toàn Bộ
```
project-root/
├── SPEC.md                        # Spec tổng thể cho 12 FR
├── tasks/
│   ├── milestone-1-plan.md        # Plan chi tiết M1
│   ├── milestone-2-plan.md        # Plan chi tiết M2
│   ├── milestone-3-plan.md        # Plan chi tiết M3
│   ├── milestone-4-plan.md        # Plan chi tiết M4
│   └── milestone-5-plan.md        # Plan chi tiết M5
├── docs/
│   ├── api-contracts.md           # API documentation
│   ├── database-schema.md         # Database design
│   └── architecture.md            # Architecture decisions
└── src/
```

### Cách 2: Spec Từng Milestone
```
project-root/
├── specs/
│   ├── SPEC-M1.md                 # Spec riêng cho M1
│   ├── SPEC-M2.md                 # Spec riêng cho M2
│   ├── SPEC-M3.md                 # Spec riêng cho M3
│   ├── SPEC-M4.md                 # Spec riêng cho M4
│   └── SPEC-M5.md                 # Spec riêng cho M5
├── tasks/
│   ├── milestone-1-plan.md
│   ├── milestone-2-plan.md
│   ├── milestone-3-plan.md
│   ├── milestone-4-plan.md
│   └── milestone-5-plan.md
└── src/
```

---

## Template Prompt Chi Tiết

### Template Spec Toàn Bộ

```markdown
/spec

## Context
Tôi có một dự án web bán hàng với 12 chức năng chính (FR - Functional Requirements) được chia thành 5 Milestones.

## Tech Stack
- Frontend: [React/Vue/Angular/Next.js]
- Backend: [Node.js/Python/Java/Go]
- Database: [PostgreSQL/MySQL/MongoDB]
- Authentication: [JWT/Session/OAuth]
- Payment: [Stripe/PayPal]
- Deployment: [Vercel/AWS/Heroku]

## 12 Functional Requirements (Grouped by 5 Milestones)

### Milestone 1: Authentication & User Management (Week 1-2)
**FR1: User Registration**
- Email/password registration
- Email verification
- Input validation
- Password hashing

**FR2: User Login/Logout**
- Email/password login
- Session/JWT management
- Remember me functionality
- Logout và clear session

**FR3: User Profile Management**
- View profile
- Edit profile (name, email, phone, address)
- Change password
- Upload avatar

### Milestone 2: Product Management (Week 3-4)
**FR4: Add Product (Admin)**
- Product form (name, description, price, category, images)
- Image upload (multiple images)
- Stock management
- Admin authorization required

**FR5: Edit/Delete Product (Admin)**
- Edit product details
- Soft delete products
- Restore deleted products
- Admin authorization required

**FR6: Search & Filter Products (Public)**
- Search by name/description
- Filter by category, price range
- Sort by price, date, popularity
- Pagination

### Milestone 3: Shopping Cart & Orders (Week 5-6)
**FR7: Shopping Cart**
- Add to cart (with quantity)
- Update quantity
- Remove from cart
- Cart persistence (logged in users)
- Guest cart (session-based)

**FR8: Checkout & Payment**
- Review cart
- Shipping information form
- Payment integration (Stripe/PayPal)
- Order confirmation

**FR9: Order History**
- View all orders
- Order details (items, status, tracking)
- Order status updates
- Cancel order (if not shipped)

### Milestone 4: Advanced Features (Week 7)
**FR10: Product Reviews & Ratings**
- Leave review (rating 1-5 + text)
- Edit/delete own review
- View all reviews for product
- Average rating display

**FR11: Wishlist**
- Add to wishlist
- Remove from wishlist
- View wishlist
- Move from wishlist to cart

### Milestone 5: Admin Dashboard (Week 8)
**FR12: Admin Dashboard**
- Sales statistics (daily/weekly/monthly)
- Top selling products
- User statistics
- Order management (view all, update status)
- Revenue charts

## Requirements

Hãy tạo một SPEC tổng thể (SPEC.md) cho toàn bộ dự án bao gồm:

1. **Objective**: Mục tiêu tổng thể, target users, success criteria
2. **Tech Stack**: Chi tiết các công nghệ sử dụng với versions
3. **Commands**: Build, test, dev, lint commands đầy đủ
4. **Project Structure**: Directory structure chi tiết
5. **Database Schema**: ERD và table definitions cho tất cả entities
   - Users
   - Products
   - Categories
   - Orders
   - OrderItems
   - Reviews
   - Wishlist
   - (và các bảng khác nếu cần)
6. **API Contracts**: REST API endpoints cho tất cả 12 FR
   - Method, path, request/response schemas
   - Authentication requirements
   - Authorization rules
7. **Code Style**: Code examples và conventions
8. **Testing Strategy**: Unit, integration, e2e testing approach
9. **Boundaries**: Always do / Ask first / Never do rules
10. **Success Criteria**: Measurable goals cho từng milestone

## Additional Context
- Target deployment: [Production timeline]
- Team size: [Number of developers]
- Expected traffic: [Users/day]
- Budget constraints: [Any limitations]

Hãy bắt đầu bằng việc liệt kê ASSUMPTIONS bạn đang có và xác nhận với tôi trước khi viết SPEC chi tiết.
```

### Template Plan Từng Milestone

```markdown
/plan

Dựa trên SPEC.md đã tạo, hãy tạo implementation plan chi tiết cho MILESTONE [N].

## Scope của Milestone này:
[List các FR cần implement]

## Requirements:

1. **Dependency Graph**: Vẽ dependency graph cho các components trong milestone này
2. **Vertical Slicing**: Chia nhỏ theo vertical slices (end-to-end features)
3. **Task Breakdown**: Mỗi task phải:
   - Có title ngắn gọn
   - Có description rõ ràng
   - Có acceptance criteria cụ thể (2-3 bullet points)
   - Có verification steps (test commands, manual checks)
   - List files sẽ touch (ước lượng)
   - Estimated scope: XS/S/M/L
   - Dependencies: Task nào cần hoàn thành trước
4. **Checkpoints**: Thêm checkpoint sau mỗi 2-3 tasks
5. **Risk Assessment**: Identify risks và mitigation strategies

## Constraints:
- Mỗi task không được touch quá 5 files
- Mỗi task phải có thể complete trong 1-2 hours
- Mỗi task phải để system ở working state
- Tasks phải theo dependency order

## Output Format:
Lưu plan vào: tasks/milestone-[N]-plan.md

Bao gồm:
- Overview
- Architecture Decisions (nếu có)
- Dependency Graph
- Task List (grouped by phases)
- Checkpoints
- Risks and Mitigations
- Open Questions
```

---

## Best Practices

### ✅ DO:

1. **Surface Assumptions Immediately**
   ```markdown
   ASSUMPTIONS TÔI ĐANG CÓ:
   1. Database: PostgreSQL (dựa trên tech stack)
   2. Authentication: JWT-based (not session cookies)
   3. File upload: AWS S3 (not local storage)
   4. Payment: Stripe (not PayPal)
   → Xác nhận ngay nếu sai!
   ```

2. **Review Sau Mỗi Milestone**
   - Checkpoint đầy đủ
   - Review code quality
   - Update SPEC nếu có thay đổi
   - Document lessons learned

3. **Commit Frequently**
   - Mỗi task hoàn thành → 1 commit
   - Mỗi slice nhỏ → có thể 1 commit
   - Write clear commit messages

4. **Keep Spec Alive**
   - Update SPEC khi requirements thay đổi
   - Document architectural decisions
   - Link PR về task tương ứng

5. **Use Feature Flags**
   ```typescript
   const ENABLE_WISHLIST = process.env.FEATURE_WISHLIST === 'true';
   ```
   Cho phép merge code chưa hoàn thiện mà không ảnh hưởng production

### ❌ DON'T:

1. **Không skip spec vì "quá đơn giản"**
   - Ngay cả task đơn giản cần acceptance criteria

2. **Không implement tất cả cùng lúc**
   - Luôn chia nhỏ thành slices
   - Test từng slice

3. **Không mix concerns trong 1 task**
   - Refactor và feature phải tách riêng
   - Database migration và business logic phải tách riêng

4. **Không "clean up" code không liên quan**
   - Touch only what the task requires
   - Note issues để create separate tasks

5. **Không skip verification steps**
   - Sau mỗi slice: test, build, verify
   - Không run test nhiều lần không cần thiết

---

## Troubleshooting

### Vấn đề: SPEC quá dài, agent bị overload context

**Giải pháp:**
- Chia SPEC thành nhiều files:
  ```
  specs/
  ├── SPEC-OVERVIEW.md          # High-level overview
  ├── SPEC-DATABASE.md          # Database schema only
  ├── SPEC-API-CONTRACTS.md     # API endpoints only
  └── SPEC-TESTING.md           # Testing strategy only
  ```
- Agent chỉ load file cần thiết cho từng task

### Vấn đề: Tasks quá lớn, không biết bắt đầu từ đâu

**Giải pháp:**
- Re-run `/plan` với explicit request:
  ```markdown
  Task 5 quá lớn. Hãy break down Task 5 thành các subtasks nhỏ hơn,
  mỗi subtask chỉ touch 2-3 files.
  ```

### Vấn đề: Agent implement sai spec

**Giải pháp:**
- Reference spec explicitly trong prompt:
  ```markdown
  Implement Task 3 theo đúng SPEC.md section "API Contracts > FR4".
  Đảm bảo:
  - Request schema match spec
  - Response schema match spec
  - Error handling như trong spec
  ```

### Vấn đề: Conflict giữa các milestones

**Giải pháp:**
- Nếu dùng Cách 1: Review lại SPEC tổng thể trước khi start
- Nếu dùng Cách 2: Khi tạo SPEC-M2, paste relevant parts từ SPEC-M1 vào context

---

## Checklist Tổng Hợp

### Trước Khi Bắt Đầu Dự Án:
- [ ] Đã quyết định dùng Cách 1 hay Cách 2
- [ ] PRD được phân tích rõ ràng (12 FR + 5 Milestones)
- [ ] Tech stack đã xác định
- [ ] Timeline và resources đã estimate

### Trước Mỗi Milestone:
- [ ] SPEC đã được tạo (hoặc relevant section trong SPEC tổng thể)
- [ ] PLAN đã được tạo với task breakdown chi tiết
- [ ] Dependency graph rõ ràng
- [ ] Checkpoints đã được define
- [ ] Team đã review và approve

### Trong Quá Trình Implement:
- [ ] Follow incremental-implementation (slice nhỏ, test, verify, commit)
- [ ] Chạy tests sau mỗi slice
- [ ] Verify sau mỗi 2-3 tasks
- [ ] Update documentation khi cần
- [ ] Touch only files cần thiết cho task

### Sau Mỗi Milestone:
- [ ] All tests pass
- [ ] Build succeeds
- [ ] Manual testing đầy đủ
- [ ] Code review passed
- [ ] Documentation updated
- [ ] Ready to deploy
- [ ] Retrospective và lessons learned

---

## Kết Luận

### Khuyến Nghị Theo Quy Mô:

**Small Team (1-2 devs) + Short Timeline (4-6 weeks):**
→ Dùng **Cách 2** (Spec + Plan từng Milestone)
- Ship nhanh
- Linh hoạt
- Ít overhead

**Medium-Large Team (3+ devs) + Longer Timeline (8+ weeks):**
→ Dùng **Cách 1** (Spec Toàn Bộ → Plan Từng Milestone)
- Consistency tốt hơn
- Tránh conflict architecture
- Dễ coordinate nhiều người

**Very Simple Project (< 4 weeks):**
→ Dùng **Cách 3** (Spec Toàn Bộ → Plan Toàn Bộ)
- Minimal overhead
- Straightforward

### Các Lệnh Quan Trọng:

```bash
# Tạo spec
/spec [your requirements]

# Tạo plan
/plan [based on spec]

# Build dự án
/build

# Review code
/review

# Ship milestone
/ship
```

### Tài Liệu Tham Khảo:

- `skills/spec-driven-development/SKILL.md` - Quy trình spec
- `skills/planning-and-task-breakdown/SKILL.md` - Quy trình planning
- `skills/incremental-implementation/SKILL.md` - Quy trình implementation
- `skills/test-driven-development/SKILL.md` - Testing approach

---

**Chúc bạn thành công với dự án! 🚀**
