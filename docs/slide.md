---
marp: true
theme: default
class: invert
paginate: true
math: mathjax
style: |
  section {
    background-color: #0b0f19;
    color: #e2e8f0;
    font-family: 'Outfit', 'Inter', sans-serif;
    padding: 50px;
  }
  h1 {
    color: #38bdf8;
    font-size: 1.85em;
    border-bottom: 2px solid #1e293b;
    padding-bottom: 10px;
  }
  h2 {
    color: #0ea5e9;
    font-size: 1.4em;
  }
  h3 {
    color: #94a3b8;
    font-size: 1.1em;
  }
  strong {
    color: #38bdf8;
  }
  .highlight {
    color: #f43f5e;
    font-weight: bold;
  }
  .code-text {
    color: #34d399;
    font-weight: bold;
  }
  code {
    background-color: #1e293b;
    color: #38bdf8;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.75em;
    margin-top: 15px;
  }
  th {
    background-color: #1e293b;
    color: #38bdf8;
    border: 1px solid #334155;
    padding: 10px;
    text-align: left;
  }
  td {
    border: 1px solid #334155;
    padding: 10px;
  }
  footer {
    font-size: 0.55em;
    color: #64748b;
  }
---

# Agent-skills KIT & PhoneStore Demo
### Cẩm Nang Quy Trình & Thực Chiến Phát Triển Sản Phẩm
**Nguồn chuẩn trình bày:** repo `addyosmani/agent-skills` + `PRD.md` cho case PhoneStore

---

# 1. Tổng Quan Về repo `agent-skills`
*   **Vấn đề:** AI Agents thường "đốt cháy giai đoạn", bỏ qua test/docs, vi phạm bảo mật và vượt quá phạm vi yêu cầu do xu hướng chọn đường ngắn nhất.
*   **Giải pháp:** Repo `agent-skills` cung cấp hệ thống quy trình (workflows) "chuẩn kỹ sư phần mềm" ép AI tuân thủ qua các Quality Gates nghiêm ngặt.
*   **Mục tiêu:** Đảm bảo code chất lượng Senior, an toàn phát hành và tối ưu hóa tài nguyên.

---

# 2. Triết Lý Thiết Kế Cốt Lõi
1.  **Process, not prose:** Kỹ năng là quy trình bắt buộc, có điểm kiểm tra cụ thể, không phải tài liệu tham khảo chung chung.
2.  **Anti-rationalization:** Cung cấp sẵn các luận điểm phản bác lại các ngụy biến phổ biến của AI (VD: *"Tôi sẽ viết test sau"*).
3.  **Verification is non-negotiable:** Yêu cầu bằng chứng xác minh thực tế (test passing, build output), không chấp nhận giả định *"có vẻ đúng"*.
4.  **Progressive disclosure:** Chỉ tải skill khi thực sự cần thiết (repo: *"Check for an applicable skill before starting work"*), tránh tải tất cả lên cùng lúc.

---

# 3. Sáu Hành Vi Bắt Buộc (Core Behaviors)
Trong mọi tác vụ, Agent phải tuân thủ nghiêm ngặt 6 nguyên tắc:
1.  **Surface Assumptions:** Nêu rõ các giả định kỹ thuật, không âm thầm tự quyết định.
2.  **Manage Confusion Actively:** Dừng lại ngay khi gặp mâu thuẫn, không đoán mò.
3.  **Push Back When Warranted:** Phản đối và hướng dẫn user nếu cách tiếp cận sai lệch.
4.  **Enforce Simplicity:** Ưu tiên giải pháp đơn giản nhất, tránh over-engineering.
5.  **Maintain Scope Discipline:** Chỉ làm đúng scope yêu cầu, không lan man.
6.  **Verify, Don't Assume:** Mọi task chưa xong cho đến khi có bằng chứng chạy được.

---

# 4. Kiến Trúc 3 Tầng Có Thể Kết Hợp (Composable Layers)
Hệ thống được tổ chức thành 3 lớp có thể kết hợp theo repo gốc:
*   **Commands (The When):** 8 slash commands điều phối quy trình (`/spec`, `/plan`, `/build`, `/test`, `/review`, `/code-simplify`, `/ship`, `/webperf`).
*   **Personas (The Who):** 4 specialist agents với vai trò chuyên biệt:
    *   `code-reviewer`: Staff Engineer (Đánh giá chất lượng 5 trục).
    *   `security-auditor`: Security Engineer (Rà quét lỗ hổng OWASP).
    *   `test-engineer`: QA Specialist (Chiến lược kiểm thử toàn diện).
    *   `web-performance-auditor`: Web Performance Engineer (Audit Core Web Vitals).
