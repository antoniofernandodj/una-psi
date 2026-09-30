import { Component } from "@angular/core";
import { Theme, ThemeService } from "../../core/services/theme.service";

@Component({
  selector: "app-theme-toggle",
  template: `
    <div class="inline-flex items-center gap-1 p-1 rounded-full bg-surface-container-lowest shadow-lg ring-1 ring-outline-variant/40" role="group" aria-label="Tema de cores">
      <button
        *ngFor="let o of options"
        type="button"
        class="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full text-label-md transition-colors"
        [class]="(theme.theme$ | async) === o.id ? 'bg-inverse-surface text-inverse-on-surface' : 'text-on-surface-variant hover:bg-surface-container'"
        [attr.aria-pressed]="(theme.theme$ | async) === o.id"
        (click)="theme.set(o.id)"
      >
        <span class="w-4 h-4 rounded-full ring-2 ring-white shadow" [style.background]="o.color"></span>{{ o.label }}
      </button>
    </div>
  `,
})
export class ThemeToggleComponent {
  options: { id: Theme; label: string; color: string }[] = [
    { id: "una", label: "Una", color: "linear-gradient(135deg,#152A40 50%,#DE7F69 50%)" },
    { id: "rose", label: "Rosa", color: "#be185d" },
    { id: "blue", label: "Azul", color: "#1da1f2" },
  ];
  constructor(public theme: ThemeService) {}
}
