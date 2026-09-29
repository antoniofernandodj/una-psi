import { Component, Optional, Self } from "@angular/core";
import { NgControl } from "@angular/forms";
import { FormControlBase } from "./form-control-base";

@Component({
  selector: "app-checkbox",
  template: `
    <label class="flex items-start gap-3 text-body-sm text-on-surface-variant cursor-pointer">
      <input
        type="checkbox"
        class="mt-0.5 w-4 h-4 rounded accent-secondary"
        [checked]="!!value"
        [disabled]="disabled"
        (change)="update($any($event.target).checked)"
        (blur)="touch()"
      />
      <span><ng-content></ng-content></span>
    </label>
    <p *ngIf="error" class="text-label-sm text-error mt-1">{{ error }}</p>
  `,
})
export class CheckboxComponent extends FormControlBase<boolean> {
  constructor(@Self() @Optional() ngControl: NgControl | null) { super(ngControl); }
}