*   **Skills (The How):** Hệ thống **23 lifecycle skills + 1 meta-skill = 24 skills** tổng cộng.

---

# 5. Bản Đồ Lệnh & Slash Commands
Quy trình phát hành tiêu chuẩn qua 8 lệnh cốt lõi:
*   **Nguyên tắc:** User chỉ gõ 8 slash commands; skill/persona là cơ chế nội bộ phía sau command.
*   **`/spec`:** Làm rõ yêu cầu kỹ thuật và sinh `SPEC.md`. **User duyệt**.
*   **`/plan`:** Cắt nhỏ milestone thành vertical slices và sinh `tasks/todo.md`. **User duyệt**.
*   **`/build`:** Có 2 modes - (1) Default: lấy **1 slice nhỏ** tiếp theo, hoặc (2) `/build auto`: build toàn bộ plan sau một lần approve. TDD: RED $\rightarrow$ GREEN $\rightarrow$ refactor giữ xanh $\rightarrow$ full test suite $\rightarrow$ build $\rightarrow$ commit.
*   **`/test`:** TDD cho tính năng mới hoặc Prove-It cho bug fix.
*   **`/review`:** Rà soát 5 trục chất lượng, giải quyết Critical/Important.
*   **`/webperf`:** Audit hiệu năng web với Core Web Vitals, có Quick/Deep modes.
*   **`/code-simplify`:** Tối giản hóa code, giữ nguyên hành vi; nếu test fail thì revert và xem xét lại.
*   **`/ship`:** Fan-out 3 personas chính song song $\rightarrow$ Quyết định GO/NO-GO + Rollback Plan.

---

# 6. Meta-skill `using-agent-skills`
*   **Vai trò:** Bộ điều phối thông minh giúp agent chọn đúng skill kỹ thuật dựa trên intent và định nghĩa các quy tắc vận hành chung.
*   **Cây quyết định chọn skill tiêu biểu:**
    *   *Chưa biết muốn gì* $\rightarrow$ `interview-me`
    *   *Ý tưởng mơ hồ* $\rightarrow$ `idea-refine`
    *   *Feature/change mới* $\rightarrow$ `spec-driven-development`
    *   *Có spec, cần chia việc* $\rightarrow$ `planning-and-task-breakdown`
    *   *Đang code* $\rightarrow$ `incremental-implementation`
    *   *Viết/chạy test* $\rightarrow$ `test-driven-development`
    *   *Lỗi/breakage* $\rightarrow$ `debugging-and-error-recovery`
    *   *Thiết kế API* $\rightarrow$ `api-and-interface-design`
    *   *UI work* $\rightarrow$ `frontend-ui-engineering`
    *   *Cần tài liệu chính thức* $\rightarrow$ `source-driven-development`
    *   *Quyết định rủi ro cao* $\rightarrow$ `doubt-driven-development`

---

# 7. Phân Nhóm 24 Skills Theo Vòng Đời
Hệ thống gồm **23 lifecycle skills + 1 meta-skill = 24 skills tổng cộng**:

| Nhóm | Số lượng | Ví dụ Kỹ năng tiêu biểu |
|---|---|---|
| **Meta** | 1 skill | `using-agent-skills` (chọn đúng skill cho từng tình huống) |
| **Define** | 3 skills | `interview-me`, `idea-refine`, `spec-driven-development` |
| **Plan** | 1 skill | `planning-and-task-breakdown` |
| **Build** | 6 skills | `incremental-implementation`, `test-driven-development`, `frontend-ui-engineering`, `api-and-interface-design`, `source-driven-development`, `doubt-driven-development` |
| **Verify** | 2 skills | `browser-testing-with-devtools`, `debugging-and-error-recovery` |
| **Review** | 4 skills | `code-review-and-quality`, `code-simplification`, `security-and-hardening`, `performance-optimization` |
| **Ship** | 7 skills | `shipping-and-launch`, `git-workflow-and-versioning`, `ci-cd-and-automation`, `deprecation-and-migration`, `documentation-and-adrs`, `observability-and-instrumentation`, `context-engineering` |

---

