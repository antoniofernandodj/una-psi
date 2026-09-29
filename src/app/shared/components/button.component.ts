import { Component, HostBinding, Input } from "@angular/core";

export type ButtonVariant = "primary" | "secondary" | "tonal" | "ghost" | "danger" | "whatsapp";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-primary-container text-on-primary hover:bg-primary shadow-sm",
  secondary: "bg-secondary text-on-secondary hover:bg-secondary-container shadow-sm",
  tonal: "bg-surface-container text-on-surface hover:bg-surface-container-high",
  ghost: "text-on-surface-variant hover:bg-surface-container",
  danger: "bg-error-container text-on-error-container hover:bg-error hover:text-on-error",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#1ebe5b] shadow-sm",
};

@Component({
  selector: "app-button",
  template: `
    <ng-template #content>
      <app-icon *ngIf="icon" [name]="icon" [size]="size === 'sm' ? 18 : 20"></app-icon>
      <ng-content></ng-content>
    </ng-template>

    <a *ngIf="href" [class]="classes" [href]="href" target="_blank" rel="noopener noreferrer">
      <ng-container *ngTemplateOutlet="content"></ng-container>
    </a>
    <a *ngIf="link" [class]="classes" [routerLink]="link" [queryParams]="queryParams">
      <ng-container *ngTemplateOutlet="content"></ng-container>
    </a>
    <button *ngIf="!href && !link" [class]="classes" [type]="type" [disabled]="disabled">
      <ng-container *ngTemplateOutlet="content"></ng-container>
    </button>
  `,
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = "primary";
  @Input() size: "sm" | "md" | "lg" = "md";
  @Input() icon?: string;
  @Input() type: "button" | "submit" = "button";
  @Input() disabled = false;
  @Input() href?: string;
  @Input() link?: string | any[];
  @Input() queryParams?: Record<string, string>;
  @Input() block = false;

  @HostBinding("class.block") get hostBlock() { return this.block; }
  @HostBinding("class.inline-block") get hostInline() { return !this.block; }

  get classes(): string {
    const sizes = { sm: "px-3 py-1.5 text-label-md", md: "px-5 py-2.5 text-label-lg", lg: "px-6 py-3.5 text-label-lg" };
    return [
      "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary disabled:opacity-50 disabled:pointer-events-none",
      sizes[this.size],
      VARIANTS[this.variant],
      this.block ? "w-full" : "",
    ].join(" ");
  }
}
