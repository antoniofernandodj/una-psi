import { Component, Input, Optional, Self } from "@angular/core";
import { NgControl } from "@angular/forms";
import { SelectOption } from "../../../core/models";
import { FormControlBase } from "./form-control-base";

/** Busca em um catálogo grande e seleciona itens como tags removíveis. */
@Component({
  selector: "app-tag-picker",
  template: `
    <app-field [label]="label" [hint]="hint" [error]="error" [required]="isRequired">
      <div class="relative mb-3">
        <app-icon name="search" [size]="20" class="absolute left-3.5 top-3.5 text-outline"></app-icon>
        <input
          type="search"
          [placeholder]="placeholder"
          [(ngModel)]="query"
          [ngModelOptions]="{ standalone: true }"
          class="w-full pl-11 pr-4 py-3 bg-surface-container-lowest text-body-md rounded-xl shadow-sm ring-1 ring-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>

      <div *ngIf="selected.length" class="mb-3">
        <p class="text-label-sm text-on-surface-variant mb-1.5">Selecionadas:</p>
        <div class="flex flex-wrap gap-2">
          <app-chip *ngFor="let o of selected" [selected]="true" [removable]="true" (removed)="remove(o.value)">{{ o.label }}</app-chip>
        </div>
      </div>

      <div class="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
        <app-chip *ngFor="let o of available" [interactive]="true" (click)="add(o.value)">+ {{ o.label }}</app-chip>
        <p *ngIf="!available.length" class="text-body-sm text-on-surface-variant">Nenhum resultado.</p>
      </div>
    </app-field>
  `,
})
export class TagPickerComponent extends FormControlBase<string[]> {
  @Input() options: SelectOption[] = [];
  @Input() placeholder = "Buscar...";
  query = "";
  constructor(@Self() @Optional() ngControl: NgControl | null) { super(ngControl); }

  private norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  get selected() { return this.options.filter((o) => this.value?.includes(o.value)); }
  get available() {
    const q = this.norm(this.query);
    return this.options.filter((o) => !this.value?.includes(o.value) && this.norm(o.label).includes(q)).slice(0, 40);
  }

  add(v: string) { this.update([...(this.value ?? []), v]); this.touch(); }
  remove(v: string) { this.update((this.value ?? []).filter((x) => x !== v)); this.touch(); }
}
