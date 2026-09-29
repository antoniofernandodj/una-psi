import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { ContactRequestFormComponent } from "./contact-request-form.component";
import { PatientHomeComponent } from "./patient-home.component";
import { PsychologistCardComponent } from "./psychologist-card.component";
import { PsychologistDetailComponent } from "./psychologist-detail.component";
import { PsychologistFiltersComponent } from "./psychologist-filters.component";

@NgModule({
  declarations: [
    ContactRequestFormComponent, PatientHomeComponent, PsychologistCardComponent,
    PsychologistDetailComponent, PsychologistFiltersComponent,
  ],
  imports: [SharedModule, RouterModule.forChild([{ path: "", component: PatientHomeComponent }])],
})
export class PatientModule {}
