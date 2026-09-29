import { Component, EventEmitter, HostListener, Input, Output } from "@angular/core";

@Component({
  selector: "app-modal",
  template: `
    <div *ngIf="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-inverse-surface/50 backdrop-blur-sm" (click)="closed.emit()"></div>
      <div
        role="dialog"
        aria-modal="true"
        class="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-surface-container-lowest rounded-2xl shadow-xl p-6"
      >
        <div class="flex items-center justify-between mb-5">
          <div class="flex items-center gap-2">
            <app-icon *ngIf="icon" [name]="icon" class="text-primary"></app-icon>
            <h3 class="text-headline-sm">{{ title }}</h3>
          </div>
          <button type="button" class="text-outline hover:text-on-surface" aria-label="Fechar" (click)="closed.emit()">
            <app-icon name="close"></app-icon>
          </button>
        </div>
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class ModalComponent {
  @Input() open = false;
  @Input() title = "";
  @Input() icon?: string;
  @Output() closed = new EventEmitter<void>();

  @HostListener("document:keydown.escape")
  onEscape() { if (this.open) this.closed.emit(); }
}
