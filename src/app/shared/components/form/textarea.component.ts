import { Component, Input, Optional, Self } from "@angular/core";
import { NgControl } from "@angular/forms";
import { FormControlBase } from "./form-control-base";

@Component({
  selector: "app-textarea",
  template: `
    <app-field [label]="label" [hint]="hint" [error]="error" [required]="isRequired" [for]="id">
      <span fieldAside *ngIf="maxlength" class="text-label-sm text-on-surface-variant">{{ (value || "").length }} / {{ maxlength }}</span>
      <textarea
        [id]="id"
        [rows]="rows"
        [placeholder]="placeholder"
        [attr.maxlength]="maxlength"
        [disabled]="disabled"
        [value]="value || ''"
        (input)="update($any($event.target).value)"
        (blur)="touch()"
        class="w-full px-3.5 py-3 bg-surface-container-lowest text-on-surface text-body-md rounded-xl shadow-sm ring-1 focus:outline-none focus:ring-2 focus:ring-secondary placeholder:text-outline-variant resize-y"
        [class]="error ? 'ring-error' : 'ring-outline-variant/40'"
      ></textarea>
    </app-field>
  `,
})
export class TextareaComponent extends FormControlBase<string> {
  @Input() rows = 3;
  @Input() maxlength?: number;
  @Input() placeholder = "";
  constructor(@Self() @Optional() ngControl: NgControl | null) { super(ngControl); }
}
