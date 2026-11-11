import { Component, Input } from "@angular/core";
import { Compatibility, MATCH_META } from "../../core/utils/compatibility";

/** Selo de compatibilidade: cor (verde/amarelo/cinza) + emoji + percentual + barra. Nunca depende só da cor. */
@Component({
  selector: "app-match-badge",
  template: `
    <div *ngIf="match" class="inline-flex flex-col gap-1" [title]="match.label + ' (' + match.score + '%)'">
      <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-label-sm whitespace-nowrap" [class]="meta.classes">
        <span aria-hidden="true">{{ match.emoji }}</span>
        {{ compact ? match.score + "%" : match.label + " · " + match.score + "%" }}
      </span>
      <span *ngIf="!compact" class="block h-1.5 rounded-full bg-surface-container overflow-hidden" aria-hidden="true">
        <span class="block h-full rounded-full" [class]="meta.bar" [style.width.%]="match.score"></span>
      </span>
    </div>
  `,
})
export class MatchBadgeComponent {
  @Input() match: Compatibility | null = null;
  @Input() compact = false;
  get meta() { return MATCH_META[this.match!.level]; }
}
