import { useCallback, useEffect, useRef, useState } from 'react';

export function useToast(hideAfterMs = 2200) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const showToast = useCallback(
    (text: string) => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      setMessage(text);
      setVisible(true);
      timeoutRef.current = window.setTimeout(() => setVisible(false), hideAfterMs);
    },
    [hideAfterMs]
  );

  useEffect(
    () => () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    },
    []
  );

  return { message, visible, showToast };
}
