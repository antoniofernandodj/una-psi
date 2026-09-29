import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../core/services/auth.service";

@Component({ selector: "app-logout", template: "" })
export class LogoutComponent {
  constructor(auth: AuthService, router: Router) {
    auth.logout();
    router.navigate(["/login"]);
  }
}
