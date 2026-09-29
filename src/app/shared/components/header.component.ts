import { Component } from "@angular/core";
import { combineLatest, map } from "rxjs";
import { ProfilesStore } from "../../core/services/stores";
import { AuthService } from "../../core/services/auth.service";
import { Role } from "../../core/models";

const ROLE_LABEL: Record<Role, string> = { patient: "Paciente", psychologist: "Psicólogo(a)", owner: "Owner" };
const NAV: Record<Role, { label: string; link: string }> = {
  patient: { label: "Encontrar Psicólogo", link: "/paciente" },
  psychologist: { label: "Painel do Terapeuta", link: "/psicologo" },
  owner: { label: "Gestão da Plataforma", link: "/owner" },
};

@Component({
  selector: "app-header",
  template: `
    <header class="sticky top-0 z-40 bg-surface-container-lowest/90 backdrop-blur border-b border-outline-variant/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <a routerLink="/"><app-logo></app-logo></a>

        <ng-container *ngIf="vm$ | async as vm">
          <nav class="hidden sm:flex items-center gap-2">
            <a
              *ngFor="let n of vm.nav"
              [routerLink]="n.link"
              routerLinkActive="!bg-primary-container !text-on-primary shadow-sm"
              class="px-4 py-2 rounded-xl text-label-lg text-on-surface-variant hover:bg-surface-container transition-colors"
              >{{ n.label }}</a
            >
          </nav>

          <div class="flex items-center gap-3">
            <ng-container *ngIf="vm.user; else guest">
              <div class="hidden md:flex flex-col items-end leading-tight">
                <span class="text-label-lg">{{ vm.user.name }}</span>
                <span class="text-label-sm text-on-surface-variant">{{ vm.roleLabel }}</span>
              </div>
              <app-avatar [name]="vm.user.name" [src]="vm.photo" [size]="36"></app-avatar>
              <app-button variant="ghost" size="sm" icon="logout" link="/logout">Sair</app-button>
            </ng-container>
            <ng-template #guest>
              <app-button variant="ghost" size="sm" link="/login">Entrar</app-button>
              <app-button size="sm" link="/signin">Cadastre-se</app-button>
            </ng-template>
          </div>
        </ng-container>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  vm$ = combineLatest([this.auth.currentUser$, this.profiles.items$]).pipe(
    map(([user, profiles]) => ({
      user,
      roleLabel: user ? ROLE_LABEL[user.role] : "",
      photo: profiles.find((p) => p.id === user?.id)?.photo,
      nav: user ? [NAV[user.role]] : [NAV.patient],
    })),
  );
  constructor(private auth: AuthService, private profiles: ProfilesStore) {}
}
