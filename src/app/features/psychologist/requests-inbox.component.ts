import { Component, Input } from "@angular/core";
import { BehaviorSubject, combineLatest, map, Observable } from "rxjs";
import { ContactRequest, RequestStatus } from "../../core/models";
import { RequestsService } from "../../core/services/requests.service";
import { ToastService } from "../../core/services/toast.service";
import { REQUEST_STATUS_META } from "../../shared/constants";

type Filter = "all" | RequestStatus;

@Component({
  selector: "app-requests-inbox",
  template: `
    <div *ngIf="vm$ | async as vm" class="space-y-4">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div class="flex flex-wrap gap-2">
          <app-chip *ngFor="let f of vm.filters" [interactive]="true" [selected]="f.id === filter$.value" (click)="filter$.next(f.id)">
            {{ f.label }} ({{ f.count }})
          </app-chip>
        </div>
        <div class="md:w-72">
          <app-input type="search" icon="search" placeholder="Buscar por paciente ou mensagem..." [ngModel]="query$.value" (ngModelChange)="query$.next($event)"></app-input>
        </div>
      </div>

      <app-request-card
        *ngFor="let r of vm.list"
        [request]="r"
        [psychologistName]="psychologistName"
        (statusChange)="setStatus(r, $event)"
        (editNotes)="editing = r; notes = r.notes ?? ''"
      ></app-request-card>

      <app-card *ngIf="!vm.list.length">
        <app-empty-state icon="inbox" title="Nenhuma solicitação por aqui" text="Quando pacientes enviarem o formulário do seu perfil, elas aparecem nesta lista."></app-empty-state>
      </app-card>
    </div>

    <app-modal [open]="!!editing" title="Nota particular" icon="edit_note" (closed)="editing = null">
      <p class="text-body-sm text-on-surface-variant mb-3">Visível somente para você — {{ editing?.name }}.</p>
      <textarea
        [(ngModel)]="notes"
        rows="5"
        class="w-full px-3.5 py-3 rounded-xl ring-1 ring-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-secondary"
      ></textarea>
      <div class="flex justify-end gap-3 mt-4">
        <app-button variant="tonal" (click)="editing = null">Cancelar</app-button>
        <app-button (click)="saveNotes()">Salvar nota</app-button>
      </div>
    </app-modal>
  `,
})
export class RequestsInboxComponent {
  @Input() set requests(r: ContactRequest[]) { this.requests$.next(r); }
  @Input() psychologistName = "";

  private requests$ = new BehaviorSubject<ContactRequest[]>([]);
  filter$ = new BehaviorSubject<Filter>("all");
  query$ = new BehaviorSubject("");
  editing: ContactRequest | null = null;
  notes = "";

  vm$: Observable<{ filters: { id: Filter; label: string; count: number }[]; list: ContactRequest[] }> = combineLatest([
    this.requests$, this.filter$, this.query$,
  ]).pipe(
    map(([all, filter, query]) => {
      const active = all.filter((r) => r.status !== "archived");
      const filters = [
        { id: "all" as Filter, label: "Ativas", count: active.length },
        ...(["new", "contacted", "scheduled", "archived"] as RequestStatus[]).map((s) => ({
          id: s as Filter,
          label: REQUEST_STATUS_META[s].label,
          count: all.filter((r) => r.status === s).length,
        })),
      ];
      const q = query.trim().toLowerCase();
      const base = filter === "all" ? active : all.filter((r) => r.status === filter);
      return {
        filters,
        list: base.filter((r) => !q || `${r.name} ${r.message} ${r.email}`.toLowerCase().includes(q)),
      };
    }),
  );

  constructor(private service: RequestsService, private toast: ToastService) {}

  setStatus(r: ContactRequest, status: RequestStatus) {
    this.service.update(r.id, { status });
    this.toast.success("Status atualizado.");
  }

  saveNotes() {
    if (!this.editing) return;
    this.service.update(this.editing.id, { notes: this.notes.trim() || undefined });
    this.editing = null;
    this.toast.success("Nota salva.");
  }
}
