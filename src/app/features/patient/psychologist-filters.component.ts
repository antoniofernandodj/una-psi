import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { map } from "rxjs";
import { CatalogService } from "../../core/services/catalog.service";
import { EMPTY_FILTERS, PsychologistFilters } from "../../core/services/psychologists.service";
import { currencyToNumber } from "../../core/utils/masks";

@Component({
  selector: "app-psychologist-filters",
  template: `
    <app-card>
      <form [formGroup]="form" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
          <app-input class="lg:col-span-4" formControlName="search" type="search" icon="search" placeholder="Buscar por nome, queixa ou abordagem..."></app-input>
          <app-select class="lg:col-span-3" formControlName="specialtyId" placeholder="Especialidade (todas)" [options]="(specialtyOptions$ | async) ?? []"></app-select>
          <app-select class="lg:col-span-3" formControlName="approachId" placeholder="Abordagem (todas)" [options]="(approachOptions$ | async) ?? []"></app-select>
          <div class="lg:col-span-2 grid grid-cols-2 gap-2">
            <app-input formControlName="minFee" prefix="R$" mask="currency" placeholder="Mín." [maxlength]="9"></app-input>
            <app-input formControlName="maxFee" prefix="R$" mask="currency" placeholder="Máx." [maxlength]="9"></app-input>
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-3">
          <app-checkbox formControlName="includeNoFee">
            Mostrar também psicólogos sem valor informado (valor social / a combinar)
          </app-checkbox>
          <app-button variant="ghost" size="sm" icon="filter_alt_off" (click)="reset()">Limpar filtros</app-button>
        </div>
      </form>
    </app-card>
  `,
})
export class PsychologistFiltersComponent {
  @Output() filtersChange = new EventEmitter<PsychologistFilters>();

  form = this.fb.group({
    search: [""],
    specialtyId: [""],
    approachId: [""],
    minFee: [""],
    maxFee: [""],
    includeNoFee: [true],
  });

  specialtyOptions$ = this.catalog.activeSpecialties$.pipe(map((l) => l.map((s) => ({ value: s.id, label: s.name }))));
  approachOptions$ = this.catalog.activeApproaches$.pipe(map((l) => l.map((a) => ({ value: a.id, label: a.name }))));

  constructor(
    private fb: FormBuilder,
    private catalog: CatalogService,
  ) {
    this.form.valueChanges.subscribe((v) =>
      this.filtersChange.emit({
        search: v.search ?? "",
        specialtyId: v.specialtyId ?? "",
        approachId: v.approachId ?? "",
        minFee: currencyToNumber(v.minFee) ?? null,
        maxFee: currencyToNumber(v.maxFee) ?? null,
        includeNoFee: !!v.includeNoFee,
      }),
    );
  }

  reset() {
    this.form.reset({ search: "", specialtyId: "", approachId: "", minFee: "", maxFee: "", includeNoFee: EMPTY_FILTERS.includeNoFee });
  }
}
