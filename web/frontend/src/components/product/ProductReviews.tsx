'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { getApiUrl, authFetchJson, authFetch } from '@/lib/api';
import toast from 'react-hot-toast';
import { Button } from '../ui/Button';
import { Star, CheckCircle, X, Loader2 } from 'lucide-react';

interface ReviewData {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  userId: string;
  user: { hoTen: string | null };
}

export default function ProductReviews({ slug }: { slug: string }) {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEligible, setIsEligible] = useState(false);
  const { token, user } = useAuthStore();

  const fetchReviews = async () => {
    try {
      const res = await fetch(getApiUrl(`/products/${slug}/reviews`));
      if (!res.ok) throw new Error('Không thể tải đánh giá');
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEligibility = async () => {
    if (!token) {
      setIsEligible(false);
      return;
    }
    try {
      const res = await authFetch(`/products/${slug}/review-eligibility`, token);
      if (res.ok) {
        const data = await res.json();
        setIsEligible(data.eligible);
      } else {
        setIsEligible(false);
      }
    } catch (error) {
      console.error(error);
      setIsEligible(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    fetchEligibility();
  }, [slug, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error('Vui lòng đăng nhập để đánh giá');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await authFetchJson(`/products/${slug}/reviews`, token!, {
        method: 'POST',
        body: JSON.stringify({ rating, comment })
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Gửi đánh giá thất bại');
      }

      toast.success('Đã gửi đánh giá thành công');
      setComment('');
      setRating(5);
      fetchReviews();
      fetchEligibility();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) return;
    try {
      const res = await authFetch(`/products/${slug}/reviews/${reviewId}`, token!, {
        method: 'DELETE'
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Xóa đánh giá thất bại');
      }
      toast.success('Xóa đánh giá thành công');
      fetchReviews();
      fetchEligibility();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
    : 0;

  const isModerator = user?.role === 'ADMIN' || user?.role === 'MANAGER';

  const [showAll, setShowAll] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const displayedReviews = showAll ? reviews : reviews.slice(0, 2);

  return (
    <div className="bg-white p-3 rounded-xl shadow-card border border-slate-200/60">
      {/* Header: title + rating + write button */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Đánh giá</span>
          <div className="flex text-amber-400 gap-px" style={{ fontSize: '10px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={10} fill={star <= Number(averageRating) ? 'currentColor' : 'none'} className={star <= Number(averageRating) ? '' : 'text-slate-200'} strokeWidth={1.5} />
            ))}
          </div>
          <span className="text-[11px] font-semibold text-slate-600">{averageRating}<span className="text-slate-400 font-normal"> ({reviews.length})</span></span>
        </div>
        {token && isEligible && (
          <button onClick={() => setShowForm(!showForm)} className="text-[10px] text-sky-600 hover:text-sky-700 font-semibold cursor-pointer transition-colors">
            {showForm ? 'Đóng' : '✎ Viết'}
          </button>
        )}
      </div>

      {/* Collapsible form */}
      {showForm && token && isEligible && (
        <form onSubmit={handleSubmit} className="space-y-1.5 mb-2 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <div className="flex text-amber-400 text-xs cursor-pointer gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={14} fill={star <= rating ? 'currentColor' : 'none'} className={`${star <= rating ? '' : 'text-slate-200'} hover:scale-110 transition-transform`} onClick={() => setRating(star)} strokeWidth={1.5} />
              ))}
            </div>
          </div>
          <textarea
            className="w-full px-2.5 py-1.5 bg-slate-50/80 border border-slate-200 rounded-lg outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/15 resize-none text-[11px] transition-all duration-200"
            rows={2}
            placeholder="Chia sẻ trải nghiệm..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <Button type="submit" variant="primary" isLoading={isSubmitting} className="!text-[10px] !py-1 !px-2.5 !rounded-md">
            Gửi
          </Button>
        </form>
      )}

      {/* Ultra-compact review list */}
      <div className="space-y-1.5">
        {isLoading ? (
          <div className="text-center py-2 text-slate-400 text-[11px] flex items-center justify-center gap-1.5"><Loader2 size={12} className="animate-spin" />Đang tải...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-2 text-slate-400 text-[11px]">Chưa có đánh giá nào.</div>
        ) : (
          <>
            {displayedReviews.map((review) => (
              <div key={review.id} className="group relative border-b border-slate-100 last:border-0 pb-3 mb-3 last:pb-0 last:mb-0">
                <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900 text-[15px]">{review.user.hoTen || 'Ẩn danh'}</span>
                    <span className="text-emerald-600 flex items-center gap-1.5 text-sm">
                      <CheckCircle size={14} strokeWidth={2} /> Đã mua tại PhoneStore
                    </span>
                  </div>
                  <div className="flex text-amber-500 text-[13px] gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={13} fill={star <= review.rating ? 'currentColor' : 'none'} className={star <= review.rating ? '' : 'text-slate-200'} strokeWidth={1.5} />
                    ))}
                  </div>
                  {review.comment && (
                    <div className="text-[15px] text-slate-800 mt-1">
                      {review.comment}
                    </div>
                  )}
                </div>
                {(isModerator || (user && review.userId === user.id)) && (
                  <button onClick={() => handleDeleteReview(review.id)} className="absolute top-0 right-0 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-2" title="Xóa">
                    <X size={14} strokeWidth={2} />
                  </button>
                )}
              </div>
            ))}
            {reviews.length > 2 && (
              <button onClick={() => setShowAll(!showAll)} className="text-[11px] text-sky-600 hover:text-sky-700 font-semibold cursor-pointer transition-colors">
                {showAll ? '▲ Thu gọn' : `Xem tất cả ${reviews.length} đánh giá ▸`}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
