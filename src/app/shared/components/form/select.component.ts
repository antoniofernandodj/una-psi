import { Component, Input, Optional, Self } from "@angular/core";
import { NgControl } from "@angular/forms";
import { SelectOption } from "../../../core/models";
import { FormControlBase } from "./form-control-base";

@Component({
  selector: "app-select",
  template: `
    <app-field [label]="label" [hint]="hint" [error]="error" [required]="isRequired" [for]="id">
      <div class="relative">
        <select
          [id]="id"
          [disabled]="disabled"
          (change)="update($any($event.target).value)"
          (blur)="touch()"
          class="w-full appearance-none pl-3.5 pr-10 py-3 bg-surface-container-lowest text-on-surface text-body-md rounded-xl shadow-sm ring-1 ring-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-secondary"
        >
          <option *ngIf="placeholder" value="" [selected]="!value">{{ placeholder }}</option>
          <option *ngFor="let o of options" [value]="o.value" [selected]="o.value === value">{{ o.label }}</option>
        </select>
        <app-icon name="expand_more" class="absolute right-3 top-3.5 text-outline pointer-events-none"></app-icon>
      </div>
    </app-field>
  `,
})
export class SelectComponent extends FormControlBase<string> {
  @Input() options: SelectOption[] = [];
  @Input() placeholder = "";
  constructor(@Self() @Optional() ngControl: NgControl | null) { super(ngControl); }
}
