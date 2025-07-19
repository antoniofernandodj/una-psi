import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AuthService, User } from "src/app/services/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  currentUser$ = this.authService.currentUser$;
  constructor(private authService: AuthService) {}
}
