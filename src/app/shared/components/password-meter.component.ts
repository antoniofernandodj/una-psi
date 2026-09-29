import { Component, Input } from "@angular/core";
import { passwordStrength } from "../../core/utils/validators";

@Component({
  selector: "app-password-meter",
  template: `
    <div class="mt-2 space-y-1">
      <div class="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
        <div class="h-full rounded-full transition-all duration-300" [class]="colors[strength.score]" [style.width.%]="value ? (strength.score + 1) * 25 : 0"></div>
      </div>
      <div class="flex justify-between text-label-sm text-on-surface-variant">
        <span>Força: {{ value ? strength.label : "digite uma senha" }}</span>
        <span class="text-outline">8+ caracteres, letras e números</span>
      </div>
    </div>
  `,
})
export class PasswordMeterComponent {
  @Input() value = "";
  colors = ["bg-error", "bg-amber-500", "bg-secondary", "bg-tertiary-container"];
  get strength() { return passwordStrength(this.value ?? ""); }
}
