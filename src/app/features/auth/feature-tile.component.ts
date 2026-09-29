import { Component, Input } from "@angular/core";

@Component({
  selector: "app-feature-tile",
  template: `
    <div class="flex items-start gap-4 bg-surface-container-lowest rounded-2xl p-5 shadow-sm">
      <span class="w-11 h-11 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center shrink-0">
        <app-icon [name]="icon"></app-icon>
      </span>
      <div>
        <h4 class="text-label-lg text-on-surface">{{ title }}</h4>
        <p class="text-body-sm text-on-surface-variant mt-0.5"><ng-content></ng-content></p>
      </div>
    </div>
  `,
})
export class FeatureTileComponent {
  @Input() icon = "";
  @Input() title = "";
}
