import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Approach, Specialty } from "../../core/models";
import { SPECIALTY_CATEGORIES } from "../../core/services/seed-data";

export type TaxonomyItem = Partial<Approach> & Partial<Specialty>;

/** Modal único de cadastro/edição para abordagens e especialidades. */
@Component({
  selector: "app-taxonomy-form-modal",
  template: `
    <app-modal [open]="open" [title]="title" [icon]="kind === 'specialty' ? 'category' : 'psychology'" (closed)="closed.emit()">
      <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-4">
        <app-input formControlName="name" [label]="kind === 'specialty' ? 'Nome da especialidade / queixa clínica' : 'Nome da abordagem'" [placeholder]="kind === 'specialty' ? 'Ex: Síndrome do Impostor' : 'Ex: Terapia do Esquema'"></app-input>

        <ng-container *ngIf="kind === 'specialty'; else approachFields">
          <app-select formControlName="category" label="Categoria" [options]="categories"></app-select>
          <app-input formControlName="keywords" label="Palavras-chave de indexação" hint="Separadas por vírgula." placeholder="ansiedade, insegurança profissional"></app-input>
        </ng-container>
        <ng-template #approachFields>
          <app-textarea formControlName="description" label="Descrição" [rows]="3" placeholder="Breve descrição da linha teórica"></app-textarea>
        </ng-template>

        <app-checkbox formControlName="active">Ativa para seleção por psicólogos e busca de pacientes</app-checkbox>

        <div class="flex justify-end gap-3 pt-2">
          <app-button variant="tonal" (click)="closed.emit()">Cancelar</app-button>
          <app-button type="submit" icon="save">Salvar</app-button>
        </div>
      </form>
    </app-modal>
  `,
})
export class TaxonomyFormModalComponent {
  @Input() kind: "specialty" | "approach" = "specialty";
  @Input() open = false;
  @Input() set item(i: TaxonomyItem | null) {
    this.current = i;
    this.form.reset({
      name: i?.name ?? "",
      category: i?.category ?? this.categories[0].value,
      keywords: i?.keywords?.join(", ") ?? "",
      description: i?.description ?? "",
      active: i?.active ?? true,
    });
  }
  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<TaxonomyItem>();

  current: TaxonomyItem | null = null;
  categories = SPECIALTY_CATEGORIES.map((c) => ({ value: c, label: c }));

  form = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    category: [this.categories[0].value],
    keywords: [""],
    description: [""],
    active: [true],
  });

  get title() {
    const noun = this.kind === "specialty" ? "especialidade" : "abordagem";
    return `${this.current?.id ? "Editar" : "Nova"} ${noun}`;
  }

  constructor(private fb: FormBuilder) {}

  submit() {
    if (this.form.invalid) return this.form.markAllAsTouched();
    const v = this.form.getRawValue();
    const base = { id: this.current?.id, name: v.name!.trim(), active: !!v.active };
    this.saved.emit(
      this.kind === "specialty"
        ? {
            ...base,
            category: v.category!,
            keywords: (v.keywords ?? "").split(",").map((k) => k.trim()).filter(Boolean),
          }
        : { ...base, description: (v.description ?? "").trim() },
    );
  }
}
