import { Injectable } from "@angular/core";
import { PatientPreferences } from "../models";
import { PreferencesStore } from "./stores";

@Injectable({ providedIn: "root" })
export class PreferencesService {
  constructor(private store: PreferencesStore) {}

  get(userId: string | null | undefined): PatientPreferences | undefined {
    return this.store.find(userId);
  }

  save(userId: string, prefs: Omit<PatientPreferences, "id">): void {
    this.store.upsert({ ...prefs, id: userId });
  }
}
