const HOUR = 3_600_000;
const DAY = 24 * HOUR;

export type ActivityTone = "active" | "recent" | "away";

/** "Ativo hoje", "Ativo há 5 dias"... a partir do último acesso. */
export function lastSeenInfo(iso?: string, now = Date.now()): { label: string; tone: ActivityTone } | null {
  if (!iso) return null;
  const days = Math.floor((now - Date.parse(iso)) / DAY);
  if (days < 1) return { label: "Ativo hoje", tone: "active" };
  if (days === 1) return { label: "Ativo ontem", tone: "active" };
  if (days <= 7) return { label: `Ativo há ${days} dias`, tone: "recent" };
  if (days <= 30) return { label: `Ativo há ${days} dias`, tone: "away" };
  return { label: "Inativo há mais de 30 dias", tone: "away" };
}

/** "Costuma responder em ~2h". */
export function responseTimeLabel(ms?: number): string | null {
  if (ms == null) return null;
  if (ms < HOUR) return "Costuma responder em menos de 1h";
  if (ms < DAY) return `Costuma responder em ~${Math.round(ms / HOUR)}h`;
  const d = Math.round(ms / DAY);
  return `Costuma responder em ~${d} ${d === 1 ? "dia" : "dias"}`;
}

export const ACTIVITY_DOT: Record<ActivityTone, string> = {
  active: "bg-emerald-500",
  recent: "bg-amber-400",
  away: "bg-outline",
};
