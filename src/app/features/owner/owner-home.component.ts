import { Component } from "@angular/core";
import { combineLatest, map } from "rxjs";
import { CatalogService } from "../../core/services/catalog.service";
import { RequestsStore, UsersStore } from "../../core/services/stores";
import { TabItem } from "../../shared/components/tabs.component";

@Component({
  selector: "app-owner-home",
  template: `
    <div *ngIf="vm$ | async as vm" class="space-y-8">
      <section>
        <h1 class="text-headline-lg">Gestão da plataforma</h1>
        <p class="text-body-md text-on-surface-variant">Governança das abordagens e especialidades usadas em cadastros e buscas.</p>
      </section>

      <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <app-stat-card label="Psicólogos" [value]="vm.psychologists" icon="psychology" tone="primary"></app-stat-card>
        <app-stat-card label="Pacientes" [value]="vm.patients" icon="groups" tone="secondary"></app-stat-card>
        <app-stat-card label="Solicitações de contato" [value]="vm.requests" icon="send_time_extension" tone="tertiary"></app-stat-card>
        <app-stat-card label="Especialidades ativas" [value]="vm.activeSpecialties" icon="category" tone="secondary"></app-stat-card>
        <app-stat-card label="Abordagens ativas" [value]="vm.activeApproaches" icon="psychology_alt" tone="primary"></app-stat-card>
      </div>

      <app-tabs [tabs]="vm.tabs" [active]="tab" (activeChange)="tab = $event"></app-tabs>

      <app-specialties-panel *ngIf="tab === 'specialties'"></app-specialties-panel>
      <app-approaches-panel *ngIf="tab === 'approaches'"></app-approaches-panel>

      <app-card>
        <div class="flex items-start gap-3 text-body-sm text-on-surface-variant">
          <app-icon name="shield_with_heart" class="text-tertiary" [size]="28"></app-icon>
          <p>
            <strong class="text-on-surface">Integridade de taxonomia e conformidade ética.</strong>
            As especialidades e abordagens impactam diretamente os filtros públicos de busca. Nenhuma especialidade substitui o diagnóstico médico psiquiátrico formal.
          </p>
        </div>
      </app-card>
    </div>
  `,
})
export class OwnerHomeComponent {
  tab = "specialties";

  vm$ = combineLatest([this.users.items$, this.requests.items$, this.catalog.specialties$, this.catalog.approaches$]).pipe(
    map(([users, requests, specialties, approaches]) => {
      const tabs: TabItem[] = [
        { id: "specialties", label: "Especialidades clínicas", icon: "hub", badge: specialties.length },
        { id: "approaches", label: "Abordagens teóricas", icon: "psychology_alt", badge: approaches.length },
      ];
      return {
        tabs,
        psychologists: users.filter((u) => u.role === "psychologist").length,
        patients: users.filter((u) => u.role === "patient").length,
        requests: requests.length,
        activeSpecialties: specialties.filter((s) => s.active).length,
        activeApproaches: approaches.filter((a) => a.active).length,
      };
    }),
  );

  constructor(private users: UsersStore, private requests: RequestsStore, private catalog: CatalogService) {}
}
