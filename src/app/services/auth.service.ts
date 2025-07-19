import { Injectable } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { Observable, of, from, forkJoin, Subject, BehaviorSubject } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";

export class UserClass {
  static readonly PSYCHOLOGIST = "psychologist";
  static readonly PATIENT = "patient";
}

export type User = {
  name: string;
  email: string;
  password: string;
  userClass: string;

  crp?: string;
  specialty?: string;
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  currentUser: BehaviorSubject<User | null>;
  currentUser$: Observable<User | null>;

  constructor(private storageService: StorageService) {
    this.currentUser = new BehaviorSubject<User | null>(null);
    this.currentUser$ = this.currentUser.asObservable();
    this.storageService.getItem<User | null>("user").subscribe((user) => {
      this.currentUser.next(user);
    });
  }

  login(
    email: string,
    password: string,
    remember: boolean,
  ): Observable<boolean> {
    return this.storageService.getItem<User[] | null>("users").pipe(
      map((users: User[] | null) => {
        if (!users) return false;

        users = users.filter(
          (user) => user.email === email && user.password === password,
        );

        if (users.length > 0) {
          let user = users[0];
          this.storageService.setItem("user", user, remember);
          this.currentUser.next(user);
          return true;
        }

        return false;
      }),
    );
  }

  logout(): void {
    this.storageService.removeItem("user");
    this.currentUser.next(null);
  }

  signin(
    name: string,
    email: string,
    password: string,
    userClass: string,
    remember: boolean,
    crp?: string,
    specialty?: string,
  ): Observable<boolean> {
    const user: User = { name, email, password, userClass };

    if (crp) user.crp = crp;
    if (specialty) user.specialty = specialty;

    console.log({ user });

    return this.storageService.getItem<User[]>("users").pipe(
      switchMap((users: User[] | null) => {
        const updatedUsers = users ? [...users, user] : [user];

        return forkJoin({
          users: this.storageService.setItem("users", updatedUsers),
          user: this.storageService.setItem("user", user, remember),
        }).pipe(
          map(() => {
            this.currentUser.next(user);
            return true;
          }),
          catchError((error) => {
            console.error(error);
            return of(false);
          }),
        );
      }),
      catchError((error) => {
        console.error(error);
        return of(false);
      }),
    );
  }

  getUser(): Observable<User | null> {
    return this.storageService.getItem<User | null>("user");
  }
}
