import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { map } from "rxjs";
import { CatalogService } from "../../core/services/catalog.service";
import { MAX_APPROACHES } from "../../core/utils/profile-form";
import { SOCIALS } from "../constants";

/** Campos do perfil profissional do psicólogo (cadastro e painel). */
@Component({
  selector: "app-profile-fields",
  template: `
    <div [formGroup]="group" class="space-y-8">
      <app-cover-upload
        formControlName="cover"
        label="Foto de fundo do perfil"
        hint="Aparece no topo do seu perfil público. Proporção 3:1 — você poderá reposicionar antes de salvar."
      ></app-cover-upload>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div class="lg:col-span-4 bg-surface-container-low p-6 rounded-2xl space-y-6">
          <app-photo-upload
            formControlName="photo"
            label="Foto profissional"
            [name]="name"
            hint="Adicione uma imagem nítida com expressão acolhedora (até 5MB)."
          ></app-photo-upload>
          <app-input
            formControlName="crp"
            label="Registro CRP"
            placeholder="06/123456"
            mask="crp"
            icon="badge"
            [maxlength]="9"
            hint="Região / Número (ex: 06/123456 para SP)"
          ></app-input>
          <app-input
            formControlName="sessionFee"
            label="Valor da sessão (R$)"
            placeholder="180,00"
            prefix="R$"
            mask="currency"
            hint="Opcional — deixe em branco para combinar diretamente ou oferecer valor social."
          ></app-input>
        </div>

        <div class="lg:col-span-8 space-y-6">
          <app-chip-select
            formControlName="approachIds"
            label="Abordagens teóricas"
            [hint]="'Selecione até ' + maxApproaches + ' linhas mestras da sua prática clínica.'"
            [max]="maxApproaches"
            [options]="(approachOptions$ | async) ?? []"
          ></app-chip-select>
          <app-tag-picker
            formControlName="specialtyIds"
            label="Especialidades e demandas clínicas"
            placeholder="Buscar por tema (ex: Ansiedade, Luto, TDAH, Burnout...)"
            [options]="(specialtyOptions$ | async) ?? []"
          ></app-tag-picker>
          <app-textarea
            formControlName="bio"
            label="Apresentação pessoal / mini-currículo"
            placeholder="Conte sobre seu propósito terapêutico, formação e como acolhe os pacientes nas primeiras sessões..."
            [rows]="4"
            [maxlength]="600"
          ></app-textarea>
        </div>
      </div>

      <div>
        <app-section-title title="Canais de contato e redes sociais" icon="share"></app-section-title>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <app-input
            *ngFor="let s of socials"
            [formControlName]="s.key"
            [icon]="s.brand ? undefined : s.icon"
            [brand]="s.brand ? s.key : undefined"
            [placeholder]="s.placeholder"
            [type]="s.key === 'whatsapp' ? 'tel' : 'text'"
            [mask]="s.key === 'whatsapp' ? 'phone' : undefined"
          ></app-input>
        </div>
      </div>
    </div>
  `,
})
export class ProfileFieldsComponent {
  @Input() group!: FormGroup;
  @Input() name = "";
  socials = SOCIALS;
  maxApproaches = MAX_APPROACHES;

  approachOptions$ = this.catalog.activeApproaches$.pipe(map((l) => l.map((a) => ({ value: a.id, label: a.name }))));
  specialtyOptions$ = this.catalog.activeSpecialties$.pipe(map((l) => l.map((s) => ({ value: s.id, label: s.name }))));

  constructor(private catalog: CatalogService) {}
}
