import { Component, Input } from "@angular/core";

@Component({
  selector: "app-icon",
  template: `<span
    class="material-symbols-outlined align-middle select-none"
    aria-hidden="true"
    [style.font-variation-settings]="fill ? &quot;'FILL' 1&quot; : null"
    [style.font-size.px]="size"
    >{{ name }}</span
  >`,
  styles: [":host { display: inline-flex; line-height: 1; }"],
})
export class IconComponent {
  @Input() name = "";
  @Input() fill = false;
  @Input() size: number | null = null;
}
