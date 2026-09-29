import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { AuthHeroComponent } from "./auth-hero.component";
import { FeatureTileComponent } from "./feature-tile.component";
import { LoginComponent } from "./login.component";
import { RegisterComponent } from "./register.component";

@NgModule({
  declarations: [AuthHeroComponent, FeatureTileComponent, LoginComponent, RegisterComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: "login", component: LoginComponent },
      { path: "signin", component: RegisterComponent },
    ]),
  ],
})
export class AuthModule {}
