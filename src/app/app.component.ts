import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AuthService, User } from "./services/auth.service";
import { Title } from "@angular/platform-browser";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private authService = inject(AuthService);
  private titleService = inject(Title);

  currentUser$: Observable<User | null> = this.authService.currentUser$;

  ngOnInit() {
    this.titleService.setTitle("UnaPsi");
  }
}
