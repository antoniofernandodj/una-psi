import { inject } from "@angular/core";
import { CanActivateFn, Router, UrlTree } from "@angular/router";
import { ROLE_HOME, Role } from "../models";
import { AuthService } from "../services/auth.service";

/** Exige um dos papéis informados; senão redireciona ao login ou à home do papel atual. */
export const roleGuard =
  (...roles: Role[]): CanActivateFn =>
  (): boolean | UrlTree => {
    const user = inject(AuthService).currentUser;
    const router = inject(Router);
    if (!user) return router.createUrlTree(["/login"]);
    return roles.includes(user.role) || router.createUrlTree([ROLE_HOME[user.role]]);
  };

/** Rota "/": manda cada papel para sua home (visitantes vão à home de paciente). */
export const homeRedirectGuard: CanActivateFn = (): UrlTree => {
  const user = inject(AuthService).currentUser;
  return inject(Router).createUrlTree([ROLE_HOME[user?.role ?? "patient"]]);
};

/** Login/cadastro: usuários autenticados vão direto à sua home. */
export const guestGuard: CanActivateFn = (): boolean | UrlTree => {
  const user = inject(AuthService).currentUser;
  return user ? inject(Router).createUrlTree([ROLE_HOME[user.role]]) : true;
};
