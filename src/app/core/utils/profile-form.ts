import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PsychologistProfile } from "../models";
import { currencyToNumber, numberToCurrency } from "./masks";
import { crpValidator, maxItems } from "./validators";

export const MAX_APPROACHES = 3;
export const SOCIAL_KEYS = ["whatsapp", "instagram", "facebook", "linkedin", "youtube", "substack", "others"] as const;

/** FormGroup compartilhado entre o cadastro e o painel do psicólogo. */
export function buildProfileGroup(fb: FormBuilder, p?: Partial<PsychologistProfile>): FormGroup {
  return fb.group({
    photo: [p?.photo],
    crp: [p?.crp ?? "", [Validators.required, crpValidator]],
    sessionFee: [numberToCurrency(p?.sessionFee)],
    approachIds: [p?.approachIds ?? [], [Validators.required, maxItems(MAX_APPROACHES)]],
    specialtyIds: [p?.specialtyIds ?? [], [Validators.required]],
    bio: [p?.bio ?? "", [Validators.maxLength(600)]],
    ...Object.fromEntries(SOCIAL_KEYS.map((k) => [k, [p?.[k] ?? ""]])),
  });
}

export function profileFromGroup(group: FormGroup): Omit<PsychologistProfile, "id"> {
  const v = group.getRawValue();
  const profile: Omit<PsychologistProfile, "id"> = {
    photo: v.photo || undefined,
    crp: v.crp,
    sessionFee: currencyToNumber(v.sessionFee),
    approachIds: v.approachIds,
    specialtyIds: v.specialtyIds,
    bio: v.bio?.trim() || undefined,
  };
  SOCIAL_KEYS.forEach((k) => (profile[k] = v[k]?.trim() || undefined));
  return profile;
}
