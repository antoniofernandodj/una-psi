import { Component, Input } from "@angular/core";
import { ACTIVITY_DOT, lastSeenInfo, responseTimeLabel } from "../../core/utils/activity";

/** Último acesso e tempo médio de resposta do profissional. */
@Component({
  selector: "app-activity-info",
  template: `
    <div *ngIf="seen || response" class="flex flex-wrap gap-x-3 gap-y-0.5 text-label-sm text-on-surface-variant">
      <span *ngIf="seen" class="inline-flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full" [class]="dot[seen.tone]"></span>{{ seen.label }}
      </span>
      <span *ngIf="response" class="inline-flex items-center gap-1">
        <app-icon name="schedule" [size]="14"></app-icon>{{ response }}
      </span>
    </div>
  `,
})
export class ActivityInfoComponent {
  @Input() lastSeenAt?: string;
  @Input() responseMs?: number;
  dot = ACTIVITY_DOT;
  get seen() { return lastSeenInfo(this.lastSeenAt); }
  get response() { return responseTimeLabel(this.responseMs); }
}
