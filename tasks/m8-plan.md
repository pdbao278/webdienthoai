# Implementation Plan: M8 - Tương tác & Nâng cao (Engagement)

## Overview
Milestone 8 tăng cường tương tác khách hàng thông qua hệ thống đánh giá sản phẩm bảo mật và Trợ lý ảo tư vấn tự động Gemini.

## Dependency Graph
`Review Schema` -> `Review API (Validation against Orders)` -> `Review Component UI` -> `Chatbot Component UI` -> `Gemini API Integration`

## Task List

### Phase 1: Reviews System
- **Task 1: Review Schema & API**
  - Kiểm tra điều kiện: User phải có đơn hàng "Hoàn thành" mới được post review.
  - API Admin kiểm duyệt đánh giá.
- **Task 2: Customer Review UI**
  - Form viết đánh giá trên chi tiết SP, tính số sao trung bình.

### Phase 2: Gemini Chatbot Assistant
- **Task 3: Chatbot Widget UI**
  - Nút floating chat, popup chat Soft & Clean.
- **Task 4: Gemini API Integration**
  - Tích hợp Google Gemini trả lời FAQs theo rule-based context. Nhận diện intent gợi ý sản phẩm.

## Checkpoints
- [x] Bị chặn review nếu chưa từng mua hàng.
- [x] Admin có thể ẩn/xóa đánh giá rác.
- [x] Chatbot trả lời được câu hỏi giờ mở cửa và gợi ý đúng link.
