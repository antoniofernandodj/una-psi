import { Component, Input } from "@angular/core";

@Component({
  selector: "app-card",
  template: `<div
    class="bg-surface-container-lowest rounded-2xl shadow-sm"
    [class]="padding ? 'p-5 sm:p-6' : ''"
    [class.ring-2]="highlight"
    [class.ring-secondary]="highlight"
  >
    <ng-content></ng-content>
  </div>`,
  styles: [":host { display: block; }"],
})
export class CardComponent {
  @Input() padding = true;
  @Input() highlight = false;
}
