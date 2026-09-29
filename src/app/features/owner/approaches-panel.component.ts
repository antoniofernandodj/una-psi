import { Component } from "@angular/core";
import { combineLatest, map } from "rxjs";
import { Approach } from "../../core/models";
import { CatalogService } from "../../core/services/catalog.service";
import { ToastService } from "../../core/services/toast.service";
import { TaxonomyItem } from "./taxonomy-form-modal.component";

@Component({
  selector: "app-approaches-panel",
  template: `
    <div *ngIf="vm$ | async as vm" class="space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-headline-sm">Linhas teóricas e abordagens metodológicas</h2>
          <p class="text-body-sm text-on-surface-variant">Abordagens disponíveis para seleção pelos psicólogos e filtro dos pacientes.</p>
        </div>
        <app-button icon="add_circle" (click)="edit({})">Adicionar abordagem</app-button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <app-card *ngFor="let a of vm.list">
          <div class="flex items-start justify-between gap-3">
            <h3 class="text-title-md">{{ a.name }}</h3>
            <app-badge [tone]="a.active ? 'tertiary' : 'neutral'">{{ a.active ? "Ativa" : "Inativa" }}</app-badge>
          </div>
          <p class="text-body-sm text-on-surface-variant mt-2 min-h-[3.75rem]">{{ a.description }}</p>
          <div class="flex items-center justify-between mt-4 pt-3 border-t border-outline-variant/30">
            <span class="text-label-md text-on-surface-variant">{{ vm.usage.get(a.id) ?? 0 }} psicólogo(s)</span>
            <div>
              <app-button variant="ghost" size="sm" icon="edit" (click)="edit(a)">Editar</app-button>
              <app-button variant="ghost" size="sm" icon="delete" (click)="remove(a, vm.usage.get(a.id) ?? 0)">Excluir</app-button>
            </div>
          </div>
        </app-card>
      </div>
    </div>

    <app-taxonomy-form-modal kind="approach" [open]="modalOpen" [item]="editing" (closed)="modalOpen = false" (saved)="save($event)"></app-taxonomy-form-modal>
  `,
})
export class ApproachesPanelComponent {
  modalOpen = false;
  editing: TaxonomyItem | null = null;

  vm$ = combineLatest([this.catalog.approaches$, this.catalog.usage$]).pipe(
    map(([list, usage]) => ({ list, usage: usage.approach })),
  );

  constructor(private catalog: CatalogService, private toast: ToastService) {}

  edit(item: TaxonomyItem) {
    this.editing = item;
    this.modalOpen = true;
  }

  save(item: TaxonomyItem) {
    this.catalog.saveApproach(item as Approach);
    this.modalOpen = false;
    this.toast.success("Abordagem salva.");
  }

  remove(a: Approach, linked: number) {
    if (linked) return this.toast.error(`Há ${linked} psicólogo(s) vinculados. Desative em vez de excluir.`);
    this.catalog.removeApproach(a.id);
    this.toast.success("Abordagem excluída.");
  }
}
