import { Component } from "@angular/core";

@Component({
  selector: "app-footer",
  template: `
    <footer class="mt-16 border-t border-outline-variant/30 bg-surface-container-lowest">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex flex-col gap-2 max-w-md">
          <app-logo [small]="true"></app-logo>
          <p class="text-body-sm text-on-surface-variant">
            Plataforma que conecta pacientes a psicólogos com acolhimento, rigor ético e segurança.
          </p>
        </div>
        <app-badge tone="tertiary" icon="verified_user">Conformidade CFP Resolução nº 11/2018</app-badge>
      </div>
    </footer>
  `,
})
export class FooterComponent {}
