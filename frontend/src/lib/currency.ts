import type { RootState } from "@/store";
import type { TCurrencyCode } from "@/store/currency/currencySlice";

const currencyConfig: Record<
  TCurrencyCode,
  { rate: number; locale: string; currency: string }
> = {
  usd: { rate: 1, locale: "en-US", currency: "USD" },
  euro: { rate: 0.92, locale: "de-DE", currency: "EUR" },
  rubi: { rate: 3.75, locale: "ar-SA", currency: "SAR" },
  rubol: { rate: 92, locale: "ru-RU", currency: "RUB" },
};

export const selectCurrency = (state: RootState) => state.currency.value;

export const convertPrice = (price: number, currency: TCurrencyCode) => {
  const config = currencyConfig[currency] ?? currencyConfig.usd;
  return Number(price ?? 0) * config.rate;
};

export const formatPrice = (price: number, currency: TCurrencyCode) => {
  const config = currencyConfig[currency] ?? currencyConfig.usd;
  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertPrice(price, currency));
};
