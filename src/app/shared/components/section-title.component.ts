import { Component, Input } from "@angular/core";

@Component({
  selector: "app-section-title",
  template: `
    <div class="flex items-center gap-3" [class.mb-6]="spaced">
      <span
        *ngIf="step"
        class="flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm shrink-0"
        [class]="tone === 'secondary' ? 'bg-secondary-fixed text-secondary' : 'bg-primary-fixed text-primary'"
        >{{ step }}</span
      >
      <app-icon *ngIf="icon" [name]="icon" class="text-primary" [size]="22"></app-icon>
      <h2 class="text-headline-sm text-on-surface">{{ title }}</h2>
      <ng-content></ng-content>
    </div>
  `,
})
export class SectionTitleComponent {
  @Input() title = "";
  @Input() step?: number;
  @Input() icon?: string;
  @Input() tone: "primary" | "secondary" = "primary";
  @Input() spaced = true;
}
