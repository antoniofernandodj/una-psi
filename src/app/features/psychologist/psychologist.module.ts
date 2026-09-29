import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { ProfileEditorComponent } from "./profile-editor.component";
import { PsychologistHomeComponent } from "./psychologist-home.component";
import { RequestCardComponent } from "./request-card.component";
import { RequestsInboxComponent } from "./requests-inbox.component";

@NgModule({
  declarations: [ProfileEditorComponent, PsychologistHomeComponent, RequestCardComponent, RequestsInboxComponent],
  imports: [SharedModule, RouterModule.forChild([{ path: "", component: PsychologistHomeComponent }])],
})
export class PsychologistModule {}
