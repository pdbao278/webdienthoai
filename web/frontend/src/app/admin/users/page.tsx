'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { authFetch, authFetchJson } from '@/lib/api';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Search, CheckCircle, Clock, X, Loader2 } from 'lucide-react';

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
        <h1 className="text-2xl font-[var(--font-outfit)] font-bold text-slate-800 tracking-tight">Quản lý Người dùng</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative group">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Tìm theo tên, email, sđt..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white border border-slate-200/80 rounded-xl text-sm font-medium focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15 outline-none transition-all shadow-sm" 
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-card border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-600">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Tài khoản</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">SĐT</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Trạng thái</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Phân quyền (Role)</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Ngày tham gia</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500"><Loader2 className="animate-spin inline-block mr-2" size={20} /> Đang tải...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-medium">Không tìm thấy người dùng nào</td></tr>
              ) : users.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800">{u.hoTen || 'Khách hàng'}</p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{u.email}</p>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">{u.sdt || '-'}</td>
                  <td className="px-6 py-4">
                    {u.emailVerified ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold tracking-wide border border-emerald-200/60">
                        <CheckCircle size={14} strokeWidth={2.5} /> Đã xác thực
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold tracking-wide border border-slate-200/60">
                        <Clock size={14} strokeWidth={2.5} /> Chờ xác thực
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide border ${
                      u.role === 'ADMIN' ? 'bg-purple-50 text-purple-700 border-purple-200/60' :
                      u.role === 'MANAGER' ? 'bg-sky-50 text-sky-700 border-sky-200/60' :
                      'bg-slate-100 text-slate-700 border-slate-200/60'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-medium">{new Date(u.createdAt).toLocaleDateString('vi-VN')}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleOpenRoleModal(u)} className="text-sky-600 hover:text-sky-700 hover:bg-sky-50 px-4 py-2 rounded-xl font-bold transition-colors active:scale-95 disabled:opacity-50 disabled:active:scale-100 disabled:hover:bg-transparent" disabled={u.id === currentUser?.id}>
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
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[var(--z-modal-backdrop)] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-modal w-full max-w-sm overflow-hidden animate-fade-in-up border border-slate-200/60">
            <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-[var(--font-outfit)] font-bold text-slate-800 tracking-tight">Cấp quyền</h3>
              <button onClick={() => setShowRoleModal(false)} className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-full transition-colors active:scale-95">
                <X size={20} strokeWidth={2} />
              </button>
            </div>
            <div className="p-6 md:p-8 space-y-5">
              <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/60">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Người dùng</p>
                <p className="text-sm font-bold text-slate-800">{editingUser.hoTen} <span className="text-slate-500 font-medium block mt-0.5">({editingUser.email})</span></p>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">Vai trò (Role)</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15 outline-none font-semibold text-slate-700 transition-all cursor-pointer" value={selectedRole} onChange={e => setSelectedRole(e.target.value as any)}>
                  <option value="CUSTOMER">CUSTOMER (Khách hàng)</option>
                  <option value="MANAGER">MANAGER (Nhân viên)</option>
                  <option value="ADMIN">ADMIN (Quản trị viên)</option>
                </select>
              </div>
            </div>
            <div className="p-6 md:p-8 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
              <Button variant="outline" onClick={() => setShowRoleModal(false)} className="rounded-xl px-5 font-bold">Hủy</Button>
              <Button variant="primary" onClick={handleUpdateRole} isLoading={isSubmitting} className="rounded-xl px-5 font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-card">Xác nhận</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
