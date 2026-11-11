import { Component, Input } from "@angular/core";
import { FutureInterest } from "../../core/models";
import { InterestsService } from "../../core/services/interests.service";
import { ToastService } from "../../core/services/toast.service";
import { maskPhone } from "../../core/utils/masks";
import { whatsappUrl } from "../../core/utils/misc";

/** Lista de espera: pacientes que registraram interesse em vagas futuras (agenda lotada). */
@Component({
  selector: "app-interests-list",
  template: `
    <div class="space-y-4">
      <app-card *ngIf="agendaFull" class="block">
        <p class="flex items-start gap-2 text-body-sm text-on-surface-variant">
          <app-icon name="event_busy" class="text-amber-700"></app-icon>
          Sua agenda está marcada como lotada. Quando abrir vagas, desmarque "Agenda lotada" no perfil e avise quem está na lista.
        </p>
      </app-card>

      <app-card *ngFor="let i of interests">
        <div class="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
          <div class="flex gap-4 min-w-0">
            <app-avatar [name]="i.name" [size]="48"></app-avatar>
            <div class="min-w-0 space-y-2">
              <div class="flex flex-wrap items-center gap-2">
                <h2 class="text-title-md">{{ i.name }}</h2>
                <app-badge [tone]="i.status === 'waiting' ? 'warning' : 'tertiary'" [icon]="i.status === 'waiting' ? 'hourglass_top' : 'notifications_active'">
                  {{ i.status === "waiting" ? "Aguardando vaga" : "Avisado(a)" }}
                </app-badge>
                <span class="text-label-sm text-on-surface-variant">na lista desde {{ i.createdAt | date: "dd/MM/yyyy" }}</span>
              </div>
              <div class="flex flex-wrap gap-x-4 gap-y-1 text-body-sm text-on-surface-variant">
                <span class="inline-flex items-center gap-1"><app-icon name="mail" [size]="16"></app-icon>{{ i.email }}</span>
                <span class="inline-flex items-center gap-1"><app-icon name="call" [size]="16"></app-icon>{{ phone(i) }}</span>
                <span *ngIf="i.preferredTime" class="inline-flex items-center gap-1"><app-icon name="event_available" [size]="16"></app-icon>Preferência: {{ i.preferredTime }}</span>
              </div>
              <p class="text-body-md bg-surface-container-low rounded-xl p-3 whitespace-pre-line">“{{ i.message }}”</p>
            </div>
          </div>
          <div class="flex flex-col gap-3 lg:w-64 shrink-0">
            <app-button variant="whatsapp" brandIcon="whatsapp" [block]="true" [href]="whatsapp(i)" (click)="markNotified(i)">Avisar sobre vaga</app-button>
            <app-button variant="tonal" icon="delete" [block]="true" (click)="remove(i)">Remover da lista</app-button>
          </div>
        </div>
      </app-card>

      <app-card *ngIf="!interests.length">
        <app-empty-state icon="hourglass_empty" title="Lista de espera vazia" text="Com a agenda lotada, pacientes interessados em vagas futuras aparecem aqui."></app-empty-state>
      </app-card>
    </div>
  `,
})
export class InterestsListComponent {
  @Input() interests: FutureInterest[] = [];
  @Input() psychologistName = "";
  @Input() agendaFull = false;

  constructor(private service: InterestsService, private toast: ToastService) {}

  phone(i: FutureInterest) { return maskPhone(i.phone); }
  whatsapp(i: FutureInterest) {
    return whatsappUrl(i.phone, `Olá ${i.name}, sou ${this.psychologistName} da UnaPsi. Abriu uma vaga na minha agenda e lembrei do seu interesse!`);
  }
  markNotified(i: FutureInterest) { this.service.setStatus(i.id, "notified"); }
  remove(i: FutureInterest) {
    this.service.remove(i.id);
    this.toast.success("Removido da lista de espera.");
  }
}
