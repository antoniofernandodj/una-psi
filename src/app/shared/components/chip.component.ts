import { Component, EventEmitter, Input, Output } from "@angular/core";

export type ChipTone = "dark" | "primary" | "secondary" | "tertiary" | "neutral";

/** Seleção em cor sólida (alto contraste), usada nos filtros de status. */
const SOLID: Record<ChipTone, string> = {
  dark: "bg-inverse-surface text-inverse-on-surface",
  primary: "bg-primary text-on-primary",
  secondary: "bg-secondary text-on-secondary",
  tertiary: "bg-tertiary text-on-tertiary",
  neutral: "bg-on-surface-variant text-on-primary",
};

@Component({
  selector: "app-chip",
  template: `
    <button
      *ngIf="interactive; else staticChip"
      type="button"
      class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-label-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
      [class]="selected ? (tone ? SOLID[tone] + ' shadow' : 'bg-secondary-fixed text-on-secondary-fixed shadow-sm') : tone ? 'bg-surface-container-lowest text-on-surface ring-1 ring-outline-variant hover:bg-surface-container' : 'bg-surface-container text-on-surface hover:bg-secondary-fixed'"
      [disabled]="disabled"
      [attr.aria-pressed]="selected"
    >
      <ng-container *ngTemplateOutlet="inner"></ng-container>
    </button>
    <ng-template #staticChip>
      <span
        class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-md"
        [class]="selected ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-surface-container text-on-surface-variant'"
      >
        <ng-container *ngTemplateOutlet="inner"></ng-container>
        <button *ngIf="removable" type="button" class="flex hover:text-error" aria-label="Remover" (click)="removed.emit()">
          <app-icon name="close" [size]="14"></app-icon>
        </button>
      </span>
    </ng-template>
    <ng-template #inner><ng-content></ng-content></ng-template>
  `,
})
export class ChipComponent {
  readonly SOLID = SOLID;
  @Input() tone?: ChipTone;
  @Input() selected = false;
  @Input() interactive = false;
  @Input() removable = false;
  @Input() disabled = false;
  @Output() removed = new EventEmitter<void>();
}
