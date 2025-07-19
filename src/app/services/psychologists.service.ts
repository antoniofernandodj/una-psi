import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { Observable, of } from "rxjs";
import { filter, map, switchMap } from "rxjs/operators";
import { User, UserClass } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class PsychologistsService {
  private readonly STORAGE_KEY = "users";

  constructor(private storageService: StorageService) {}

  addPsychologist(newPsychologist: User): Observable<boolean> {
    return this.storageService.getItem<User[]>(this.STORAGE_KEY).pipe(
      map((psychologists) => psychologists || []),
      switchMap((psychologists) => {
        const alreadyExists = psychologists.some(
          (p) => p.email === newPsychologist.email,
        );

        if (alreadyExists) {
          return of(false);
        }

        psychologists.push(newPsychologist);
        return this.storageService
          .setItem(this.STORAGE_KEY, psychologists, true)
          .pipe(map(() => true));
      }),
    );
  }

  getAllPsychologists(): Observable<User[]> {
    return this.storageService.getItem<User[]>(this.STORAGE_KEY).pipe(
      map((users) => {
        const allUsers = users || [];
        return allUsers.filter(
          (user) => user.userClass === UserClass.PSYCHOLOGIST,
        );
      }),
    );
  }

  getPsychologistByEmail(email: string): Observable<User | null> {
    return this.getAllPsychologists().pipe(
      map(
        (psychologists) => psychologists.find((p) => p.email === email) || null,
      ),
    );
  }

  removePsychologist(email: string): Observable<boolean> {
    return this.getAllPsychologists().pipe(
      switchMap((psychologists) => {
        const updated = psychologists.filter((p) => p.email !== email);
        return this.storageService
          .setItem(this.STORAGE_KEY, updated, true)
          .pipe(map(() => true));
      }),
    );
  }
}
