import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PsychologistProfile } from "../models";
import { currencyToNumber, numberToCurrency } from "./masks";
import { crpValidator, maxItems, requiredIf } from "./validators";

export const MAX_APPROACHES = 3;
export const MAX_PROMO_POLICY = 280;
export const SOCIAL_KEYS = ["whatsapp", "instagram", "facebook", "linkedin", "youtube", "substack", "others"] as const;

/** FormGroup compartilhado entre o cadastro e o painel do psicólogo. */
export function buildProfileGroup(fb: FormBuilder, p?: Partial<PsychologistProfile>): FormGroup {
  const group = fb.group({
    photo: [p?.photo],
    cover: [p?.cover],
    crp: [p?.crp ?? "", [Validators.required, crpValidator]],
    sessionFee: [numberToCurrency(p?.sessionFee)],
    agendaFull: [p?.agendaFull ?? false],
    promoActive: [p?.promoActive ?? false],
    promoPolicy: [p?.promoPolicy ?? "", [requiredIf("promoActive"), Validators.maxLength(MAX_PROMO_POLICY)]],
    approachIds: [p?.approachIds ?? [], [Validators.required, maxItems(MAX_APPROACHES)]],
    specialtyIds: [p?.specialtyIds ?? [], [Validators.required]],
    bio: [p?.bio ?? "", [Validators.maxLength(600)]],
    ...Object.fromEntries(SOCIAL_KEYS.map((k) => [k, [p?.[k] ?? ""]])),
  });
  const policy = group.get("promoPolicy")!;
  group.get("promoActive")!.valueChanges.subscribe(() => policy.updateValueAndValidity());
  return group;
}

export function profileFromGroup(group: FormGroup): Omit<PsychologistProfile, "id"> {
  const v = group.getRawValue();
  const profile: Omit<PsychologistProfile, "id"> = {
    photo: v.photo || undefined,
    cover: v.cover || undefined,
    crp: v.crp,
    sessionFee: currencyToNumber(v.sessionFee),
    agendaFull: !!v.agendaFull,
    promoActive: !!v.promoActive && !!v.promoPolicy?.trim(),
    promoPolicy: v.promoPolicy?.trim() || undefined,
    approachIds: v.approachIds,
    specialtyIds: v.specialtyIds,
    bio: v.bio?.trim() || undefined,
  };
  SOCIAL_KEYS.forEach((k) => (profile[k] = v[k]?.trim() || undefined));
  return profile;
}
