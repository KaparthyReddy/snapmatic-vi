import { useEffect } from 'react';

type BootScreenProps = {
  onDone: () => void;
  durationMs?: number;
};

export default function BootScreen({ onDone, durationMs = 1800 }: BootScreenProps) {
  useEffect(() => {
    const id = setTimeout(onDone, durationMs);
    return () => clearTimeout(id);
  }, [onDone, durationMs]);

  return (
    <div className="vi-boot">
      <div className="vi-boot__logo vi-display vi-gradient-text">VI</div>
      <div className="vi-boot__bar">
        <div className="vi-boot__bar-fill" />
      </div>
    </div>
  );
}
