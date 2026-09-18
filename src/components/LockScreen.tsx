import { useEffect, useState } from 'react';
import StatusBar from './StatusBar';

type LockScreenProps = {
  onUnlock: () => void;
  wantedLevel?: number;
};

function formatClock(date: Date) {
  return {
    time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    day: date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }),
  };
}

export default function LockScreen({ onUnlock, wantedLevel = 0 }: LockScreenProps) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const { time, day } = formatClock(now);

  return (
    <div className="vi-lock">
      <StatusBar wantedLevel={wantedLevel} />
      <div className="vi-lock__clock">
        <div className="vi-lock__time vi-display">{time}</div>
        <div className="vi-lock__day">{day}</div>
      </div>
      <button className="vi-btn vi-btn--primary vi-lock__unlock" onClick={onUnlock}>
        Swipe to unlock
      </button>
    </div>
  );
}
