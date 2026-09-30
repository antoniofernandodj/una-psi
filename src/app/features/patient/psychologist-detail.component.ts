import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PsychologistView, User } from "../../core/models";
import { whatsappUrl } from "../../core/utils/misc";
import { ContactRequestData } from "./contact-request-form.component";

const TRUST_POINTS = [
  { icon: "lock", title: "Sigilo absoluto", text: "Conforme o Código de Ética Profissional do Psicólogo." },
  { icon: "verified_user", title: "Cadastro verificado", text: "Profissional com registro no CRP informado." },
  { icon: "chat", title: "Contato direto", text: "Converse por WhatsApp ou envie uma solicitação." },
];

/** Detail: todas as informações do Master + bio, canais e formulário de contato. */
@Component({
  selector: "app-psychologist-detail",
  template: `
    <app-card [padding]="false">
      <div class="h-24 sm:h-36 rounded-t-2xl overflow-hidden bg-gradient-to-r from-primary-fixed via-secondary-fixed to-tertiary-fixed">
        <img *ngIf="view.profile.cover" [src]="view.profile.cover" [alt]="'Foto de fundo de ' + view.user.name" class="w-full h-full object-cover" />
      </div>
      <div class="p-5 sm:p-8 -mt-12 space-y-8">
        <header class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div class="flex items-end gap-4">
            <app-avatar class="ring-4 ring-surface-container-lowest rounded-full" [src]="view.profile.photo" [name]="view.user.name" [size]="96"></app-avatar>
            <div>
              <app-badge tone="tertiary" icon="verified_user">CRP {{ view.profile.crp }}</app-badge>
              <h1 class="text-headline-md text-on-surface">{{ view.user.name }}</h1>
              <p class="text-label-lg text-secondary">{{ approachNames }}</p>
            </div>
          </div>
          <div *ngIf="view.profile.sessionFee != null" class="rounded-2xl bg-surface-container-low px-5 py-3 text-right">
            <span class="block text-label-sm text-on-surface-variant">Valor da sessão</span>
            <app-price [fee]="view.profile.sessionFee"></app-price>
          </div>
        </header>

        <div class="space-y-4">
          <app-button variant="whatsapp" size="lg" brandIcon="whatsapp" [block]="true" [href]="whatsapp">Conversar via WhatsApp</app-button>
          <app-social-links [profile]="view.profile"></app-social-links>
        </div>

        <section *ngIf="view.profile.bio">
          <h4 class="flex items-center gap-2 text-title-md mb-2">
            <app-icon name="psychology" class="text-primary"></app-icon> Apresentação e abordagem
          </h4>
          <p class="text-body-md text-on-surface-variant whitespace-pre-line">{{ view.profile.bio }}</p>
        </section>

        <section *ngIf="view.specialties.length">
          <h4 class="text-title-md mb-3">Temas e demandas</h4>
          <div class="flex flex-wrap gap-2">
            <app-chip *ngFor="let s of view.specialties" [selected]="true">{{ s.name }}</app-chip>
          </div>
        </section>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div *ngFor="let t of trust" class="rounded-xl bg-surface-container-low p-4">
            <div class="flex items-center gap-2 text-label-lg text-tertiary"><app-icon [name]="t.icon" [size]="20"></app-icon>{{ t.title }}</div>
            <p class="text-body-sm text-on-surface-variant mt-1">{{ t.text }}</p>
          </div>
        </div>

        <section class="rounded-2xl bg-surface-container-low p-5 sm:p-6">
          <div class="flex items-start gap-3 mb-5">
            <span class="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0"><app-icon name="mail"></app-icon></span>
            <div>
              <h3 class="text-title-md">Solicitar primeiro contato com {{ view.user.name }}</h3>
              <p class="text-body-sm text-on-surface-variant">Envie sua mensagem e preferência de horário. O profissional retornará pelo contato informado.</p>
            </div>
          </div>
          <app-contact-request-form [user]="currentUser" (send)="request.emit($event)"></app-contact-request-form>
        </section>
      </div>
    </app-card>
  `,
})
export class PsychologistDetailComponent {
  @Input() view!: PsychologistView;
  @Input() currentUser: User | null = null;
  @Output() request = new EventEmitter<ContactRequestData>();
  trust = TRUST_POINTS;

  get approachNames() { return this.view.approaches.map((a) => a.name).join(" • "); }
  get whatsapp() {
    return whatsappUrl(
      this.view.profile.whatsapp || this.view.user.phone,
      `Olá ${this.view.user.name}, encontrei seu perfil na UnaPsi e gostaria de informações sobre atendimento.`,
    );
  }
}
