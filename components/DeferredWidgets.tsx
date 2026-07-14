'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Floating widgets are below-the-fold and pull in heavy deps
// (react-calendly, react-markdown, framer-motion, ai-sdk). Loading them
// client-side, after the page is idle, keeps them out of the critical path
// so they no longer compete with first paint / hydration on every page.
const AiChatWidget = dynamic(
  () => import('@/components/ai-chat-widget').then((m) => m.AiChatWidget),
  { ssr: false }
);
const MeetingWidget = dynamic(
  () => import('@/components/MeetingWidget').then((m) => m.MeetingWidget),
  { ssr: false }
);
const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'), {
  ssr: false,
});

export default function DeferredWidgets() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let done = false;
    const load = () => {
      if (done) return;
      done = true;
      setReady(true);
    };

    // Load when the browser is idle, or on the first interaction, whichever
    // comes first — with a hard fallback so they always eventually mount.
    const ric =
      typeof (window as any).requestIdleCallback === 'function'
        ? (window as any).requestIdleCallback(load, { timeout: 3000 })
        : window.setTimeout(load, 2000);

    const opts = { once: true, passive: true } as const;
    window.addEventListener('scroll', load, opts);
    window.addEventListener('pointerdown', load, opts);
    window.addEventListener('keydown', load, opts);

    return () => {
      if (typeof (window as any).cancelIdleCallback === 'function') {
        (window as any).cancelIdleCallback(ric);
      } else {
        window.clearTimeout(ric as number);
      }
      window.removeEventListener('scroll', load);
      window.removeEventListener('pointerdown', load);
      window.removeEventListener('keydown', load);
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <WhatsAppButton />
      <MeetingWidget />
      <AiChatWidget />
    </>
  );
}
