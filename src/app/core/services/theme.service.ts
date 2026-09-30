import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StorageService } from "./storage.service";

export type Theme = "rose" | "blue";

/** Alterna a paleta aplicando `data-theme` no <html> (tokens definidos em styles.css). */
@Injectable({ providedIn: "root" })
export class ThemeService {
  private readonly KEY = "unapsi.theme";
  readonly theme$ = new BehaviorSubject<Theme>(this.storage.get<Theme>(this.KEY) === "blue" ? "blue" : "rose");

  constructor(private storage: StorageService) {
    this.apply(this.theme$.value);
  }

  toggle(): void {
    this.set(this.theme$.value === "rose" ? "blue" : "rose");
  }

  set(theme: Theme): void {
    this.storage.set(this.KEY, theme);
    this.theme$.next(theme);
    this.apply(theme);
  }

  private apply(theme: Theme): void {
    document.documentElement.dataset["theme"] = theme;
  }
}
