import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { FutureInterest, InterestStatus } from "../models";
import { InterestsStore } from "./stores";

@Injectable({ providedIn: "root" })
export class InterestsService {
  constructor(private store: InterestsStore) {}

  forPsychologist$(psychologistId: string): Observable<FutureInterest[]> {
    return this.store.items$.pipe(
      map((items) =>
        items.filter((i) => i.psychologistId === psychologistId).sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
      ),
    );
  }

  create(data: Omit<FutureInterest, "id" | "status" | "createdAt">): void {
    this.store.upsert({ ...data, status: "waiting", createdAt: new Date().toISOString() });
  }

  setStatus(id: string, status: InterestStatus): void {
    const current = this.store.find(id);
    if (current) this.store.upsert({ ...current, status });
  }

  remove(id: string): void {
    this.store.remove(id);
  }
}
