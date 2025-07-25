import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

type StorageItem = {
  value: any;
};

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}

  getItem<T>(key: string): Observable<T | null> {
    let r1 = localStorage.getItem(key);
    let r2 = sessionStorage.getItem(key);
    let result: string | null = r1 || r2;
    if (result) {
      let resultObject: StorageItem = JSON.parse(result);
      return of(resultObject.value as T);
    }

    return of(null);
  }

  setItem(key: string, value: any, remember: boolean = true): Observable<void> {
    if (remember) {
      localStorage.setItem(key, JSON.stringify({ value }));
    } else {
      sessionStorage.setItem(key, JSON.stringify({ value }));
    }
    return of(undefined); // ou of(void 0);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
    sessionStorage.clear();
  }
}
