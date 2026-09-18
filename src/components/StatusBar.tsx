import { useEffect, useState } from 'react';

type StatusBarProps = {
  wantedLevel?: number;
};

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

export default function StatusBar({ wantedLevel = 0 }: StatusBarProps) {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const stars = Array.from({ length: 5 }, (_, i) => i < wantedLevel);

  return (
    <div className="vi-statusbar">
      <span>{formatTime(time)}</span>
      <div className="vi-statusbar__stars" aria-label={`Wanted level ${wantedLevel} of 5`}>
        {stars.map((filled, i) => (
          <span key={i} className={filled ? 'vi-star vi-star--filled' : 'vi-star'}>
            ★
          </span>
        ))}
      </div>
      <div className="vi-statusbar__icons">
        <span>LTE</span>
        <span>100%</span>
      </div>
    </div>
  );
}
