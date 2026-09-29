import { Component, Input } from "@angular/core";
import { Tone, TONE_CLASSES } from "./badge.component";

@Component({
  selector: "app-stat-card",
  template: `
    <app-card>
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-label-md text-on-surface-variant">{{ label }}</p>
          <p class="text-headline-md text-on-surface mt-1">{{ value }}</p>
          <p *ngIf="hint" class="text-label-sm text-on-surface-variant mt-1">{{ hint }}</p>
        </div>
        <span class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" [class]="toneClass">
          <app-icon [name]="icon"></app-icon>
        </span>
      </div>
    </app-card>
  `,
})
export class StatCardComponent {
  @Input() label = "";
  @Input() value: string | number = "";
  @Input() icon = "insights";
  @Input() hint?: string;
  @Input() tone: Tone = "secondary";
  get toneClass() { return TONE_CLASSES[this.tone]; }
}