# 8. Case Study: Dự Án PhoneStore & Milestone M3
*   **Dự án:** PhoneStore - Hệ thống thương mại điện tử bán điện thoại theo mô hình Click & Collect.
*   **Mục tiêu Demo:** Áp dụng `agent-skills` trên repo thực tế thông qua **Milestone M3 (Admin & Vận hành)**.
*   *Lưu ý:* PhoneStore là **dự án demo riêng** để minh họa cách sử dụng agent-skills trong thực tế, **không phải ví dụ từ repo agent-skills gốc**.
*   **Tập trung thực chiến:**
*   `/spec` đọc toàn bộ `PRD.md` một lần để tạo `SPEC.md` kỹ thuật thống nhất.
*   Đi tuần tự qua các Quality Gates của từng slash command.
*   Lấy <span class="highlight">Task 3 (UI Quản lý Đơn hàng & QR Simulator)</span> làm vertical slice trọng tâm để minh họa.

---

# 9. `/spec` — Thiết Lập Kỹ Thuật Toàn Diện
*   <span class="highlight">Quy tắc vàng:</span> **Spec MỘT lần cho toàn bộ sản phẩm**, không spec rời rạc từng FR.
*   **Lý do:** Các quyết định cốt lõi (DB Schema, Auth/JWT, Cloudinary Integration, Code style, boundaries) ảnh hưởng xuyên suốt mọi FR. Nếu làm riêng lẻ sẽ gây phân mảnh và mâu thuẫn dữ liệu.
*   **Cách chạy:** Gõ `/spec` trỏ vào `PRD.md` để sinh ra `SPEC.md` kỹ thuật gồm 6 vùng:
    1. **Objective** (lấy từ mục 1-4 PRD)
    2. **Commands** (`npm run dev`/`build`/`test`/`lint`)
    3. **Project Structure** (frontend + backend + Prisma schema)
    4. **Code Style** (TypeScript, Zod, naming conventions)
    5. **Testing Strategy** (Test pyramid 80/15/5, coverage)
    6. **Boundaries** (Always / Ask first / Never)

---

# 10. `/spec` — Boundaries & Thiết Kế Schema
Các điểm kỹ thuật bắt buộc phải chốt trong `SPEC.md` đối với PhoneStore:
*   **Always (Bắt buộc):**
    *   *Trang chủ (FR-05):* Product Card luôn hiển thị giá biến thể rẻ nhất làm "Giá từ...".
    *   *Cloudinary Cleanup:* Xóa file vật lý trên Cloud khi xóa/ẩn ảnh sản phẩm (tránh rò rỉ storage).
    *   *Soft delete sản phẩm:* Dùng `is_active` thay vì xóa vật lý để bảo toàn lịch sử đơn hàng.
*   **Open Questions:** Các quyết định mở trong PRD (Resolved Questions mục 14) phải được đưa vào SPEC và giải quyết triệt để trước milestone tương ứng (Ví dụ: mô hình Click & Collect, giỏ hàng yêu cầu đăng nhập đã được chốt bởi PO).
*   **Gate:** `/spec` phải lưu `SPEC.md` và user xác nhận trước khi sang `/plan`; với PhoneStore, gate này khớp yêu cầu PM + Tech Lead duyệt.

---

# 11. `/plan` — Phân Rã Spec Thành Các Tasks
*   Chạy `/plan` **một lần cho mỗi spec**, phân chia spec thành các **Task** nhỏ (vertical slices) có thể implement riêng lẻ.
*   Mỗi **Task** cần có:
    *   Acceptance criteria rõ ràng
    *   Dependencies với các task khác (nếu có)
    *   Ước lượng độ phức tạp
*   **Ví dụ thực tế cấu trúc phân rã của Milestone M3 (Admin & Vận hành) - áp dụng cho PhoneStore:**
    *   **Phase 1: Admin Foundation & Order Operations**
        *   *Task 1:* Cấu hình Layout & Bảo mật Admin Route.
        *   *Task 2:* API Quản lý Đơn hàng (Admin/Manager).
        *   *Task 3:* UI Quản lý Đơn hàng & QR Simulator.
    *   **Phase 2: Product Management (Admin Only)**
        *   *Task 4:* API Quản lý Sản phẩm & Cloudinary.
        *   *Task 5:* UI Quản lý Sản phẩm.
    *   **Phase 3: Vouchers & Statistics (Admin Only)**
        *   *Task 6:* API & UI Quản lý Voucher.
        *   *Task 7:* Báo cáo Thống kê Doanh thu.
