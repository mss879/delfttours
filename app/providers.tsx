'use client';

import { CurrencyProvider } from '@/components/CurrencyProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CurrencyProvider>
      {children}
    </CurrencyProvider>
  );
}
