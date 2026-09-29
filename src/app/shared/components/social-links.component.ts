import { Component, Input } from "@angular/core";
import { PsychologistProfile } from "../../core/models";
import { socialUrl } from "../../core/utils/misc";
import { SOCIALS } from "../constants";

@Component({
  selector: "app-social-links",
  template: `
    <div *ngIf="links.length" class="flex flex-wrap items-center gap-2">
      <span class="text-label-sm text-on-surface-variant mr-1">Canais profissionais:</span>
      <a
        *ngFor="let l of links"
        [href]="l.url"
        target="_blank"
        rel="noopener noreferrer"
        [attr.aria-label]="l.label"
        [title]="l.label"
        class="w-9 h-9 rounded-full bg-surface-container text-secondary flex items-center justify-center hover:bg-secondary-fixed transition-colors"
      >
        <app-icon [name]="l.icon" [size]="18"></app-icon>
      </a>
    </div>
  `,
})
export class SocialLinksComponent {
  @Input() set profile(p: PsychologistProfile) {
    this.links = SOCIALS.filter((s) => s.key !== "whatsapp" && p[s.key]).map((s) => ({
      label: s.label,
      icon: s.icon,
      url: socialUrl(s.key as any, p[s.key]!),
    }));
  }
  links: { label: string; icon: string; url: string }[] = [];
}
