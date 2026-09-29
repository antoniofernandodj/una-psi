import { Component, Input } from "@angular/core";
import { formatBRL } from "../../core/utils/masks";

/** Valor da sessão. Só renderiza quando o psicólogo informou um valor. */
@Component({
  selector: "app-price",
  template: `
    <span *ngIf="fee != null" class="font-bold text-on-surface">
      {{ format(fee) }} <span class="text-body-sm font-normal text-on-surface-variant">/ sessão</span>
    </span>
  `,
})
export class PriceComponent {
  @Input() fee?: number | null;
  format = formatBRL;
}
