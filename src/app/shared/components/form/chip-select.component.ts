import { Component, Input, Optional, Self } from "@angular/core";
import { NgControl } from "@angular/forms";
import { SelectOption } from "../../../core/models";
import { FormControlBase } from "./form-control-base";

/** Seleção múltipla em chips, com limite opcional. */
@Component({
  selector: "app-chip-select",
  template: `
    <app-field [label]="label" [hint]="hint" [error]="error" [required]="isRequired">
      <div class="flex flex-wrap gap-2">
        <app-chip
          *ngFor="let o of shown"
          [interactive]="true"
          [selected]="has(o.value)"
          [disabled]="!has(o.value) && atLimit"
          (click)="toggle(o.value)"
          >{{ o.label }}</app-chip
        >
      </div>
      <app-button *ngIf="hidden > 0" class="inline-block mt-2" variant="ghost" size="sm" icon="add" (click)="visible = visible + pageSize">
        Mais opções ({{ hidden }})
      </app-button>
      <p *ngIf="max" class="text-label-sm text-on-surface-variant mt-2">{{ (value || []).length }} / {{ max }} selecionadas</p>
    </app-field>
  `,
})
export class ChipSelectComponent extends FormControlBase<string[]> {
  @Input() options: SelectOption[] = [];
  @Input() max?: number;
  /** quantidade de opções exibidas por vez; "Mais opções" revela mais {pageSize} */
  readonly pageSize = 6;
  visible = 6;
  constructor(@Self() @Optional() ngControl: NgControl | null) { super(ngControl); }

  /** As primeiras opções (ordem do catálogo) + qualquer uma já selecionada, para nunca esconder uma escolha. */
  get shown() { return this.options.filter((o, i) => i < this.visible || this.has(o.value)); }
  get hidden() { return this.options.length - this.shown.length; }
  get atLimit() { return !!this.max && (this.value?.length ?? 0) >= this.max; }
  has(v: string) { return !!this.value?.includes(v); }

  toggle(v: string) {
    const current = this.value ?? [];
    if (!this.has(v) && this.atLimit) return;
    this.update(this.has(v) ? current.filter((x) => x !== v) : [...current, v]);
    this.touch();
  }
}
