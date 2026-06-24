'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { authFetch, authFetchJson } from '@/lib/api';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';

interface UserData {
  id: string;
  email: string;
  hoTen: string | null;
  sdt: string | null;
  role: 'CUSTOMER' | 'MANAGER' | 'ADMIN';
  emailVerified: string | null;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { token, user: currentUser } = useAuthStore();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [selectedRole, setSelectedRole] = useState<'CUSTOMER' | 'MANAGER' | 'ADMIN'>('CUSTOMER');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await authFetch(`/admin/users?search=${encodeURIComponent(searchTerm)}`, token!);
      if (!res.ok) throw new Error('Lỗi tải danh sách người dùng');
      const json = await res.json();
      setUsers(json.data || []);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Lỗi');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      const timeoutId = setTimeout(() => {
        fetchUsers();
      }, 300); // debounce search
      return () => clearTimeout(timeoutId);
    }
  }, [token, searchTerm]);

  const handleOpenRoleModal = (user: UserData) => {
    if (user.id === currentUser?.id) {
      toast.error('Không thể tự thay đổi quyền của chính mình');
      return;
    }
    setEditingUser(user);
    setSelectedRole(user.role);
    setShowRoleModal(true);
  };

  const handleUpdateRole = async () => {
    if (!editingUser) return;
    setIsSubmitting(true);
    try {
      const res = await authFetchJson(`/admin/users/${editingUser.id}/role`, token!, {
        method: 'PATCH',
        body: JSON.stringify({ role: selectedRole }),
      });
      
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Thao tác thất bại');
      }
      
      toast.success('Cập nhật quyền thành công');
      setShowRoleModal(false);
      fetchUsers();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Lỗi');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Quản lý Người dùng</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder="Tìm theo tên, email, sđt..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all" 
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="px-6 py-4 font-semibold">Tài khoản</th>
                <th className="px-6 py-4 font-semibold">SĐT</th>
                <th className="px-6 py-4 font-semibold">Trạng thái</th>
                <th className="px-6 py-4 font-semibold">Phân quyền (Role)</th>
                <th className="px-6 py-4 font-semibold">Ngày tham gia</th>
                <th className="px-6 py-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500">Đang tải...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500">Không tìm thấy người dùng nào</td></tr>
              ) : users.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-800">{u.hoTen || 'Khách hàng'}</p>
                    <p className="text-xs text-slate-500">{u.email}</p>
                  </td>
                  <td className="px-6 py-4">{u.sdt || '-'}</td>
                  <td className="px-6 py-4">
                    {u.emailVerified ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium">
                        <i className="fa-solid fa-check-circle"></i> Đã xác thực
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                        <i className="fa-solid fa-clock"></i> Chờ xác thực
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                      u.role === 'ADMIN' ? 'bg-purple-50 text-purple-700' :
                      u.role === 'MANAGER' ? 'bg-sky-50 text-sky-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{new Date(u.createdAt).toLocaleDateString('vi-VN')}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleOpenRoleModal(u)} className="text-blue-500 hover:text-blue-700 p-2 font-medium" disabled={u.id === currentUser?.id}>
                      Sửa Quyền
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showRoleModal && editingUser && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Cấp quyền</h3>
              <button onClick={() => setShowRoleModal(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-700 mb-1">Người dùng</p>
                <p className="text-sm text-slate-900">{editingUser.hoTen} ({editingUser.email})</p>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">Vai trò (Role)</label>
                <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none" value={selectedRole} onChange={e => setSelectedRole(e.target.value as any)}>
                  <option value="CUSTOMER">CUSTOMER (Khách hàng)</option>
                  <option value="MANAGER">MANAGER (Nhân viên)</option>
                  <option value="ADMIN">ADMIN (Quản trị viên)</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
              <Button variant="outline" onClick={() => setShowRoleModal(false)}>Hủy</Button>
              <Button variant="primary" onClick={handleUpdateRole} isLoading={isSubmitting}>Xác nhận</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
