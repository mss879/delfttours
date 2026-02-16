'use client';

import { useCurrency } from './CurrencyProvider';
import { CURRENCIES, CurrencyCode } from '@/lib/currency';

/**
 * Small dropdown to let users manually switch currency.
 * Appears as a subtle pill in the sticky card or header.
 */
export default function CurrencySwitcher({ className = '' }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();

  const options: CurrencyCode[] = ['USD', 'LKR', 'EUR', 'GBP', 'AUD', 'INR', 'SGD', 'AED', 'BDT'];

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
      className={`text-xs font-medium bg-slate-100 border border-slate-200 rounded-md px-2 py-1 text-slate-600 cursor-pointer hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-300 ${className}`}
      aria-label="Select currency"
    >
      {options.map((code) => (
        <option key={code} value={code}>
          {CURRENCIES[code].symbol} {code}
        </option>
      ))}
    </select>
  );
}
