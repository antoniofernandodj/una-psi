import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, combineLatest, map } from "rxjs";
import { InterestsService } from "../../core/services/interests.service";
import { PreferencesService } from "../../core/services/preferences.service";
import { Compatibility, computeCompatibility } from "../../core/utils/compatibility";
import { PreferencesChange } from "./compatibility-panel.component";
import { AuthService } from "../../core/services/auth.service";
import { EMPTY_FILTERS, PsychologistFilters, PsychologistsService } from "../../core/services/psychologists.service";
import { RequestsService } from "../../core/services/requests.service";
import { ToastService } from "../../core/services/toast.service";
import { ContactRequestData } from "./contact-request-form.component";

@Component({
  selector: "app-patient-home",
  template: `
    <div *ngIf="vm$ | async as vm" class="space-y-6">
      <section>
        <h1 class="text-headline-lg">Encontre seu psicólogo</h1>
        <p class="text-body-md text-on-surface-variant">Filtre por especialidade, abordagem e valor da sessão.</p>
      </section>

      <app-compatibility-panel [initial]="initialPrefs" [loggedIn]="!!vm.user" (changed)="onPrefs($event, vm.user?.id)"></app-compatibility-panel>

      <app-psychologist-filters (filtersChange)="filters$.next($event)"></app-psychologist-filters>

      <section class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div class="lg:col-span-5 space-y-4 lg:block" [class.hidden]="!!vm.selected">
          <div class="flex items-center justify-between">
            <h2 class="flex items-center gap-2 text-headline-sm">
              Terapeutas disponíveis <app-badge tone="secondary">{{ vm.list.length }}</app-badge>
            </h2>
          </div>
          <app-psychologist-card
            *ngFor="let p of vm.list"
            [view]="p"
            [selected]="p.user.id === vm.selected?.user?.id"
            [match]="vm.matches[p.user.id]"
            (select)="open($event)"
          ></app-psychologist-card>
          <app-empty-state
            *ngIf="!vm.list.length"
            icon="person_search"
            title="Nenhum psicólogo encontrado"
            [text]="vm.total ? 'Tente ajustar ou limpar os filtros.' : 'Ainda não há psicólogos cadastrados na plataforma.'"
          ></app-empty-state>
        </div>

        <div class="lg:col-span-7 lg:block" [class.hidden]="!vm.selected">
          <app-button class="lg:hidden mb-4" variant="ghost" size="sm" icon="arrow_back" (click)="open(null)">Voltar à lista</app-button>
          <app-psychologist-detail
            *ngIf="vm.selected; else placeholder"
            [view]="vm.selected"
            [currentUser]="vm.user"
            [match]="vm.matches[vm.selected.user.id]"
            (request)="send(vm.selected.user.id, vm.user?.id, $event)"
            (interest)="registerInterest(vm.selected.user.id, vm.user?.id, $event)"
          ></app-psychologist-detail>
          <ng-template #placeholder>
            <app-card>
              <app-empty-state icon="touch_app" title="Selecione um profissional" text="Abra um perfil para ver detalhes e solicitar contato."></app-empty-state>
            </app-card>
          </ng-template>
        </div>
      </section>
    </div>
  `,
})
export class PatientHomeComponent {
  filters$ = new BehaviorSubject<PsychologistFilters>(EMPTY_FILTERS);
  private selectedId$ = this.route.queryParamMap.pipe(map((q) => q.get("p")));

  initialPrefs = this.prefsService.get(this.auth.currentUser?.id);
  private prefs$ = new BehaviorSubject<PreferencesChange>({
    prefs: { specialtyIds: this.initialPrefs?.specialtyIds ?? [], approachIds: this.initialPrefs?.approachIds ?? [], maxFee: this.initialPrefs?.maxFee },
    onlyCompatible: false,
  });

  vm$ = combineLatest([this.service.all$, this.filters$, this.selectedId$, this.auth.currentUser$, this.prefs$]).pipe(
    map(([all, filters, id, user, { prefs, onlyCompatible }]) => {
      const matches: Record<string, Compatibility | null> = {};
      all.forEach((p) => (matches[p.user.id] = computeCompatibility(prefs, p)));
      const score = (id: string) => matches[id]?.score ?? 0;
      let list = this.service.filter(all, filters);
      if (onlyCompatible) list = list.filter((p) => (matches[p.user.id]?.score ?? 100) >= 50);
      if (Object.values(matches).some(Boolean)) {
        list = [...list].sort((a, b) => score(b.user.id) - score(a.user.id) || Number(!!a.profile.agendaFull) - Number(!!b.profile.agendaFull));
      }
      return {
        total: all.length,
        list,
        matches,
        selected: all.find((p) => p.user.id === id),
        user: user?.role === "patient" ? user : null,
      };
    }),
  );

  constructor(
    private service: PsychologistsService,
    private requests: RequestsService,
    private interests: InterestsService,
    private prefsService: PreferencesService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService,
  ) {}

  open(id: string | null) {
    this.router.navigate([], { queryParams: { p: id }, queryParamsHandling: "merge" });
  }

  onPrefs(change: PreferencesChange, userId?: string) {
    this.prefs$.next(change);
    if (userId) this.prefsService.save(userId, change.prefs);
  }

  registerInterest(psychologistId: string, patientId: string | undefined, data: ContactRequestData) {
    this.interests.create({ psychologistId, patientId, ...data });
    this.toast.success("Interesse registrado! Avisaremos o profissional que você está na lista de espera.");
  }

  send(psychologistId: string, patientId: string | undefined, data: ContactRequestData) {
    this.requests.create({ psychologistId, patientId, ...data });
    this.toast.success("Solicitação enviada! O profissional retornará em breve.");
  }
}
