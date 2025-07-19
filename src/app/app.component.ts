import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthService, User } from "./services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = "angular-test";
  currentUser$ = this.authService.currentUser$;

  constructor(private authService: AuthService) {}
}
