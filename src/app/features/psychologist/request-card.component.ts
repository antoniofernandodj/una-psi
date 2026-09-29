import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ContactRequest, RequestStatus } from "../../core/models";
import { whatsappUrl } from "../../core/utils/misc";
import { maskPhone } from "../../core/utils/masks";
import { REQUEST_STATUS_META, REQUEST_STATUS_OPTIONS } from "../../shared/constants";

@Component({
  selector: "app-request-card",
  template: `
    <app-card>
      <div class="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
        <div class="flex gap-4 min-w-0">
          <app-avatar [name]="request.name" [size]="48"></app-avatar>
          <div class="min-w-0 space-y-2">
            <div class="flex flex-wrap items-center gap-2">
              <h2 class="text-title-md">{{ request.name }}</h2>
              <app-badge [tone]="meta.tone" [icon]="meta.icon">{{ meta.label }}</app-badge>
              <span class="inline-flex items-center gap-1 text-label-sm text-on-surface-variant">
                <app-icon name="schedule" [size]="14"></app-icon> {{ request.createdAt | date: "dd/MM 'às' HH:mm" }}
              </span>
            </div>
            <div class="flex flex-wrap gap-x-4 gap-y-1 text-body-sm text-on-surface-variant">
              <span class="inline-flex items-center gap-1"><app-icon name="mail" [size]="16"></app-icon>{{ request.email }}</span>
              <span class="inline-flex items-center gap-1"><app-icon name="call" [size]="16"></app-icon>{{ phone }}</span>
              <span *ngIf="request.preferredTime" class="inline-flex items-center gap-1">
                <app-icon name="event_available" [size]="16"></app-icon>Preferência: {{ request.preferredTime }}
              </span>
            </div>
            <p class="text-body-md text-on-surface bg-surface-container-low rounded-xl p-3 whitespace-pre-line">“{{ request.message }}”</p>
            <p *ngIf="request.notes" class="flex items-start gap-2 text-body-sm text-on-surface-variant">
              <app-icon name="sticky_note_2" [size]="16"></app-icon>
              <span><strong>Nota particular:</strong> {{ request.notes }}</span>
            </p>
          </div>
        </div>

        <div class="flex flex-col gap-3 lg:w-64 shrink-0">
          <app-button variant="whatsapp" icon="chat" [block]="true" [href]="whatsapp">Chamar no WhatsApp</app-button>
          <app-select [ngModel]="request.status" (ngModelChange)="statusChange.emit($event)" [options]="statusOptions"></app-select>
          <app-button variant="tonal" icon="edit_note" [block]="true" (click)="editNotes.emit()">Notas</app-button>
        </div>
      </div>
    </app-card>
  `,
})
export class RequestCardComponent {
  @Input() request!: ContactRequest;
  @Input() psychologistName = "";
  @Output() statusChange = new EventEmitter<RequestStatus>();
  @Output() editNotes = new EventEmitter<void>();
  statusOptions = REQUEST_STATUS_OPTIONS;

  get meta() { return REQUEST_STATUS_META[this.request.status]; }
  get phone() { return maskPhone(this.request.phone); }
  get whatsapp() {
    return whatsappUrl(
      this.request.phone,
      `Olá ${this.request.name}, sou ${this.psychologistName} da UnaPsi. Recebi sua solicitação de contato.`,
    );
  }
}
