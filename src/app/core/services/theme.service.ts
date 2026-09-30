import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StorageService } from "./storage.service";

export type Theme = "una" | "rose" | "blue";

/** Alterna a paleta aplicando `data-theme` no <html> (tokens definidos em styles.css). */
@Injectable({ providedIn: "root" })
export class ThemeService {
  private readonly KEY = "unapsi.theme";
  readonly theme$ = new BehaviorSubject<Theme>(this.initial());

  constructor(private storage: StorageService) {
    this.apply(this.theme$.value);
  }

  set(theme: Theme): void {
    this.storage.set(this.KEY, theme);
    this.theme$.next(theme);
    this.apply(theme);
  }

  private initial(): Theme {
    const saved = this.storage.get<Theme>(this.KEY);
    return saved === "rose" || saved === "blue" ? saved : "una";
  }

  private apply(theme: Theme): void {
    document.documentElement.dataset["theme"] = theme;
  }
}
