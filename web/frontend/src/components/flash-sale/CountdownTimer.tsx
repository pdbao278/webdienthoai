'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string | Date;
  onExpire?: () => void;
}

export function CountdownTimer({ targetDate, onExpire }: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    setMounted(true);
    
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setTimeLeft(prev => {
          if (!prev.isExpired && onExpire) {
            setTimeout(onExpire, 0);
          }
          return { hours: 0, minutes: 0, seconds: 0, isExpired: true };
        });
        return;
      }

      setTimeLeft({
        hours: Math.floor((difference / (1000 * 60 * 60))),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onExpire]);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 bg-rose-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold opacity-0">
        <Clock size={16} /> 00:00:00
      </div>
    );
  }

  if (timeLeft.isExpired) {
    return (
      <div className="flex items-center gap-2 bg-slate-200 text-slate-500 px-3 py-1.5 rounded-lg text-sm font-bold">
        Đã kết thúc
      </div>
    );
  }

  const formatUnit = (unit: number) => unit.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-2 bg-rose-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm shadow-rose-500/20">
      <Clock size={16} className="animate-pulse" />
      <div className="flex items-center gap-1">
        <span className="bg-rose-600/50 px-1.5 py-0.5 rounded">{formatUnit(timeLeft.hours)}</span>
        <span className="text-rose-200">:</span>
        <span className="bg-rose-600/50 px-1.5 py-0.5 rounded">{formatUnit(timeLeft.minutes)}</span>
        <span className="text-rose-200">:</span>
        <span className="bg-rose-600/50 px-1.5 py-0.5 rounded">{formatUnit(timeLeft.seconds)}</span>
      </div>
    </div>
  );
}
