import { Component, Input } from "@angular/core";

export type Tone = "neutral" | "primary" | "secondary" | "tertiary" | "error" | "warning";

export const TONE_CLASSES: Record<Tone, string> = {
  neutral: "bg-surface-container text-on-surface-variant",
  primary: "bg-primary-fixed text-on-primary-fixed",
  secondary: "bg-secondary-fixed text-on-secondary-fixed",
  tertiary: "bg-tertiary-fixed text-on-tertiary-fixed",
  error: "bg-error-container text-on-error-container",
  warning: "bg-amber-100 text-amber-900",
};

@Component({
  selector: "app-badge",
  template: `<span
    class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm whitespace-nowrap"
    [class]="toneClass"
  >
    <app-icon *ngIf="icon" [name]="icon" [fill]="true" [size]="14"></app-icon>
    <ng-content></ng-content>
  </span>`,
})
export class BadgeComponent {
  @Input() tone: Tone = "neutral";
  @Input() icon?: string;
  get toneClass() { return TONE_CLASSES[this.tone]; }
}