*   *Lưu ý:* Khái niệm "Phase" và "Checkpoint" là cách tổ chức tùy chỉnh cho dự án PhoneStore, không phải cấu trúc bắt buộc của repo agent-skills.

---

# 12. `/build` — Triển Khai Từng Task Hoặc Tự Động
*   **2 Modes:**
    *   **Default (`/build`):** Triển khai **từng task một** (task-by-task) trong danh sách `tasks/todo.md`.
    *   **Autonomous (`/build auto`):** Sau một lần approve duy nhất, build toàn bộ plan tự động. Không nhanh hơn per-task, chỉ loại bỏ bước thủ công giữa các task.
*   **Quy trình build một task theo chuẩn TDD (giống nhau ở cả 2 modes):**
    1.  **RED:** Viết một ca kiểm thử mô tả hành vi của task (phải **FAIL** vì code chưa có).
    2.  **GREEN:** Viết mã nguồn logic tối giản nhất để bài test vượt qua (chuyển sang **PASS**).
    3.  **REFACTOR:** Tối ưu hóa, dọn dẹp code sạch sẽ mà test vẫn xanh.
    4.  **FULL SUITE + BUILD:** Chạy toàn bộ test suite và build để đảm bảo không regression.
    5.  **COMMIT:** Đóng gói và commit git nguyên tử cho riêng task đó trước khi sang task mới.
*   **`/build auto` dừng lại khi:** Test/build fail không fix được, spec mơ hồ, hoặc thay đổi rủi ro cao (auth, payment, data migration, secrets).

---

# 13. M3 Thực Chiến — Dùng Lệnh Ở Đâu?
Vì PRD đã có mô tả cho Milestone 3, prompt chỉ cần trỏ đúng phạm vi.

| Bước | Lệnh | Khi nào dùng |
|---|---|---|
| Lập kế hoạch cho M3 | `/plan` | Đầu milestone M3 |
| Làm từng task (VD: Task 3) | `/build` | Khi task đã nằm trong `tasks/m3-todo.md` |
| Fix bug/regression Task 3 | `/test` | Khi có lỗi cụ thể đã tái hiện được |
| Review sau khi pass | `/review` | Trước khi mark done / merge task |
| Đánh giá xuất bản | `/ship` | Cuối milestone M3, chuẩn bị deploy |

---

# 14. `/plan` Cho M3 — Prompt Ngắn
Mục tiêu của `/plan`: biến yêu cầu trong PRD thành các task có thể build từng cái.

```text
/plan
Lập plan M3 Admin & Vận hành theo PRD.md.
Output tasks/m3-plan.md và tasks/m3-todo.md.
```

Kết quả mong muốn trong `tasks/m3-todo.md`:

```text
## Phase 1: Admin Foundation & Order Operations
- [ ] Task 1: Cấu hình Layout & Bảo mật Admin Route
- [ ] Task 2: API Quản lý Đơn hàng (Admin/Manager)
- [ ] Task 3: UI Quản lý Đơn hàng & QR Simulator
```

---

# 15. `/build` Cho Task 3 — Prompt Ngắn
Mục tiêu: lấy **1 slice nhỏ** (không phải cả Phase) trong `tasks/m3-todo.md`, viết test đỏ trước, code cho xanh, build pass.

```text
/build
Làm Task 3 trong tasks/m3-todo.md.
Đọc PRD.md và m3-plan.md nếu có.
Viết failing test trước, implement tối thiểu,
chạy targeted test + full suite + build.
```

Không cần copy lại acceptance criteria dài: agent đọc từ `tasks/m3-todo.md`, `m3-plan.md`, và `PRD.md`.

Sau khi pass:

```text
/review
Review Task 3 theo m3-plan.md.
Tập trung giả lập QR, gọi API chính xác và cập nhật UI.
```

---

# 16. Task 3 Fail Thì Dùng Lệnh Gì?
Chỉ cần nhớ 3 tình huống:

| Tình huống | Lệnh |
|---|---|
| Đang chạy `/build` Task 3 mà test/build fail | Ở nguyên `/build`, không gõ lệnh mới |
| Sau này phát hiện bug cụ thể của Task 3 | `/test` |
| Review phát hiện thiếu hẳn slice mới | Thêm task vào `tasks/m3-todo.md` rồi `/build` |

Prompt bug ngắn:

