import { PatientPreferences, PsychologistView } from "../models";

export type MatchLevel = "high" | "good" | "low";

export interface Compatibility {
  /** 0–100 */
  score: number;
  level: MatchLevel;
  label: string;
  emoji: string;
  /** critérios avaliados, para explicar a nota ao paciente */
  reasons: { ok: boolean | "partial"; text: string }[];
}

export const MATCH_META: Record<MatchLevel, { label: string; emoji: string; classes: string; bar: string }> = {
  high: { label: "Alta compatibilidade", emoji: "💚", classes: "bg-emerald-100 text-emerald-900", bar: "bg-emerald-500" },
  good: { label: "Boa compatibilidade", emoji: "💛", classes: "bg-amber-100 text-amber-900", bar: "bg-amber-400" },
  low: { label: "Compatibilidade parcial", emoji: "🤍", classes: "bg-surface-container text-on-surface-variant", bar: "bg-outline" },
};

const WEIGHTS = { specialties: 55, approaches: 25, fee: 20 };

export function hasPreferences(p: Partial<PatientPreferences> | null | undefined): boolean {
  return !!p && (!!p.specialtyIds?.length || !!p.approachIds?.length || p.maxFee != null);
}

/** Calcula a compatibilidade usando apenas os critérios que o paciente informou. */
export function computeCompatibility(prefs: Partial<PatientPreferences> | null, view: PsychologistView): Compatibility | null {
  if (!hasPreferences(prefs)) return null;
  const { profile, specialties, approaches } = view;
  const reasons: Compatibility["reasons"] = [];
  let earned = 0;
  let total = 0;

  if (prefs!.specialtyIds?.length) {
    const wanted = prefs!.specialtyIds;
    const hit = wanted.filter((id) => profile.specialtyIds.includes(id));
    total += WEIGHTS.specialties;
    earned += WEIGHTS.specialties * (hit.length / wanted.length);
    const names = specialties.filter((s) => hit.includes(s.id)).map((s) => s.name);
    reasons.push({
      ok: hit.length === wanted.length ? true : hit.length ? "partial" : false,
      text: hit.length ? `Atende ${hit.length} de ${wanted.length} temas (${names.slice(0, 2).join(", ")}${names.length > 2 ? "…" : ""})` : "Não atende os temas escolhidos",
    });
  }

  if (prefs!.approachIds?.length) {
    const hit = prefs!.approachIds.filter((id) => profile.approachIds.includes(id));
    total += WEIGHTS.approaches;
    earned += hit.length ? WEIGHTS.approaches : 0;
    const names = approaches.filter((a) => hit.includes(a.id)).map((a) => a.name);
    reasons.push({ ok: hit.length > 0, text: hit.length ? `Abordagem de interesse: ${names.join(", ")}` : "Abordagem diferente da preferida" });
  }

  if (prefs!.maxFee != null) {
    const fee = profile.sessionFee;
    total += WEIGHTS.fee;
    if (fee == null) {
      earned += WEIGHTS.fee * 0.5;
      reasons.push({ ok: "partial", text: "Valor a combinar com o profissional" });
    } else if (fee <= prefs!.maxFee) {
      earned += WEIGHTS.fee;
      reasons.push({ ok: true, text: "Valor dentro do seu orçamento" });
    } else if (fee <= prefs!.maxFee * 1.15) {
      earned += WEIGHTS.fee * 0.5;
      reasons.push({ ok: "partial", text: "Valor um pouco acima do orçamento (até 15%)" });
    } else {
      reasons.push({ ok: false, text: "Valor acima do orçamento" });
    }
  }

  const score = Math.round((earned / total) * 100);
  const level: MatchLevel = score >= 75 ? "high" : score >= 50 ? "good" : "low";
  return { score, level, label: MATCH_META[level].label, emoji: MATCH_META[level].emoji, reasons };
}
