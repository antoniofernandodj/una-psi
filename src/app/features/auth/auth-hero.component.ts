import { Component, Input } from "@angular/core";

/** Moldura das páginas de acesso: selo, título e conteúdo centralizado. */
@Component({
  selector: "app-auth-hero",
  template: `
    <div class="min-h-screen flex flex-col items-center px-4 py-10">
      <div class="w-full" [class]="wide ? 'max-w-6xl' : 'max-w-md'">
        <div class="text-center max-w-2xl mx-auto mb-8">
          <a routerLink="/" class="inline-block mb-4"><app-logo></app-logo></a>
          <div>
            <app-badge tone="secondary" icon="health_and_safety">Plataforma Certificada pelo CFP</app-badge>
          </div>
          <h1 class="text-headline-lg text-on-surface tracking-tight mt-3 mb-2">
            {{ title }} <span class="text-primary font-bold">UnaPsi</span>
          </h1>
          <p class="text-body-md text-on-surface-variant">{{ subtitle }}</p>
          <ng-content select="[heroExtra]"></ng-content>
        </div>
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class AuthHeroComponent {
  @Input() title = "Boas-vindas ao";
  @Input() subtitle = "";
  @Input() wide = false;
}
