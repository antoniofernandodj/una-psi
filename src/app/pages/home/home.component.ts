import { Component } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { AuthService, User } from "src/app/services/auth.service";
import { StorageService } from "src/app/services/storage.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  currentUser$: Observable<User | null> = this.authService.currentUser$;
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
  ) {}
}
