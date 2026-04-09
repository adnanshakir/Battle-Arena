import { useState, useEffect, useCallback } from 'react';

export function useSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsOpen(false);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const toggle = useCallback(() => setIsOpen(o => !o), []);
  const close  = useCallback(() => setIsOpen(false),  []);
  const open   = useCallback(() => setIsOpen(true),   []);

  return { isOpen, isMobile, toggle, close, open };
}
