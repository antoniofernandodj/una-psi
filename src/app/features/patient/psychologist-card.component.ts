import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PsychologistView } from "../../core/models";

const VISIBLE_TAGS = 3;

/** Item do Master: nome, foto, abordagens, especialidades e (se houver) valor. */
@Component({
  selector: "app-psychologist-card",
  template: `
    <article
      class="bg-surface-container-lowest rounded-2xl shadow-sm p-5 cursor-pointer transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-secondary"
      [class]="selected ? 'ring-2 ring-secondary' : 'ring-1 ring-outline-variant/30'"
      (click)="select.emit(view.user.id)"
    >
      <div class="flex gap-4">
        <app-avatar [src]="view.profile.photo" [name]="view.user.name" [size]="64"></app-avatar>
        <div class="min-w-0">
          <h3 class="text-title-md text-on-surface truncate">{{ view.user.name }}</h3>
          <app-badge tone="tertiary" icon="verified">CRP {{ view.profile.crp }}</app-badge>
          <p class="text-label-lg text-secondary mt-1">{{ approachNames }}</p>
        </div>
      </div>

      <p *ngIf="view.profile.bio" class="text-body-sm text-on-surface-variant mt-3 line-clamp-2">{{ view.profile.bio }}</p>

      <div class="flex flex-wrap gap-1.5 mt-3">
        <app-chip *ngFor="let s of visibleSpecialties">{{ s.name }}</app-chip>
        <app-chip *ngIf="extra > 0">+{{ extra }} temas</app-chip>
      </div>

      <div class="flex items-center justify-between mt-4 pt-3 border-t border-outline-variant/30">
        <div>
          <ng-container *ngIf="view.profile.sessionFee != null">
            <span class="block text-label-sm text-on-surface-variant">Investimento</span>
            <app-price [fee]="view.profile.sessionFee"></app-price>
          </ng-container>
        </div>
        <span class="inline-flex items-center gap-1 text-label-lg text-primary">
          {{ selected ? "Perfil aberto" : "Ver detalhes" }}
          <app-icon name="arrow_forward" [size]="18"></app-icon>
        </span>
      </div>
    </article>
  `,
})
export class PsychologistCardComponent {
  @Input() view!: PsychologistView;
  @Input() selected = false;
  @Output() select = new EventEmitter<string>();

  get approachNames() { return this.view.approaches.map((a) => a.name).join(" • "); }
  get visibleSpecialties() { return this.view.specialties.slice(0, VISIBLE_TAGS); }
  get extra() { return this.view.specialties.length - VISIBLE_TAGS; }
}
