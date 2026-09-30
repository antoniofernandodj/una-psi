import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";

/** Modal para reposicionar (arrastar) e dar zoom numa imagem antes de enviá-la; devolve o recorte em JPEG. */
@Component({
  selector: "app-image-cropper",
  template: `
    <app-modal [open]="!!src" [title]="title" icon="crop" (closed)="cancel.emit()">
      <ng-container *ngIf="src">
        <p class="text-body-sm text-on-surface-variant mb-3">Arraste a imagem para posicionar e use o controle para ajustar o zoom.</p>
        <div
          #viewport
          class="relative mx-auto w-full overflow-hidden bg-inverse-surface cursor-grab active:cursor-grabbing select-none touch-none"
          [class]="round ? 'rounded-full max-w-[300px]' : 'rounded-xl'"
          [style.aspect-ratio]="aspect"
          (pointerdown)="down($event)"
          (pointermove)="move($event)"
          (pointerup)="up($event)"
          (pointercancel)="up($event)"
          (wheel)="wheel($event)"
        >
          <img
            #img
            [src]="src"
            alt=""
            draggable="false"
            class="absolute top-0 left-0 max-w-none pointer-events-none"
            [style.width.px]="nw * scale"
            [style.transform]="'translate(' + x + 'px,' + y + 'px)'"
            (load)="init()"
          />
        </div>
        <div class="flex items-center gap-3 mt-4">
          <app-icon name="zoom_out" [size]="20" class="text-outline"></app-icon>
          <input type="range" min="1" max="4" step="0.01" [value]="zoom" (input)="setZoom(+$any($event.target).value)" class="flex-1 accent-secondary" aria-label="Zoom" />
          <app-icon name="zoom_in" [size]="20" class="text-outline"></app-icon>
        </div>
        <div class="flex justify-end gap-3 mt-5">
          <app-button variant="tonal" (click)="cancel.emit()">Cancelar</app-button>
          <app-button icon="check" (click)="confirm()">Usar imagem</app-button>
        </div>
      </ng-container>
    </app-modal>
  `,
})
export class ImageCropperComponent {
  /** Imagem de origem (data URL); vazio = fechado. */
  @Input() src: string | null = null;
  @Input() title = "Ajustar imagem";
  /** largura / altura do recorte */
  @Input() aspect = 1;
  @Input() round = false;
  /** largura em px da imagem final */
  @Input() outputWidth = 400;
  @Output() cropped = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  @ViewChild("viewport") viewport?: ElementRef<HTMLElement>;
  @ViewChild("img") imgEl?: ElementRef<HTMLImageElement>;

  nw = 0;
  nh = 0;
  zoom = 1;
  x = 0;
  y = 0;
  private vw = 0;
  private vh = 0;
  private drag: { px: number; py: number; ox: number; oy: number } | null = null;

  get scale() { return this.vw ? Math.max(this.vw / this.nw, this.vh / this.nh) * this.zoom : 1; }

  init() {
    const img = this.imgEl!.nativeElement;
    const vp = this.viewport!.nativeElement;
    this.nw = img.naturalWidth;
    this.nh = img.naturalHeight;
    this.vw = vp.clientWidth;
    this.vh = vp.clientHeight;
    this.zoom = 1;
    this.x = (this.vw - this.nw * this.scale) / 2;
    this.y = (this.vh - this.nh * this.scale) / 2;
  }

  down(e: PointerEvent) {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    this.drag = { px: e.clientX, py: e.clientY, ox: this.x, oy: this.y };
  }

  move(e: PointerEvent) {
    if (!this.drag) return;
    this.place(this.drag.ox + e.clientX - this.drag.px, this.drag.oy + e.clientY - this.drag.py);
  }

  up(_: PointerEvent) { this.drag = null; }

  wheel(e: WheelEvent) {
    e.preventDefault();
    this.setZoom(this.zoom - e.deltaY * 0.002);
  }

  setZoom(z: number) {
    const old = this.scale;
    this.zoom = Math.min(4, Math.max(1, z));
    const ratio = this.scale / old;
    // mantém o centro do recorte fixo durante o zoom
    this.place(this.vw / 2 - (this.vw / 2 - this.x) * ratio, this.vh / 2 - (this.vh / 2 - this.y) * ratio);
  }

  confirm() {
    const outW = this.outputWidth;
    const outH = Math.round(outW / this.aspect);
    const s = this.scale;
    const canvas = document.createElement("canvas");
    canvas.width = outW;
    canvas.height = outH;
    canvas.getContext("2d")!.drawImage(this.imgEl!.nativeElement, -this.x / s, -this.y / s, this.vw / s, this.vh / s, 0, 0, outW, outH);
    this.cropped.emit(canvas.toDataURL("image/jpeg", 0.85));
  }

  /** Posiciona a imagem garantindo que ela sempre cubra todo o recorte. */
  private place(x: number, y: number) {
    this.x = Math.min(0, Math.max(this.vw - this.nw * this.scale, x));
    this.y = Math.min(0, Math.max(this.vh - this.nh * this.scale, y));
  }
}
