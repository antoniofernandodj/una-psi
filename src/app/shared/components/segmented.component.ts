import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SelectOption } from "../../core/models";

export interface SegmentOption extends SelectOption {
  icon?: string;
}

@Component({
  selector: "app-segmented",
  template: `
    <div class="inline-flex p-1.5 rounded-full bg-surface-container shadow-inner">
      <button
        *ngFor="let o of options"
        type="button"
        class="px-5 sm:px-6 py-2.5 rounded-full text-label-lg transition-all flex items-center gap-2"
        [class]="o.value === value ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'"
        (click)="valueChange.emit(o.value)"
      >
        <app-icon *ngIf="o.icon" [name]="o.icon" [fill]="o.value === value" [size]="20"></app-icon>
        {{ o.label }}
      </button>
    </div>
  `,
})
export class SegmentedComponent {
  @Input() options: SegmentOption[] = [];
  @Input() value = "";
  @Output() valueChange = new EventEmitter<string>();
}
