'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import toast from 'react-hot-toast';
import { Button } from '../ui/Button';

export default function ProductReviews({ slug }: { slug: string }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token, user } = useAuthStore();

  const fetchReviews = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}/reviews` : `http://localhost:3001/api/products/${slug}/reviews`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Không thể tải đánh giá');
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error('Vui lòng đăng nhập để đánh giá');
      return;
    }

    setIsSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const res = await fetch(`${apiUrl}/products/${slug}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
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
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
    : 0;

  return (
    <div className="mt-12 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Đánh giá sản phẩm</h2>
      
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl md:w-1/3">
          <span className="text-5xl font-bold text-slate-800">{averageRating}</span>
          <div className="flex text-amber-400 my-2 text-lg">
            {[1, 2, 3, 4, 5].map((star) => (
              <i key={star} className={`fa-solid fa-star ${star <= Number(averageRating) ? '' : 'text-slate-200'}`}></i>
            ))}
          </div>
          <span className="text-slate-500">{reviews.length} đánh giá</span>
        </div>

        <div className="md:w-2/3">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Gửi đánh giá của bạn</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-slate-600">Bạn cảm thấy sản phẩm thế nào?</span>
              <div className="flex text-amber-400 text-xl cursor-pointer">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i 
                    key={star} 
                    className={`fa-solid fa-star ${star <= rating ? '' : 'text-slate-200'} hover:scale-110 transition-transform`}
                    onClick={() => setRating(star)}
                  ></i>
                ))}
              </div>
            </div>
            
            <textarea
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
              rows={3}
              placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            
            <Button type="submit" variant="primary" isLoading={isSubmitting} disabled={!token}>
              {token ? 'Gửi đánh giá' : 'Đăng nhập để đánh giá'}
            </Button>
          </form>
        </div>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center py-8 text-slate-500"><i className="fa-solid fa-spinner fa-spin mr-2"></i>Đang tải đánh giá...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8 text-slate-500">Chưa có đánh giá nào cho sản phẩm này.</div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    {review.user.hoTen?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{review.user.hoTen || 'Người dùng ẩn danh'}</h4>
                    <span className="text-xs text-slate-500">{new Date(review.createdAt).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
                <div className="flex text-amber-400 text-sm">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i key={star} className={`fa-solid fa-star ${star <= review.rating ? '' : 'text-slate-200'}`}></i>
                  ))}
                </div>
              </div>
              {review.comment && (
                <p className="text-slate-600 pl-13">{review.comment}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
