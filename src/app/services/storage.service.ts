import { Injectable } from "@angular/core";

type StorageItem = {
  value: any;
};

@Injectable({
  providedIn: "root",
})
export class StorageService {
  storage: Storage;
  constructor(storage: Storage) {
    this.storage = storage;
  }

  getItem(key: string): any | null {
    let result: string | null = this.storage.getItem(key);
    if (result) {
      let resultObject: StorageItem = JSON.parse(result);
      return resultObject.value;
    }

    return null;
  }

  setItem(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify({ value }));
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}
