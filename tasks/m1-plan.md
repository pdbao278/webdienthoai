# Implementation Plan: M1 - Xác thực & Phân quyền (Auth & RBAC)

## Overview
Milestone 1 tập trung vào nền móng bảo mật của ứng dụng, cho phép người dùng đăng ký, đăng nhập và xác thực qua mã OTP. Hệ thống phân quyền (RBAC) cho phép Admin quản lý các roles như Customer, Manager và Admin.

## Dependency Graph
`Database Schema (User, Role)` -> `Authentication API (JWT, bcrypt, OTP)` -> `Frontend Auth Forms (Login/Register, Zod validation)` -> `Admin User Management UI`

## Task List

### Phase 1: Authentication API & Schema
- **Task 1: Setup User & OTP Schema**
  - Cấu hình Prisma schema với các trường User (email, password, role) và OTP (code, expires_at).
- **Task 2: Implement Auth Controllers**
  - API Register, Login, gửi OTP, và Verify OTP. Giới hạn thời gian sống của OTP là 60s.

### Phase 2: Frontend Authentication Flow
- **Task 3: Login & Register UI**
  - Form UI với thiết kế Soft & Clean. Validate bằng Zod.
- **Task 4: OTP Verification UI**
  - Component đếm ngược 60s, cho phép gửi lại mã khi hết hạn. Lưu JWT vào cookies.

### Phase 3: Admin User Management & RBAC
- **Task 5: RBAC Middleware**
  - Middleware bảo vệ API và Frontend routes theo Role (Admin, Manager, Customer).
- **Task 6: Admin Users UI**
  - Giao diện danh sách user, tìm kiếm và thay đổi Role (không tự thay đổi quyền của mình).

## Checkpoints
- [x] User có thể đăng ký và nhận OTP giả lập.
- [x] Đăng nhập thành công, token được lưu.
- [x] Truy cập trang Admin bị chặn nếu không đủ quyền.
