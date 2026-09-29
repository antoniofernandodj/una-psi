import { Injectable } from "@angular/core";
import { ApproachesStore, SpecialtiesStore, UsersStore } from "./stores";
import { APPROACH_SEED, OWNER_SEED, SPECIALTY_SEED } from "./seed-data";

/** Popula a plataforma na primeira execução: conta owner, abordagens e especialidades. */
@Injectable({ providedIn: "root" })
export class SeedService {
  constructor(
    private users: UsersStore,
    private approaches: ApproachesStore,
    private specialties: SpecialtiesStore,
  ) {}

  run(): void {
    if (!this.users.items.some((u) => u.role === "owner")) {
      this.users.upsert({ ...OWNER_SEED, role: "owner", createdAt: new Date().toISOString() });
    }

    if (!this.approaches.items.length) {
      APPROACH_SEED.forEach(([name, description]) => this.approaches.upsert({ name, description, active: true }));
    }

    if (!this.specialties.items.length) {
      Object.entries(SPECIALTY_SEED).forEach(([category, names]) =>
        names.forEach((name) => this.specialties.upsert({ name, category, keywords: [], active: true })),
      );
    }
  }
}
