import { Component, Input } from "@angular/core";

/** Casca comum dos campos: rótulo, conteúdo, dica/erro. */
@Component({
  selector: "app-field",
  template: `
    <div>
      <div *ngIf="label" class="flex items-center justify-between mb-1.5">
        <label class="block text-label-md text-on-surface" [attr.for]="for">
          {{ label }}<span *ngIf="required" class="text-primary"> *</span>
        </label>
        <ng-content select="[fieldAside]"></ng-content>
      </div>
      <ng-content></ng-content>
      <p *ngIf="error; else hintTpl" class="text-label-sm text-error mt-1">{{ error }}</p>
      <ng-template #hintTpl>
        <p *ngIf="hint" class="text-label-sm text-on-surface-variant mt-1">{{ hint }}</p>
      </ng-template>
    </div>
  `,
})
export class FieldComponent {
  @Input() label = "";
  @Input() hint = "";
  @Input() error: string | null = null;
  @Input() required = false;
  @Input() for?: string;
}
