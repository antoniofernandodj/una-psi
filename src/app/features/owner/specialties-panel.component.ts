import { Component } from "@angular/core";
import { BehaviorSubject, combineLatest, map } from "rxjs";
import { Specialty } from "../../core/models";
import { CatalogService } from "../../core/services/catalog.service";
import { SPECIALTY_CATEGORIES } from "../../core/services/seed-data";
import { ToastService } from "../../core/services/toast.service";
import { TaxonomyItem } from "./taxonomy-form-modal.component";

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

@Component({
  selector: "app-specialties-panel",
  template: `
    <div *ngIf="vm$ | async as vm" class="space-y-4">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div class="space-y-3 flex-1">
          <app-input type="search" icon="search" placeholder="Buscar sintoma, queixa ou especialidade..." [ngModel]="query$.value" (ngModelChange)="query$.next($event)"></app-input>
          <div class="flex flex-wrap gap-2">
            <app-chip [interactive]="true" [selected]="!category$.value" (click)="category$.next('')">Todas ({{ vm.total }})</app-chip>
            <app-chip *ngFor="let c of categories" [interactive]="true" [selected]="category$.value === c" (click)="category$.next(c)">{{ c }}</app-chip>
          </div>
        </div>
        <app-button icon="add_circle" (click)="edit({})">Cadastrar nova especialidade</app-button>
      </div>

      <app-card [padding]="false">
        <div class="flex items-center justify-between px-5 py-3 border-b border-outline-variant/30 text-label-md text-on-surface-variant">
          <span class="inline-flex items-center gap-2"><app-icon name="verified" class="text-tertiary" [size]="18"></app-icon>Catálogo de demandas e especialidades</span>
          <span>Mostrando {{ vm.list.length }} de {{ vm.total }}</span>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-body-sm">
            <thead class="bg-surface-container-low text-label-md text-on-surface-variant">
              <tr>
                <th class="px-5 py-3">Especialidade</th><th class="px-5 py-3">Categoria</th>
                <th class="px-5 py-3">Psicólogos</th><th class="px-5 py-3">Status</th><th class="px-5 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-outline-variant/20">
              <tr *ngFor="let s of vm.list" class="hover:bg-surface-container-low/60">
                <td class="px-5 py-3 font-semibold text-on-surface">{{ s.name }}</td>
                <td class="px-5 py-3"><app-chip>{{ s.category }}</app-chip></td>
                <td class="px-5 py-3">{{ vm.usage.get(s.id) ?? 0 }}</td>
                <td class="px-5 py-3"><app-badge [tone]="s.active ? 'tertiary' : 'neutral'">{{ s.active ? "Ativa" : "Inativa" }}</app-badge></td>
                <td class="px-5 py-3 text-right whitespace-nowrap">
                  <app-button variant="ghost" size="sm" icon="edit" (click)="edit(s)">Editar</app-button>
                  <app-button variant="ghost" size="sm" icon="delete" (click)="remove(s, vm.usage.get(s.id) ?? 0)">Excluir</app-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <app-empty-state *ngIf="!vm.list.length" title="Nenhuma especialidade encontrada"></app-empty-state>
      </app-card>
    </div>

    <app-taxonomy-form-modal kind="specialty" [open]="modalOpen" [item]="editing" (closed)="modalOpen = false" (saved)="save($event)"></app-taxonomy-form-modal>
  `,
})
export class SpecialtiesPanelComponent {
  categories = SPECIALTY_CATEGORIES;
  query$ = new BehaviorSubject("");
  category$ = new BehaviorSubject("");
  modalOpen = false;
  editing: TaxonomyItem | null = null;

  vm$ = combineLatest([this.catalog.specialties$, this.catalog.usage$, this.query$, this.category$]).pipe(
    map(([all, usage, query, category]) => ({
      total: all.length,
      usage: usage.specialty,
      list: all.filter((s) => (!category || s.category === category) && norm(`${s.name} ${s.keywords.join(" ")}`).includes(norm(query))),
    })),
  );

  constructor(private catalog: CatalogService, private toast: ToastService) {}

  edit(item: TaxonomyItem) {
    this.editing = item;
    this.modalOpen = true;
  }

  save(item: TaxonomyItem) {
    this.catalog.saveSpecialty(item as Specialty);
    this.modalOpen = false;
    this.toast.success("Especialidade salva.");
  }

  remove(s: Specialty, linked: number) {
    if (linked) return this.toast.error(`Há ${linked} psicólogo(s) vinculados. Desative em vez de excluir.`);
    this.catalog.removeSpecialty(s.id);
    this.toast.success("Especialidade excluída.");
  }
}