```text
/test
Bug Task 3: nhập mã QR hợp lệ nhưng đơn hàng không đổi trạng thái.
Dùng Prove-It: test fail trước, fix root cause,
rồi chạy targeted test + full suite + build.
```

Prompt thiếu slice:

```text
/build
Làm Task 4 trong tasks/m3-todo.md.
Đọc m3-plan.md và SPEC.md nếu có.
```

---

# 17. Quality Gates — Review & Ship Theo Checkpoint
Phân biệt rõ 2 mức độ quality gate:

## `/review` — Tại Checkpoint Giữa Các Phases
*   **Tần suất:** Sau nhóm 2-3 tasks (~3-5 lần/milestone).
*   **Scope:** Phase vừa hoàn thành (VD: Tasks 1-3 Foundation).
*   **Đánh giá:** 5 trục chất lượng (Correctness, Readability, Architecture, Security, Performance).
*   **Output:** Findings (Critical/Important/Suggestion).
*   **Gate:** *Không tiếp phase tiếp theo nếu có Critical chưa fix!*
*   **Ví dụ:** Phase 1 (Tasks 1-3) xong $\rightarrow$ `/review` $\rightarrow$ Phase 2.

## `/ship` — Sau Toàn Bộ Milestone
*   **Tần suất:** Trước deployment (~2-3 lần/dự án).
*   **Scope:** Toàn bộ milestone (VD: M3 hoàn thành).
*   **Fan-out:** 3 personas song song (`code-reviewer`, `security-auditor`, `test-engineer`).
*   **Output:** GO/NO-GO decision + Rollback Plan bắt buộc.
*   **Gate:** *Không deploy nếu có Critical chưa fix!*

---

# 18. TEST SAI THÌ DÙNG LỆNH GÌ TIẾP?
Theo repo `agent-skills`, **không có `/debug`**. Chọn lệnh theo nơi phát hiện lỗi:

| Phát hiện lỗi ở đâu | Lệnh tiếp theo |
|---|---|
| Đang chạy `/build` và test/build fail | Ở nguyên `/build`; agent tự debug root cause |
| Bug cụ thể sau khi đã build xong | `/test` theo Prove-It |
| Checkpoint `/test` phát hiện thiếu feature/slice | Thêm task vào `tasks/todo.md`, rồi `/build` |
| `/review` fail vì bug/regression | `/test`, rồi `/review` lại |
| `/review` fail vì thiếu slice mới | `/build`, rồi `/review` lại |
| `/ship` NO-GO vì bug/security | `/test`, rồi `/review` + `/ship` lại |

---

# 19. Sửa Bug Chủ Động Qua Prove-It Pattern
Khi phát hiện bug nghiệp vụ (Ví dụ: "Quét mã QR hợp lệ nhưng đơn không đổi trạng thái"):
*   **Cách gọi lệnh:**
    ```text
    /test
    Bug Task 3: mã QR hợp lệ nhưng không cập nhật status đơn hàng.
    Viết test tái hiện bug (phải FAIL), rồi fix root cause, rồi chạy lại full suite.
    ```
*   **Các bước thực hiện Prove-It:**
    1. Viết 1 test mô tả chính xác hành vi bị lỗi $\rightarrow$ Chạy và chứng minh test **FAIL**.
    2. Sửa mã nguồn ở tầng service/controller để gọi đúng API update status.
    3. Chạy lại test $\rightarrow$ Chứng minh test **PASS (Màu xanh)**.
    4. Chạy full suite để đảm bảo an toàn hệ thống.
*   **Quy tắc:** *Không có test tái hiện bug = bug chưa được sửa.*

---

# 20. `/review` — Kiểm Duyệt 5 Trục Chất Lượng
Chạy `/review` cho mỗi slice/PR ($\sim 100$ dòng code) và một lượt checkpoint milestone.
*   **Đánh giá toàn diện trên 5 trục:**
    1.  **Correctness:** Đúng logic nghiệp vụ, xử lý hết các edge cases.
    2.  **Readability:** Đặt tên rõ nghĩa, code tường minh; comment chỉ khi giải thích ý đồ (repo: *"don't comment obvious code"*).
    3.  **Architecture:** Đúng ranh giới (boundaries), không vi phạm layer separation.
    4.  **Security:** *Rất quan trọng với PhoneStore:* check phân quyền RBAC (NFR-03), parameterized query chống SQL injection, sanitize XSS (edge case `<script>` form input), Zod validate toàn bộ input.
    5.  **Performance:** Tối ưu số lượng query (tránh N+1), page load $\le 2$s.

