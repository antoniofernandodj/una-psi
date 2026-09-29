import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { guestGuard, homeRedirectGuard, roleGuard } from "./core/guards/role.guard";
import { LogoutComponent } from "./features/logout.component";
import { MainLayoutComponent } from "./shared/components/main-layout.component";

const routes: Routes = [
  { path: "", pathMatch: "full", canActivate: [homeRedirectGuard], children: [] },
  {
    path: "",
    canActivate: [guestGuard],
    loadChildren: () => import("./features/auth/auth.module").then((m) => m.AuthModule),
  },
  { path: "logout", component: LogoutComponent },
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      { path: "paciente", loadChildren: () => import("./features/patient/patient.module").then((m) => m.PatientModule) },
      {
        path: "psicologo",
        canActivate: [roleGuard("psychologist")],
        loadChildren: () => import("./features/psychologist/psychologist.module").then((m) => m.PsychologistModule),
      },
      {
        path: "owner",
        canActivate: [roleGuard("owner")],
        loadChildren: () => import("./features/owner/owner.module").then((m) => m.OwnerModule),
      },
    ],
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
