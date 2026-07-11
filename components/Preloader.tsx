'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

export default function Preloader() {
  const pathname = usePathname();
  // The branded intro is only for the public site — never run it in the admin.
  const isAdmin = pathname?.startsWith('/admin') ?? false;
  const [show, setShow] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const fullText = 'Welcome to Delft Tours';

  useEffect(() => {
    // Skip the intro entirely on admin routes.
    if (isAdmin) return;

    // Runs on every page load / refresh — a ~2.5s branded intro: type the
    // headline, hold, then fade the overlay out.
    const tl = gsap.timeline({
      onComplete: () => setShow(false),
    });

    // Tween the character index so the headline "types" in.
    const textState = { charIndex: 0 };

    // Typing tween: 1.5s to type the full string.
    tl.to(textState, {
      charIndex: fullText.length,
      duration: 1.5,
      ease: 'none',
      onUpdate: () => {
        setDisplayedText(fullText.slice(0, Math.floor(textState.charIndex)));
      },
    });

    // Hold for 0.5s after typing completes.
    tl.to({}, { duration: 0.5 });

    // Fade the cursor out just before the container exits.
    tl.to(cursorRef.current, { opacity: 0, duration: 0.2 }, '-=0.2');

    // Fade + scale the overlay out (total ~2.5s).
    tl.to(containerRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.5,
      ease: 'power2.inOut',
    });

    // Blinking cursor loop while typing.
    const cursorBlink = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    return () => {
      tl.kill();
      cursorBlink.kill();
    };
  }, [isAdmin]);

  if (isAdmin || !show) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
      style={{ willChange: 'opacity, transform' }}
    >
      {/* Subtle modern soft background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(11,62,99,0.02)_0%,transparent_70%)]" />

      <div className="relative flex flex-col items-center max-w-md px-6 text-center">
        {/* Typing Text */}
        <h1 
          ref={textRef} 
          className="text-3xl md:text-4xl font-extrabold text-[#0b3e63] tracking-wide font-sans select-none min-h-[48px] flex items-center"
        >
          <span>{displayedText}</span>
          {/* Pulsing/blinking cursor using GSAP */}
          <span 
            ref={cursorRef} 
            className="inline-block w-[3px] h-[30px] md:h-[36px] bg-[#FFC947] ml-2" 
          />
        </h1>
      </div>
    </div>
  );
}
