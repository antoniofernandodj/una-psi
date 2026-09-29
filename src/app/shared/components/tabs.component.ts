import { Component, EventEmitter, Input, Output } from "@angular/core";

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  badge?: string | number;
}

@Component({
  selector: "app-tabs",
  template: `
    <div role="tablist" class="inline-flex flex-wrap gap-1 p-1 rounded-2xl bg-surface-container">
      <button
        *ngFor="let tab of tabs"
        type="button"
        role="tab"
        class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-label-lg transition-all"
        [class]="tab.id === active ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'"
        [attr.aria-selected]="tab.id === active"
        (click)="activeChange.emit(tab.id)"
      >
        <app-icon *ngIf="tab.icon" [name]="tab.icon" [fill]="tab.id === active" [size]="20"></app-icon>
        <span>{{ tab.label }}</span>
        <span
          *ngIf="tab.badge !== undefined"
          class="px-2 py-0.5 rounded-full text-label-sm"
          [class]="tab.id === active ? 'bg-primary-fixed text-primary' : 'bg-surface-container-high text-on-surface-variant'"
          >{{ tab.badge }}</span
        >
      </button>
    </div>
  `,
})
export class TabsComponent {
  @Input() tabs: TabItem[] = [];
  @Input() active = "";
  @Output() activeChange = new EventEmitter<string>();
}