---

# 21. REVIEW KHÔNG ĐẠT THÌ LÀM GÌ?
Khi có ý kiến phản hồi chưa đạt từ quality gate `/review`:
*   **Phân loại Findings theo chuẩn skill `code-review-and-quality`:**
    *   **Critical:** Lỗi bảo mật, mất dữ liệu, vỡ logic $\rightarrow$ Bắt buộc fix ngay, chặn mọi luồng đi tiếp (NO-GO).
    *   **Important:** Vi phạm architecture, lỗi logic phụ $\rightarrow$ Cần khắc phục trước khi merge (hoặc defer có lý do rõ).
    *   **Suggestion:** Đề xuất cải thiện code (readability, refactor) $\rightarrow$ Không chặn cứng, có thể làm hoặc bỏ qua.
*   **Vòng lặp sửa đổi:**
    $$\text{Sửa code/test} \rightarrow \text{targeted test} \rightarrow \text{full suite + build} \rightarrow \text{/review lại} \rightarrow \text{Approve}$$
*   <span class="highlight">Không chấp nhận "để sau dọn"</span> với Critical/Important. Fix trước merge, hoặc defer công khai có owner và lý do rõ.
*   *Lưu ý:* Chấp nhận approve khi thay đổi giúp nâng cao sức khỏe tổng thể của codebase, không cần cầu toàn hoàn hảo. Dùng `/code-simplify` trước merge nếu code vừa đổi khó đọc nhưng hành vi phải giữ nguyên.

---

# 22. REVIEW FAIL — Fix Bằng `/test` Hay `/build`?
**Chỉ cần chọn 1 trong 2 lệnh để sửa lỗi:**

| Finding | Lệnh đúng | Ví dụ |
|---|---|---|
| Bug/regression cụ thể | `/test` | Prove-It: test fail trước, fix, pass |
| Thiếu behavior/slice mới | `/build` | Thêm task vào `tasks/todo.md`, có acceptance riêng |
| Đang fail trong phiên `/build` | Ở nguyên `/build` | Không gõ command mới, fix root cause trong context hiện tại |
| Suggestion/Nit/FYI | Có thể defer | Không chặn merge |

Ví dụ prompt:
```text
/test
Review finding Task 3: thiếu bước trừ tồn kho khi đơn hàng chuyển sang HOAN_THANH.
Đọc m3-plan.md và SPEC.md nếu có.
Prove-It rồi chạy full suite + build.
```

---

# 23. `/ship` — Release Gate Theo Milestone
`/ship` là **pre-launch gate**, chỉ chạy ở cuối Milestone trước khi deploy, KHÔNG chạy sau mỗi task lẻ.

*   **Bắt buộc dùng:** Cuối Milestone (M1, M3...), trước khi bật Feature Flag, hoặc khi có thay đổi rủi ro cao (Auth, Payment, DB) dù diff rất nhỏ.
*   **Được phép SKIP (Chỉ dùng `/review`):** Sửa lỗi vặt UI, sửa text ($\le 2$ file, $\le 50$ dòng, KHÔNG đụng Auth/DB/Config).
*   **Cơ chế Fan-out:** Chạy song song 3 agent personas (`code-reviewer`, `security-auditor`, `test-engineer`) để tổng hợp quyết định **GO/NO-GO** kèm **Rollback Plan**. Nếu có bất kỳ Critical nào $\rightarrow$ Chặn deploy.

---

# 24. SHIP NO-GO — Sửa Bằng Lệnh Nào?
`/ship` trả NO-GO là **gate tổng hợp**. Với lỗi code/behavior, chỉ chọn `/test` hoặc `/build`:

| Blocker | Lệnh xử lý |
|---|---|
| Thiếu test / bug cụ thể | `/test` theo Prove-It |
| Thiếu behavior đủ lớn | thêm task rồi `/build` |
| Lỗ hổng auth/data access cụ thể | `/test` nếu là bug/regression; `/build` nếu là slice mới |
| Thiếu rollback/env/docs | Không phải bug code: sửa blocker rồi chạy `/ship` lại |


---

# 25. `/webperf` — Kiểm Tra Hiệu Năng Web
Lệnh chuyên biệt để audit hiệu năng ứng dụng web frontend, sử dụng persona `web-performance-auditor`.

