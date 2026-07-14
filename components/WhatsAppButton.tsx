'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Site-wide floating WhatsApp button. Mounted from DeferredWidgets so it shares
// the same lazily-loaded chunk as the meeting + chat FABs (framer-motion is
// already in there) and stays off the critical path.
//
// Like the other two FABs it stays hidden over the hero and reveals past 100px
// of scroll, so the whole bottom-right stack appears together. Sits at the TOP
// of that stack, above the meeting (bottom-24) and chat (bottom-6) buttons.

const WHATSAPP_NUMBER = '94769220306'; // +94 76 922 0306 in wa.me (E.164, no symbols)
const WHATSAPP_URL =
  `https://wa.me/${WHATSAPP_NUMBER}?text=` +
  encodeURIComponent("Hi Delft Tours, I'd like to know more about your Sri Lanka tours.");

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 100);

    // Checked once on mount, not just on the next scroll event: this component is
    // lazy-mounted, so the page can already be scrolled past the threshold (a
    // restored scroll position, or a #hash link) before any event reaches us.
    toggleVisibility();

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          // Same reveal as the meeting FAB, so the stack animates in as one unit.
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          // hover/tap scaling goes through framer rather than Tailwind's
          // hover:scale-105, which would be clobbered by the inline transform
          // framer writes for the reveal animation.
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          // The anchor is exactly the 56px circle so the clickable area stays tight;
          // the label tooltip is absolutely positioned and never inflates the hit box.
          // bottom-[10.5rem] places it one slot above the meeting FAB (bottom-24).
          className="group fixed bottom-[10.5rem] right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_20px_rgba(37,211,102,0.45)]"
        >
          {/* Pulsing ring to draw the eye, matching the site's other FABs */}
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-60" />
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 drop-shadow-sm" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 005.71 1.447h.006c6.585 0 11.946-5.335 11.949-11.896C24 8.156 22.797 5.652 20.52 3.449" />
          </svg>
          <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-gray-800 opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 md:block">
            Chat on WhatsApp
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
