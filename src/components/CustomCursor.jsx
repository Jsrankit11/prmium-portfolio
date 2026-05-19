import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Detect mobile / touch devices
    const checkDevice = () => {
      const mobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
      if (!mobile) setIsVisible(true);
    };

    checkDevice();

    if (isMobile) return;

    const mouse = { x: 0, y: 0 };
    const ring = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }
    };

    const updateRing = () => {
      // Linear interpolation for smooth trailing effect
      ring.x += (mouse.x - ring.x) * 0.15;
      ring.y += (mouse.y - ring.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      requestAnimationFrame(updateRing);
    };

    const onMouseOver = (e) => {
      // Glow/expand when hovering links, buttons or interactive elements
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('.interactive-card') ||
        target.getAttribute('role') === 'button';
      
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    const animationFrame = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animationFrame);
    };
  }, [isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-neon-cyan rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out shadow-[0_0_8px_#00E5FF]"
      />
      {/* Outer Glowing Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${
          isHovered 
            ? 'w-12 h-12 border-neon-cyan bg-neon-cyan/10 shadow-[0_0_20px_rgba(0,229,255,0.4)] scale-110' 
            : 'w-7 h-7 border-neon-cyan/40 bg-transparent shadow-[0_0_10px_rgba(0,229,255,0.1)]'
        }`}
      />
    </>
  );
}