*   **Phạm vi áp dụng:** Chỉ dùng cho UI/Frontend (VD: Next.js app của PhoneStore), KHÔNG dùng cho backend API, config hay script.
*   **Có 2 chế độ quét (Modes):**
    1.  **Deep Mode:** Cung cấp file báo cáo thực tế (Lighthouse JSON, PageSpeed Insights, DevTools trace) hoặc live URL. Agent sẽ phân tích metrics thực tế một cách chuẩn xác nhất.
    2.  **Quick Mode:** Nếu không có dữ liệu thực, Agent sẽ quét mã nguồn (source code) để tìm các cấu trúc anti-patterns gây suy giảm hiệu năng.
*   **Đầu ra:** Trả về Bảng điểm (Scorecard) + Các lỗi hiệu năng được xếp hạng + Khuyến nghị tối ưu. Agent bị cấm "phịa" ra các chỉ số (nếu chưa đo sẽ báo `not measured`).

---

# 26. Playbook Từ PRD Đến Release
Quy trình thực thi chuẩn mực từ tài liệu yêu cầu sản phẩm đến khi phát hành:

1.  **spec:** Chạy `/spec` **một lần** cho toàn bộ `PRD.md` $\rightarrow$ sinh `SPEC.md`.
2.  **plan:** Chạy `/plan` **một lần** cho mỗi milestone $\rightarrow$ sinh `tasks/plan.md`.
3.  **build + review (lặp nhiều lần):**
    *   **Task-by-task:** `/build` task $\rightarrow$ `/review` $\rightarrow$ commit $\rightarrow$ task tiếp theo.
    *   **Hoặc auto:** `/build auto` $\rightarrow$ tự động build + review + commit tất cả tasks.
4.  **test:** Nếu bug/regression $\rightarrow$ `/test` (Prove-It) $\rightarrow$ `/review` lại.
5.  **simplify:** (Nếu cần) `/code-simplify` dọn dẹp code giữ nguyên hành vi.
6.  **webperf:** (Nếu cần) `/webperf` audit Core Web Vitals.
7.  **ship:** Chạy `/ship` **SAU KHI milestone hoàn thành**, trước deploy staging/prod:
    *   Fan-out 3 personas $\rightarrow$ GO/NO-GO + Rollback Plan.
    *   **Critical finding $\rightarrow$ NO-GO:** Quay về bước 4 (test/review).

## Chu Kỳ Milestone Điển Hình
```
/spec (1 lần)
  ↓
/plan (1 lần per milestone)
  ↓
[/build → /review] × N tasks  ← Lặp nhiều lần
  ↓
/ship (1 lần per milestone)  ← Trước deploy
  ↓
Deploy staging/production
```

---

# 27. Quy Tắc Vàng: LỖI $\rightarrow$ `/test` | THIẾU $\rightarrow$ `/build`

*   <span class="highlight">Công thức ghi nhớ nhanh:</span> **Có LỖI/BUG $\rightarrow$ dùng `/test` | THIẾU chức năng $\rightarrow$ dùng `/build`**.

```text
1. Phát hiện BUG / lỗi hồi quy (regression) của tính năng đã làm:
   → Dùng `/test`
   → Theo Prove-It: Viết test FAIL → Sửa code → Test PASS → Full suite → Build.

2. THIẾU tính năng hoặc thiếu một vertical slice mới:
   → Thêm task có acceptance criteria rõ ràng vào tasks/todo.md.
   → Dùng `/build` để triển khai.

3. Đang chạy `/build` mà bị lỗi giữa chừng:
   → Ở nguyên phiên `/build`, tuyệt đối không gõ lệnh mới. Sửa lỗi tại chỗ.

4. Lỗi tài liệu, cấu hình (docs/env/rollback):
   → Sửa trực tiếp không cần /test hay /build, rồi chạy lại Gate tương ứng.
```

---

# 28. Cảm Ơn & Thảo Luận
*   **Ưu điểm:** Đạt chất lượng Senior đồng đều, bảo mật cao nhờ isolation check, an toàn nhờ rollback plan.
*   **Nhược điểm:** Tốn token hơn do chia nhỏ slice, chạy nhiều bước verify, và fan-out sub-agents; quy trình chặt chẽ có thể tạo cảm giác cứng nhắc cho thay đổi nhỏ.
*   **Kết luận:** Sự chặt chẽ là cái giá xứng đáng để có một hệ thống chạy bền bỉ, không lỗi và sẵn sàng scale.

---

