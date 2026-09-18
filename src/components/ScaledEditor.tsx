import { useEffect, useRef, useState, type ReactNode } from 'react';

type ScaledEditorProps = {
  baseWidth: number;
  baseHeight: number;
  children: ReactNode;
};

export default function ScaledEditor({ baseWidth, baseHeight, children }: ScaledEditorProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? baseWidth;
      setScale(Math.min(1, width / baseWidth));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [baseWidth]);

  return (
    <div ref={outerRef} style={{ width: '100%', height: baseHeight * scale, overflow: 'hidden' }}>
      <div
        style={{
          width: baseWidth,
          height: baseHeight,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  );
}
