import { Injectable } from "@angular/core";

/** Persistência em localStorage (lembrar) ou sessionStorage (sessão). */
@Injectable({ providedIn: "root" })
export class StorageService {
  get<T>(key: string): T | null {
    const raw = localStorage.getItem(key) ?? sessionStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  set(key: string, value: unknown, remember = true): void {
    this.remove(key);
    (remember ? localStorage : sessionStorage).setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }
}
