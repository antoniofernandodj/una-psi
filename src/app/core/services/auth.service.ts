import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, map, Observable } from "rxjs";
import { PsychologistProfile, Role, User } from "../models";
import { InterestsStore, PreferencesStore, ProfilesStore, RequestsStore, UsersStore } from "./stores";
import { StorageService } from "./storage.service";

export type RegisterData = Omit<User, "id" | "createdAt"> & {
  profile?: Omit<PsychologistProfile, "id">;
};

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly SESSION_KEY = "unapsi.session";
  private sessionId$ = new BehaviorSubject<string | null>(this.storage.get<string>(this.SESSION_KEY));

  readonly currentUser$: Observable<User | null> = combineLatest([this.sessionId$, this.users.items$]).pipe(
    map(([id, users]) => users.find((u) => u.id === id) ?? null),
  );

  constructor(
    private storage: StorageService,
    private users: UsersStore,
    private profiles: ProfilesStore,
    private requests: RequestsStore,
    private interests: InterestsStore,
    private preferences: PreferencesStore,
  ) {
    this.touchLastSeen(this.sessionId$.value);
  }

  get currentUser(): User | null {
    return this.users.find(this.sessionId$.value) ?? null;
  }

  login(email: string, password: string, remember: boolean): boolean {
    const user = this.users.items.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
    );
    if (!user) return false;
    this.startSession(user.id, remember);
    return true;
  }

  /** Retorna false se o e-mail já estiver cadastrado. */
  register(data: RegisterData, remember: boolean): boolean {
    const email = data.email.trim().toLowerCase();
    if (this.users.items.some((u) => u.email.toLowerCase() === email)) return false;

    const { profile, ...userData } = data;
    const user = this.users.upsert({ ...userData, email, createdAt: new Date().toISOString() });
    if (data.role === "psychologist" && profile) {
      this.profiles.upsert({ ...profile, id: user.id });
    }
    this.startSession(user.id, remember);
    return true;
  }

  logout(): void {
    this.storage.remove(this.SESSION_KEY);
    this.sessionId$.next(null);
  }

  /** Apaga a conta do usuário logado, seu perfil público e as solicitações recebidas. */
  deleteAccount(): void {
    const user = this.currentUser;
    if (!user || user.role === "owner") return;
    this.logout();
    this.profiles.remove(user.id);
    this.requests.removeWhere((r) => r.psychologistId === user.id);
    this.interests.removeWhere((i) => i.psychologistId === user.id);
    this.preferences.remove(user.id);
    this.users.remove(user.id);
  }

  updateUser(patch: Partial<Pick<User, "name" | "phone">>): void {
    const user = this.currentUser;
    if (user) this.users.upsert({ ...user, ...patch });
  }

  hasRole(role: Role): boolean {
    return this.currentUser?.role === role;
  }

  private startSession(id: string, remember: boolean): void {
    this.storage.set(this.SESSION_KEY, id, remember);
    this.touchLastSeen(id, true);
    this.sessionId$.next(id);
  }

  /** Registra o último acesso (no máximo a cada 10 min, exceto em novo login). */
  private touchLastSeen(id: string | null, force = false): void {
    const user = this.users.find(id);
    if (!user) return;
    const last = user.lastSeenAt ? Date.parse(user.lastSeenAt) : 0;
    if (force || Date.now() - last > 10 * 60_000) this.users.upsert({ ...user, lastSeenAt: new Date().toISOString() });
  }
}
