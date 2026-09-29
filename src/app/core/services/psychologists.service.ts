import { Injectable } from "@angular/core";
import { combineLatest, map, Observable } from "rxjs";
import { PsychologistProfile, PsychologistView } from "../models";
import { ApproachesStore, ProfilesStore, SpecialtiesStore, UsersStore } from "./stores";

export interface PsychologistFilters {
  search: string;
  specialtyId: string;
  approachId: string;
  minFee: number | null;
  maxFee: number | null;
  includeNoFee: boolean;
}

export const EMPTY_FILTERS: PsychologistFilters = {
  search: "",
  specialtyId: "",
  approachId: "",
  minFee: null,
  maxFee: null,
  includeNoFee: true,
};

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

@Injectable({ providedIn: "root" })
export class PsychologistsService {
  readonly all$: Observable<PsychologistView[]> = combineLatest([
    this.users.items$,
    this.profiles.items$,
    this.approaches.items$,
    this.specialties.items$,
  ]).pipe(
    map(([users, profiles, approaches, specialties]) =>
      users
        .filter((u) => u.role === "psychologist")
        .flatMap((user) => {
          const profile = profiles.find((p) => p.id === user.id);
          if (!profile) return [];
          return [
            {
              user,
              profile,
              approaches: approaches.filter((a) => profile.approachIds.includes(a.id)),
              specialties: specialties.filter((s) => profile.specialtyIds.includes(s.id)),
            },
          ];
        })
        .sort((a, b) => a.user.name.localeCompare(b.user.name, "pt-BR")),
    ),
  );

  constructor(
    private users: UsersStore,
    private profiles: ProfilesStore,
    private approaches: ApproachesStore,
    private specialties: SpecialtiesStore,
  ) {}

  view$(id: string | null): Observable<PsychologistView | undefined> {
    return this.all$.pipe(map((list) => list.find((p) => p.user.id === id)));
  }

  filter(list: PsychologistView[], f: PsychologistFilters): PsychologistView[] {
    const q = norm(f.search.trim());
    return list.filter(({ user, profile, approaches, specialties }) => {
      if (f.specialtyId && !profile.specialtyIds.includes(f.specialtyId)) return false;
      if (f.approachId && !profile.approachIds.includes(f.approachId)) return false;
      if (q) {
        const haystack = norm(
          [user.name, profile.bio ?? "", ...approaches.map((a) => a.name), ...specialties.map((s) => s.name)].join(" "),
        );
        if (!haystack.includes(q)) return false;
      }
      const fee = profile.sessionFee;
      if (fee == null) return f.includeNoFee;
      if (f.minFee != null && fee < f.minFee) return false;
      if (f.maxFee != null && fee > f.maxFee) return false;
      return true;
    });
  }

  saveProfile(profile: PsychologistProfile): void {
    this.profiles.upsert(profile);
  }
}
