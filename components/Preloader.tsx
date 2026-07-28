'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

// The branded intro must ONLY appear ONCE per session on the homepage ("/").
export default function Preloader() {
  const pathname = usePathname();
  const [shouldShow, setShouldShow] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (pathname === '/') {
      try {
        const hasSeen = sessionStorage.getItem('hasSeenPreloader');
        if (!hasSeen) {
          sessionStorage.setItem('hasSeenPreloader', 'true');
          setShouldShow(true);
        } else {
          setShouldShow(false);
        }
      } catch (e) {
        // If sessionStorage is disabled/blocked, fallback to showing intro once on mount
        setShouldShow(true);
      }
    } else {
      setShouldShow(false);
    }
    setChecked(true);
  }, [pathname]);

  // Only render if checked, shouldShow is true, and on homepage
  if (!checked || !shouldShow || pathname !== '/') return null;

  return <HomeIntro />;
}

function HomeIntro() {
  const [show, setShow] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const fullText = 'Welcome to Delft Tours';

  useEffect(() => {
    // GSAP's "lag smoothing" clamps a timeline's delta to ~33ms whenever a
    // single frame runs longer than 500ms. The homepage's first paint — heavy
    // hydration plus hero-image decode — produces exactly those long frames, so
    // the intro used to *crawl*: a blank white overlay stuck on screen for many
    // seconds (and, on a backgrounded tab, effectively frozen) while it inched
    // through the typing. GSAP is only ever used here, so turning lag smoothing
    // off lets the intro advance in real wall-clock time and finish on schedule
    // no matter how busy the main thread is. Restored to GSAP's default on
    // cleanup (lagSmoothing() returns undefined, so we can't read the prior
    // value — 500/33 are GSAP's documented defaults).
    gsap.ticker.lagSmoothing(0);

    // Runs once per mount — and this component only mounts on the homepage, so
    // the intro plays on every homepage load / refresh: a ~2.5s branded intro
    // that types the headline, holds, then fades the overlay out.
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

    // Hard safety net: no matter what happens to the animation (frame stalls,
    // a killed tween, a backgrounded tab), the full-screen overlay must never
    // outlive the intro and trap the page underneath it. `setTimeout` runs off
    // real time — not GSAP's tick clock — so it dismisses reliably even if the
    // timeline itself is starved.
    const safety = window.setTimeout(() => setShow(false), 4000);

    return () => {
      tl.kill();
      cursorBlink.kill();
      window.clearTimeout(safety);
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  if (!show) return null;

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
          className="text-3xl md:text-4xl font-extrabold text-brand-600 tracking-wide font-sans select-none min-h-[48px] flex items-center"
        >
          <span>{displayedText}</span>
          {/* Pulsing/blinking cursor using GSAP */}
          <span
            ref={cursorRef}
            className="inline-block w-[3px] h-[30px] md:h-[36px] bg-gold ml-2"
          />
        </h1>
      </div>
    </div>
  );
}
