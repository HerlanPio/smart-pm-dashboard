import { useEffect, useRef } from 'react';

// Calls onIdle after timeoutMs of no user activity (mousemove/keydown/touch)
export function useIdleLogout(onIdle, timeoutMs = 600000) {
  const timeoutRef = useRef();

  const reset = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => onIdle(), timeoutMs);
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];
    events.forEach(e => window.addEventListener(e, reset));
    reset();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      events.forEach(e => window.removeEventListener(e, reset));
    };
  }, [onIdle, timeoutMs]);
}