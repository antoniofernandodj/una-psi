import { Component, Input, Optional, Self } from "@angular/core";
import { NgControl } from "@angular/forms";
import { MASKS, MaskName } from "../../../core/utils/masks";
import { FormControlBase } from "./form-control-base";

@Component({
  selector: "app-input",
  template: `
    <app-field [label]="label" [hint]="hint" [error]="error" [required]="isRequired" [for]="id">
      <div class="relative">
        <app-brand-icon *ngIf="brand" [name]="brand" [size]="20" class="absolute left-3.5 top-3.5"></app-brand-icon>
        <app-icon *ngIf="icon" [name]="icon" [size]="20" class="absolute left-3.5 top-3.5 text-outline"></app-icon>
        <span *ngIf="prefix" class="absolute left-3.5 top-3 text-on-surface-variant text-label-md">{{ prefix }}</span>
        <input
          [id]="id"
          [type]="type === 'password' && showPassword ? 'text' : type"
          [placeholder]="placeholder"
          [attr.maxlength]="maxlength"
          [attr.autocomplete]="autocomplete"
          [disabled]="disabled"
          [value]="value || ''"
          (input)="onInput($event)"
          (blur)="touch()"
          class="w-full py-3 bg-surface-container-lowest text-on-surface text-body-md rounded-xl shadow-sm ring-1 focus:outline-none focus:ring-2 focus:ring-secondary placeholder:text-outline-variant disabled:opacity-60"
          [class]="(icon || brand ? 'pl-11 ' : prefix ? 'pl-10 ' : 'pl-3.5 ') + (type === 'password' ? 'pr-11 ' : 'pr-4 ') + (error ? 'ring-error' : 'ring-outline-variant/40')"
        />
        <button
          *ngIf="type === 'password'"
          type="button"
          class="absolute right-3.5 top-3.5 text-outline hover:text-on-surface"
          [attr.aria-label]="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
          (click)="showPassword = !showPassword"
        >
          <app-icon [name]="showPassword ? 'visibility_off' : 'visibility'" [size]="20"></app-icon>
        </button>
      </div>
      <ng-content></ng-content>
    </app-field>
  `,
})
export class InputComponent extends FormControlBase<string> {
  @Input() type: "text" | "email" | "password" | "tel" | "search" = "text";
  @Input() placeholder = "";
  @Input() icon?: string;
  /** logotipo de marca (ver app-brand-icon) no lugar do ícone */
  @Input() brand?: string;
  @Input() prefix?: string;
  @Input() mask?: MaskName;
  @Input() maxlength?: number;
  @Input() autocomplete?: string;
  showPassword = false;

  constructor(@Self() @Optional() ngControl: NgControl | null) { super(ngControl); }

  onInput(e: Event): void {
    const el = e.target as HTMLInputElement;
    const v = this.mask ? MASKS[this.mask](el.value) : el.value;
    if (v !== el.value) el.value = v;
    this.update(v);
  }
}
