import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { SigninComponent } from "./pages/signin/signin.component";
import { LogoutComponent } from "./pages/logout";
import { PsychologistsComponent } from "./pages/psychologists/psychologists.component";

const routes: Routes = [
  // {
  //   path: "",
  //   redirectTo: "/home",
  //   pathMatch: "full",
  // },
  //
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "signin", component: SigninComponent },
  { path: "logout", component: LogoutComponent },
  { path: "psychologists", component: PsychologistsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
