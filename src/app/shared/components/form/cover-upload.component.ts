import { Component, Input, Optional, Self } from "@angular/core";
import { NgControl } from "@angular/forms";
import { readFileAsDataUrl } from "../../../core/utils/misc";
import { ToastService } from "../../../core/services/toast.service";
import { FormControlBase } from "./form-control-base";

export const COVER_ASPECT = 3;

/** Foto de fundo (capa) do perfil, com recorte 3:1. */
@Component({
  selector: "app-cover-upload",
  template: `
    <div class="space-y-2">
      <span *ngIf="label" class="text-label-md text-on-surface">{{ label }}</span>
      <button
        type="button"
        class="relative group block w-full rounded-2xl overflow-hidden bg-gradient-to-r from-primary-fixed via-secondary-fixed to-tertiary-fixed focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        [style.aspect-ratio]="aspect"
        (click)="file.click()"
      >
        <img *ngIf="value" [src]="value" alt="Foto de fundo do perfil" class="absolute inset-0 w-full h-full object-cover" />
        <span class="absolute inset-0 flex flex-col items-center justify-center gap-1 text-on-surface-variant transition-opacity" [class]="value ? 'bg-inverse-surface/40 text-on-primary opacity-0 group-hover:opacity-100' : ''">
          <app-icon name="add_photo_alternate" [size]="28"></app-icon>
          <span class="text-label-md">{{ value ? "Trocar foto de fundo" : "Adicionar foto de fundo" }}</span>
        </span>
      </button>
      <input #file type="file" accept="image/*" class="hidden" (change)="pick($event)" />
      <div class="flex flex-wrap items-center justify-between gap-2">
        <p class="text-body-sm text-on-surface-variant">{{ hint }}</p>
        <div *ngIf="value" class="flex gap-1">
          <app-button variant="ghost" size="sm" icon="crop" (click)="cropSrc = value!">Reposicionar</app-button>
          <app-button variant="ghost" size="sm" icon="delete" (click)="update(undefined); touch()">Remover</app-button>
        </div>
      </div>
    </div>
    <app-image-cropper
      [src]="cropSrc"
      title="Ajustar foto de fundo"
      [aspect]="aspect"
      [outputWidth]="1200"
      (cropped)="apply($event)"
      (cancel)="cropSrc = null"
    ></app-image-cropper>
  `,
})
export class CoverUploadComponent extends FormControlBase<string | undefined> {
  @Input() aspect = COVER_ASPECT;
  cropSrc: string | null = null;

  constructor(@Self() @Optional() ngControl: NgControl | null, private toast: ToastService) { super(ngControl); }

  async pick(e: Event) {
    const input = e.target as HTMLInputElement;
    const f = input.files?.[0];
    if (!f) return;
    if (f.size > 10 * 1024 * 1024) return this.toast.error("A imagem deve ter até 10MB.");
    try {
      this.cropSrc = await readFileAsDataUrl(f);
    } catch {
      this.toast.error("Não foi possível carregar a imagem.");
    }
    input.value = "";
  }

  apply(dataUrl: string) {
    this.update(dataUrl);
    this.touch();
    this.cropSrc = null;
  }
}
