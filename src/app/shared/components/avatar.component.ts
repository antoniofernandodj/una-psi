import { Component, Input } from "@angular/core";
import { initials } from "../../core/utils/misc";

@Component({
  selector: "app-avatar",
  template: `
    <div class="relative inline-block">
      <div
        class="rounded-full overflow-hidden bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-semibold shadow-sm"
        [style.width.px]="size"
        [style.height.px]="size"
        [style.font-size.px]="size / 3"
      >
        <img *ngIf="src; else fallback" [src]="src" [alt]="name" class="w-full h-full object-cover" />
        <ng-template #fallback>{{ initials(name) }}</ng-template>
      </div>
      <span
        *ngIf="online"
        class="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-tertiary-fixed-dim rounded-full ring-2 ring-white"
        title="Disponível"
      ></span>
    </div>
  `,
})
export class AvatarComponent {
  @Input() src?: string | null;
  @Input() name = "";
  @Input() size = 48;
  @Input() online = false;
  initials = initials;
}
