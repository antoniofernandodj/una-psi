import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { onlyDigits } from "./masks";

export const phoneValidator: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
  const len = onlyDigits(c.value).length;
  return !len || len === 10 || len === 11 ? null : { phone: true };
};

export const crpValidator: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
  const d = onlyDigits(c.value);
  return !d || (d.length >= 6 && d.length <= 8) ? null : { crp: true };
};

export const strongPassword: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
  const v: string = c.value ?? "";
  return !v || (v.length >= 8 && /[A-Za-z]/.test(v) && /\d/.test(v)) ? null : { weakPassword: true };
};

export function matchesControl(other: string): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null =>
    c.parent && c.value !== c.parent.get(other)?.value ? { mismatch: true } : null;
}

export function maxItems(max: number): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null =>
    Array.isArray(c.value) && c.value.length > max ? { maxItems: { max } } : null;
}

export const passwordStrength = (v: string): { score: number; label: string } => {
  let score = 0;
  if (v.length >= 8) score++;
  if (/[A-Za-z]/.test(v) && /\d/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v) || v.length >= 12) score++;
  return { score, label: ["Muito fraca", "Fraca", "Boa", "Forte"][score] };
};
