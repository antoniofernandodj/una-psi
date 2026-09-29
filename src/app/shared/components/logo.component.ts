import { Component, Input } from "@angular/core";

@Component({
  selector: "app-logo",
  template: `
    <span class="inline-flex items-center gap-2 font-bold text-primary" [class.text-headline-sm]="!small" [class.text-title-md]="small">
      <span class="w-9 h-9 rounded-xl bg-primary-container text-on-primary flex items-center justify-center">
        <app-icon name="psychology" [fill]="true"></app-icon>
      </span>
      UnaPsi
    </span>
  `,
})
export class LogoComponent {
  @Input() small = false;
}
