import { Component } from "@angular/core";
import { ThemeService } from "./core/services/theme.service";

@Component({
  selector: "app-root",
  template: `
    <router-outlet></router-outlet>
    <app-toast-host></app-toast-host>
    <app-theme-toggle class="fixed bottom-4 left-4 z-40"></app-theme-toggle>
  `,
})
export class AppComponent {
  // injeta para aplicar o tema salvo já na inicialização
  constructor(_theme: ThemeService) {}
}
