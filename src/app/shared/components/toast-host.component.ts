import { Component } from "@angular/core";
import { ToastService } from "../../core/services/toast.service";

@Component({
  selector: "app-toast-host",
  template: `
    <div class="fixed bottom-6 right-6 z-[60] flex flex-col gap-2" aria-live="polite">
      <div
        *ngFor="let t of toast.toasts$ | async"
        class="flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl text-label-lg"
        [class]="t.tone === 'success' ? 'bg-inverse-surface text-inverse-on-surface' : 'bg-error text-on-error'"
      >
        <app-icon [name]="t.tone === 'success' ? 'check_circle' : 'error'" [fill]="true" class="text-tertiary-fixed-dim"></app-icon>
        {{ t.text }}
      </div>
    </div>
  `,
})
export class ToastHostComponent {
  constructor(public toast: ToastService) {}
}
