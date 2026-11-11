import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { EMPTY_FILTERS, PsychologistFilters } from "../../core/services/psychologists.service";

@Component({
  selector: "app-psychologist-filters",
  template: `
    <app-card>
      <form [formGroup]="form" (ngSubmit)="apply()" class="space-y-4">
        <app-input formControlName="search" type="search" icon="search" placeholder="Buscar por nome, queixa ou abordagem..."></app-input>
        <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
          <app-checkbox formControlName="includeNoFee">
            Mostrar também psicólogos sem valor informado (valor social / a combinar)
          </app-checkbox>
          <app-checkbox formControlName="hideFullAgenda">Ocultar agenda lotada</app-checkbox>
        </div>
        <div class="flex flex-wrap items-center justify-end gap-3">
          <app-button variant="ghost" size="sm" icon="filter_alt_off" (click)="reset()">Limpar filtros</app-button>
          <app-button type="submit" icon="filter_alt">Aplicar filtros</app-button>
        </div>
      </form>
    </app-card>
  `,
})
export class PsychologistFiltersComponent {
  @Output() filtersChange = new EventEmitter<PsychologistFilters>();

  form = this.fb.group({
    search: [""],
    includeNoFee: [true],
    hideFullAgenda: [false],
  });

  constructor(private fb: FormBuilder) {}

  /** Os filtros só são aplicados ao clicar em "Aplicar filtros" (ou Enter). */
  apply() {
    const v = this.form.value;
    this.filtersChange.emit({
      search: v.search ?? "",
      // especialidade, abordagem e valor são tratados no painel de compatibilidade
      specialtyId: "",
      approachId: "",
      minFee: null,
      maxFee: null,
      includeNoFee: !!v.includeNoFee,
      hideFullAgenda: !!v.hideFullAgenda,
    });
  }

  reset() {
    this.form.reset({ search: "", includeNoFee: EMPTY_FILTERS.includeNoFee, hideFullAgenda: false });
    this.apply();
  }
}
