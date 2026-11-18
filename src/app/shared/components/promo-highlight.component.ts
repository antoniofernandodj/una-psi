import { Component, Input } from "@angular/core";
import { PsychologistProfile } from "../../core/models";

/** Destaque da promoção do psicólogo. Só renderiza se a promoção estiver ligada e tiver política. */
@Component({
  selector: "app-promo-highlight",
  template: `
    <div
      *ngIf="active"
      class="flex items-start gap-2.5 rounded-xl bg-secondary-container/60 ring-1 ring-secondary/40 text-on-secondary-container"
      [class]="compact ? 'px-3 py-2' : 'px-4 py-3'"
      role="note"
      aria-label="Promoção"
    >
      <span class="shrink-0 grid place-items-center rounded-full bg-secondary text-on-secondary" [class]="compact ? 'w-7 h-7' : 'w-9 h-9'">
        <app-icon name="local_offer" [fill]="true" [size]="compact ? 16 : 20"></app-icon>
      </span>
      <div class="min-w-0">
        <span class="block text-label-sm uppercase tracking-wide font-bold text-secondary">Promoção</span>
        <p class="text-body-sm text-on-surface whitespace-pre-line" [class.line-clamp-2]="compact">{{ profile.promoPolicy }}</p>
      </div>
    </div>
  `,
})
export class PromoHighlightComponent {
  @Input() profile!: PsychologistProfile;
  /** versão reduzida para o card da listagem (Master) */
  @Input() compact = false;

  get active() { return !!this.profile?.promoActive && !!this.profile.promoPolicy?.trim(); }
}
