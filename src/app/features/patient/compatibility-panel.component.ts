import { Component, EventEmitter, Input, OnDestroy, Output } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { map } from "rxjs";
import { Subscription } from "rxjs";
import { PatientPreferences } from "../../core/models";
import { CatalogService } from "../../core/services/catalog.service";
import { currencyToNumber, numberToCurrency } from "../../core/utils/masks";

export interface PreferencesChange {
  prefs: Omit<PatientPreferences, "id">;
  onlyCompatible: boolean;
}

/** Perfil de compatibilidade do paciente: o que ele procura, usado para pontuar cada psicólogo. */
@Component({
  selector: "app-compatibility-panel",
  template: `
    <app-card>
      <div class="flex items-start justify-between gap-3">
        <div>
          <h2 class="flex items-center gap-2 text-title-md"><span aria-hidden="true">💚</span> Seu perfil de compatibilidade</h2>
          <p class="text-body-sm text-on-surface-variant">
            Conte o que você procura e destacamos os profissionais mais alinhados:
            <span class="whitespace-nowrap">💚 alta</span> · <span class="whitespace-nowrap">💛 boa</span> · <span class="whitespace-nowrap">🤍 parcial</span>.
          </p>
        </div>
        <app-button variant="ghost" size="sm" [icon]="open ? 'expand_less' : 'expand_more'" (click)="open = !open">{{ open ? "Recolher" : "Filtros" }}</app-button>
      </div>

      <form *ngIf="open" [formGroup]="form" class="space-y-5 mt-5">
        <app-tag-picker formControlName="specialtyIds" label="O que você gostaria de trabalhar?" placeholder="Buscar tema (ex: Ansiedade, Luto...)" [options]="(specialtyOptions$ | async) ?? []"></app-tag-picker>
        <app-chip-select formControlName="approachIds" label="Abordagens de interesse (opcional)" [options]="(approachOptions$ | async) ?? []"></app-chip-select>
        <div class="flex flex-wrap items-end gap-x-6 gap-y-3">
          <app-input class="w-full sm:w-56" formControlName="maxFee" label="Orçamento por sessão" prefix="R$" mask="currency" placeholder="Máx." [maxlength]="9"></app-input>
          <app-checkbox formControlName="onlyCompatible">Mostrar só profissionais com compatibilidade boa ou alta</app-checkbox>
        </div>
        <p *ngIf="!loggedIn" class="text-label-sm text-on-surface-variant">Entre como paciente para salvar este perfil na sua conta.</p>
      </form>
    </app-card>
  `,
})
export class CompatibilityPanelComponent implements OnDestroy {
  @Input() set initial(p: Partial<PatientPreferences> | undefined) {
    if (p && !this.form.dirty) {
      this.form.patchValue(
        { specialtyIds: p.specialtyIds ?? [], approachIds: p.approachIds ?? [], maxFee: numberToCurrency(p.maxFee) ?? "" },
        { emitEvent: false },
      );
      this.open = !!(p.specialtyIds?.length || p.approachIds?.length || p.maxFee != null) ? false : true;
    }
  }
  @Input() loggedIn = false;
  @Output() changed = new EventEmitter<PreferencesChange>();

  open = true;
  form = this.fb.group({
    specialtyIds: [[] as string[]],
    approachIds: [[] as string[]],
    maxFee: [""],
    onlyCompatible: [false],
  });

  specialtyOptions$ = this.catalog.activeSpecialties$.pipe(map((l) => l.map((s) => ({ value: s.id, label: s.name }))));
  approachOptions$ = this.catalog.activeApproaches$.pipe(map((l) => l.map((a) => ({ value: a.id, label: a.name }))));
  private sub: Subscription = this.form.valueChanges.subscribe((v) =>
    this.changed.emit({
      prefs: {
        specialtyIds: v.specialtyIds ?? [],
        approachIds: v.approachIds ?? [],
        maxFee: currencyToNumber(v.maxFee) ?? undefined,
      },
      onlyCompatible: !!v.onlyCompatible,
    }),
  );

  constructor(private fb: FormBuilder, private catalog: CatalogService) {}
  ngOnDestroy() { this.sub.unsubscribe(); }
}
