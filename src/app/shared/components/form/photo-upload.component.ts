import { Component, Input, Optional, Self } from "@angular/core";
import { NgControl } from "@angular/forms";
import { fileToDataUrl } from "../../../core/utils/misc";
import { ToastService } from "../../../core/services/toast.service";
import { FormControlBase } from "./form-control-base";

@Component({
  selector: "app-photo-upload",
  template: `
    <div class="flex flex-col items-center text-center gap-3">
      <span *ngIf="label" class="text-label-md text-on-surface">{{ label }}</span>
      <button type="button" class="relative group rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary" (click)="file.click()">
        <app-avatar [src]="value" [name]="name || 'Foto'" [size]="112"></app-avatar>
        <span class="absolute inset-0 rounded-full bg-inverse-surface/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-on-primary">
          <app-icon name="photo_camera" [size]="24"></app-icon>
          <span class="text-label-sm">Alterar</span>
        </span>
        <span class="absolute bottom-1 right-1 w-7 h-7 bg-tertiary text-on-tertiary rounded-full flex items-center justify-center shadow">
          <app-icon name="add" [size]="16"></app-icon>
        </span>
      </button>
      <input #file type="file" accept="image/*" class="hidden" (change)="pick($event)" />
      <p class="text-body-sm text-on-surface-variant">{{ hint }}</p>
      <app-button *ngIf="value" variant="ghost" size="sm" icon="delete" (click)="update(undefined); touch()">Remover foto</app-button>
    </div>
  `,
})
export class PhotoUploadComponent extends FormControlBase<string | undefined> {
  @Input() name = "";

  constructor(@Self() @Optional() ngControl: NgControl | null, private toast: ToastService) { super(ngControl); }

  async pick(e: Event) {
    const input = e.target as HTMLInputElement;
    const f = input.files?.[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) return this.toast.error("A imagem deve ter até 5MB.");
    try {
      this.update(await fileToDataUrl(f));
      this.touch();
    } catch {
      this.toast.error("Não foi possível carregar a imagem.");
    }
    input.value = "";
  }
}
