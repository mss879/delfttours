// Currency configuration and conversion utilities

export type CurrencyCode = 'USD' | 'LKR' | 'EUR' | 'GBP' | 'AUD' | 'INR' | 'SGD' | 'AED' | 'BDT';

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  // Approximate exchange rate from USD (updated periodically)
  rateFromUSD: number;
  locale: string;
}

// Exchange rates from USD — update these periodically
// Last updated: Feb 2026 (approximate)
export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rateFromUSD: 1, locale: 'en-US' },
  LKR: { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee', rateFromUSD: 325, locale: 'si-LK' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rateFromUSD: 0.92, locale: 'de-DE' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rateFromUSD: 0.79, locale: 'en-GB' },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rateFromUSD: 1.55, locale: 'en-AU' },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rateFromUSD: 83, locale: 'en-IN' },
  SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rateFromUSD: 1.34, locale: 'en-SG' },
  AED: { code: 'AED', symbol: 'AED', name: 'UAE Dirham', rateFromUSD: 3.67, locale: 'ar-AE' },
  BDT: { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', rateFromUSD: 120, locale: 'bn-BD' },
};

// Map country codes to currencies
export const COUNTRY_TO_CURRENCY: Record<string, CurrencyCode> = {
  US: 'USD',
  LK: 'LKR',
  // Europe
  DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', NL: 'EUR', BE: 'EUR', AT: 'EUR',
  PT: 'EUR', IE: 'EUR', FI: 'EUR', GR: 'EUR',
  // UK
  GB: 'GBP',
  // Australia & NZ
  AU: 'AUD', NZ: 'AUD',
  // India & subcontinent
  IN: 'INR',
  // Singapore
  SG: 'SGD',
  // UAE & Gulf
  AE: 'AED',
  // Bangladesh
  BD: 'BDT',
  // Canada uses USD display
  CA: 'USD',
};

/**
 * Parse a USD price string like "$1,500" or "$290" into a number.
 * Returns null if the string can't be parsed.
 */
export function parseUSDPrice(priceStr: string): number | null {
  if (!priceStr) return null;
  const cleaned = priceStr.replace(/[^0-9.]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

/**
 * Convert a USD amount to the target currency and format it.
 */
export function formatPrice(usdAmount: number, currencyCode: CurrencyCode): string {
  const currency = CURRENCIES[currencyCode];
  if (!currency) return `$${usdAmount.toLocaleString('en-US')}`;

  const converted = Math.round(usdAmount * currency.rateFromUSD);

  // Format with proper thousands separators
  const formatted = converted.toLocaleString('en-US');

  return `${currency.symbol} ${formatted}`;
}

/**
 * Convert a price string (e.g. "$1,500") to the target currency.
 * Returns the original string if parsing fails, or "Contact Us" if empty.
 */
export function convertPriceString(priceStr: string | undefined, currencyCode: CurrencyCode): string {
  if (!priceStr) return 'Contact Us';

  const usd = parseUSDPrice(priceStr);
  if (usd === null) return priceStr;

  // If already USD and target is USD, return as-is
  if (currencyCode === 'USD') return priceStr;

  return formatPrice(usd, currencyCode);
}
