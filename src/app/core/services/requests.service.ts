import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ContactRequest, RequestStatus } from "../models";
import { RequestsStore } from "./stores";

@Injectable({ providedIn: "root" })
export class RequestsService {
  constructor(private store: RequestsStore) {}

  forPsychologist$(psychologistId: string): Observable<ContactRequest[]> {
    return this.store.items$.pipe(
      map((items) =>
        items
          .filter((r) => r.psychologistId === psychologistId)
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
      ),
    );
  }

  create(data: Omit<ContactRequest, "id" | "status" | "createdAt">): void {
    this.store.upsert({ ...data, status: "new", createdAt: new Date().toISOString() });
  }

  update(id: string, patch: Partial<Pick<ContactRequest, "status" | "notes">>): void {
    const current = this.store.find(id);
    if (!current) return;
    const leavingNew = current.status === "new" && patch.status && patch.status !== "new";
    this.store.upsert({ ...current, ...patch, respondedAt: current.respondedAt ?? (leavingNew ? new Date().toISOString() : undefined) });
  }
}
