'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { CurrencyCode, COUNTRY_TO_CURRENCY, CURRENCIES, convertPriceString, CurrencyInfo } from '@/lib/currency';

interface CurrencyContextValue {
  currency: CurrencyCode;
  currencyInfo: CurrencyInfo;
  setCurrency: (code: CurrencyCode) => void;
  convertPrice: (usdPriceStr: string | undefined) => string;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: 'USD',
  currencyInfo: CURRENCIES.USD,
  setCurrency: () => {},
  convertPrice: (str) => str || 'Contact Us',
  isLoading: true,
});

export function useCurrency() {
  return useContext(CurrencyContext);
}

interface CurrencyProviderProps {
  children: ReactNode;
}

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [currency, setCurrencyState] = useState<CurrencyCode>('USD');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has a saved preference
    const saved = localStorage.getItem('delft-currency');
    if (saved && saved in CURRENCIES) {
      setCurrencyState(saved as CurrencyCode);
      setIsLoading(false);
      return;
    }

    // Detect country via free geo-IP API
    detectCurrency();
  }, []);

  async function detectCurrency() {
    try {
      // Using ipapi.co — free tier, no API key needed, 1000 req/day
      const res = await fetch('https://ipapi.co/json/', {
        signal: AbortSignal.timeout(2000), // 2s timeout — don't stall prices
      });
      if (!res.ok) throw new Error('Geo API failed');
      const data = await res.json();
      const countryCode = data.country_code as string;

      const detected = COUNTRY_TO_CURRENCY[countryCode] || 'USD';
      setCurrencyState(detected);
      localStorage.setItem('delft-currency', detected);
    } catch {
      // Fallback to USD, and persist it so a rate-limited/slow geo API isn't
      // re-hit (and re-stalled) on every page load. Visitors can still change
      // currency via the switcher, which overwrites this value.
      setCurrencyState('USD');
      try {
        localStorage.setItem('delft-currency', 'USD');
      } catch {
        /* ignore */
      }
    } finally {
      setIsLoading(false);
    }
  }

  function setCurrency(code: CurrencyCode) {
    setCurrencyState(code);
    localStorage.setItem('delft-currency', code);
  }

  function convertPrice(usdPriceStr: string | undefined): string {
    return convertPriceString(usdPriceStr, currency);
  }

  const value: CurrencyContextValue = {
    currency,
    currencyInfo: CURRENCIES[currency],
    setCurrency,
    convertPrice,
    isLoading,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}
