import { Component } from "@angular/core";
import { combineLatest, filter, map, switchMap } from "rxjs";
import { AuthService } from "../../core/services/auth.service";
import { PsychologistsService } from "../../core/services/psychologists.service";
import { RequestsService } from "../../core/services/requests.service";
import { TabItem } from "../../shared/components/tabs.component";

@Component({
  selector: "app-psychologist-home",
  template: `
    <div *ngIf="vm$ | async as vm" class="space-y-8">
      <app-card>
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div class="flex items-center gap-4">
            <app-avatar [src]="vm.view.profile.photo" [name]="vm.view.user.name" [size]="72" [online]="true"></app-avatar>
            <div>
              <h1 class="text-headline-md">{{ vm.view.user.name }}</h1>
              <div class="flex flex-wrap items-center gap-2 mt-1">
                <app-badge tone="tertiary" icon="verified">CRP {{ vm.view.profile.crp }}</app-badge>
                <span class="text-body-sm text-on-surface-variant">{{ vm.approaches }}</span>
              </div>
            </div>
          </div>
          <app-button variant="tonal" icon="visibility" [link]="['/paciente']" [queryParams]="{ p: vm.view.user.id }">Pré-visualizar perfil</app-button>
        </div>
      </app-card>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <app-stat-card label="Novas solicitações" [value]="vm.counts.new" icon="person_add" tone="primary"></app-stat-card>
        <app-stat-card label="Em andamento" [value]="vm.counts.active" icon="groups" tone="secondary"></app-stat-card>
        <app-stat-card label="Total recebidas" [value]="vm.counts.total" icon="forum" tone="tertiary"></app-stat-card>
        <app-stat-card label="Perfil completo" [value]="vm.completeness + '%'" icon="account_circle" tone="neutral"></app-stat-card>
      </div>

      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <app-tabs [tabs]="vm.tabs" [active]="tab" (activeChange)="tab = $event"></app-tabs>
        <span class="inline-flex items-center gap-1 text-label-sm text-on-surface-variant">
          <app-icon name="lock" [size]="16"></app-icon> Ambiente seguro • Conformidade CFP
        </span>
      </div>

      <app-requests-inbox
        *ngIf="tab === 'requests'"
        [requests]="vm.requests"
        [psychologistName]="vm.view.user.name"
      ></app-requests-inbox>
      <app-profile-editor *ngIf="tab === 'profile'" [user]="vm.view.user" [profileData]="vm.view.profile"></app-profile-editor>
    </div>
  `,
})
export class PsychologistHomeComponent {
  tab = "requests";

  vm$ = this.auth.currentUser$.pipe(
    switchMap((user) =>
      combineLatest([this.psychologists.view$(user!.id), this.requestsService.forPsychologist$(user!.id)]),
    ),
    filter(([view]) => !!view),
    map(([view, requests]) => {
      const v = view!;
      const p = v.profile;
      const checks = [p.photo, p.crp, p.approachIds.length, p.specialtyIds.length, p.bio, p.sessionFee != null, p.whatsapp || p.instagram || p.linkedin];
      const newCount = requests.filter((r) => r.status === "new").length;
      const tabs: TabItem[] = [
        { id: "requests", label: "Solicitações de pacientes", icon: "inbox", badge: newCount },
        { id: "profile", label: "Dados profissionais e perfil público", icon: "account_box" },
      ];
      return {
        view: v,
        requests,
        tabs,
        approaches: v.approaches.map((a) => a.name).join(" • "),
        completeness: Math.round((checks.filter(Boolean).length / checks.length) * 100),
        counts: {
          new: newCount,
          active: requests.filter((r) => r.status === "contacted" || r.status === "scheduled").length,
          total: requests.length,
        },
      };
    }),
  );

  constructor(
    private auth: AuthService,
    private psychologists: PsychologistsService,
    private requestsService: RequestsService,
  ) {}
}
