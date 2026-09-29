import { Component, Input } from "@angular/core";

@Component({
  selector: "app-empty-state",
  template: `
    <div class="flex flex-col items-center text-center gap-2 py-12 px-6 text-on-surface-variant">
      <span class="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-secondary">
        <app-icon [name]="icon" [size]="28"></app-icon>
      </span>
      <p class="text-title-md text-on-surface">{{ title }}</p>
      <p *ngIf="text" class="text-body-sm max-w-sm">{{ text }}</p>
      <ng-content></ng-content>
    </div>
  `,
})
export class EmptyStateComponent {
  @Input() icon = "search_off";
  @Input() title = "";
  @Input() text?: string;
}
