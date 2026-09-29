import { Injectable } from "@angular/core";
import { combineLatest, map, Observable } from "rxjs";
import { Approach, Specialty } from "../models";
import { ApproachesStore, ProfilesStore, SpecialtiesStore } from "./stores";

export type TaxonomyKind = "approach" | "specialty";

@Injectable({ providedIn: "root" })
export class CatalogService {
  readonly approaches$ = this.approachesStore.items$.pipe(map((l) => this.byName(l)));
  readonly specialties$ = this.specialtiesStore.items$.pipe(map((l) => this.byName(l)));
  readonly activeApproaches$ = this.approaches$.pipe(map((l) => l.filter((a) => a.active)));
  readonly activeSpecialties$ = this.specialties$.pipe(map((l) => l.filter((s) => s.active)));

  /** Quantidade de psicólogos vinculados por id de abordagem/especialidade. */
  readonly usage$: Observable<{ approach: Map<string, number>; specialty: Map<string, number> }> = this.profiles.items$.pipe(
    map((profiles) => {
      const count = (ids: string[][]) => {
        const m = new Map<string, number>();
        ids.flat().forEach((id) => m.set(id, (m.get(id) ?? 0) + 1));
        return m;
      };
      return {
        approach: count(profiles.map((p) => p.approachIds)),
        specialty: count(profiles.map((p) => p.specialtyIds)),
      };
    }),
  );

  constructor(
    private approachesStore: ApproachesStore,
    private specialtiesStore: SpecialtiesStore,
    private profiles: ProfilesStore,
  ) {}

  saveApproach(a: Omit<Approach, "id"> & { id?: string }) { return this.approachesStore.upsert(a); }
  saveSpecialty(s: Omit<Specialty, "id"> & { id?: string }) { return this.specialtiesStore.upsert(s); }
  removeApproach(id: string) { this.approachesStore.remove(id); }
  removeSpecialty(id: string) { this.specialtiesStore.remove(id); }

  private byName<T extends { name: string }>(list: T[]): T[] {
    return [...list].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  }
}
