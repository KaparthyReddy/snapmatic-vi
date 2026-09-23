import { useEffect, useRef, type ReactNode } from 'react';

type PhoneShellProps = {
  children: ReactNode;
  toast?: ReactNode;
};

const PHONE_WIDTH = 390;
const PHONE_HEIGHT = 780;
const MARGIN = 24;

export default function PhoneShell({ children, toast }: PhoneShellProps) {
  const scaleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const applyScale = () => {
      const el = scaleRef.current;
      if (!el) return;
      const availW = window.innerWidth - MARGIN * 2;
      const availH = window.innerHeight - MARGIN * 2;
      const scale = Math.min(1, availW / PHONE_WIDTH, availH / PHONE_HEIGHT);
      el.style.setProperty('--vi-phone-scale', String(scale));
    };
    applyScale();
    window.addEventListener('resize', applyScale);
    return () => window.removeEventListener('resize', applyScale);
  }, []);

  return (
    <div className="vi-phone-scale" ref={scaleRef}>
      <div className="vi-phone">
        <div className="vi-phone__notch" />
        <div className="vi-phone__screen">
          {children}
          {toast}
        </div>
        <div className="vi-phone__home" />
      </div>
    </div>
  );
}