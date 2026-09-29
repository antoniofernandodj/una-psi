export const onlyDigits = (v: string | null | undefined) => (v ?? "").replace(/\D/g, "");

/** (11) 98765-4321 */
export function maskPhone(v: string): string {
  const d = onlyDigits(v).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/** 06/123456 (região/número) */
export function maskCrp(v: string): string {
  const d = onlyDigits(v).slice(0, 8);
  return d.length <= 2 ? d : `${d.slice(0, 2)}/${d.slice(2)}`;
}

/** 180,00 — digita-se apenas números, centavos implícitos */
export function maskCurrency(v: string): string {
  const d = onlyDigits(v).slice(0, 8);
  if (!d) return "";
  const cents = d.padStart(3, "0");
  const int = cents.slice(0, -2).replace(/^0+(?=\d)/, "");
  return `${int.replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${cents.slice(-2)}`;
}

export const currencyToNumber = (v: string | null | undefined): number | undefined => {
  const d = onlyDigits(v);
  return d ? Number(d) / 100 : undefined;
};

export const numberToCurrency = (n: number | undefined | null): string =>
  n == null ? "" : maskCurrency(String(Math.round(n * 100)));

export const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: n % 1 ? 2 : 0 });

export type MaskName = "phone" | "crp" | "currency";

export const MASKS: Record<MaskName, (v: string) => string> = {
  phone: maskPhone,
  crp: maskCrp,
  currency: maskCurrency,
};
