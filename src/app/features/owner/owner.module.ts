import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { ApproachesPanelComponent } from "./approaches-panel.component";
import { OwnerHomeComponent } from "./owner-home.component";
import { SpecialtiesPanelComponent } from "./specialties-panel.component";
import { TaxonomyFormModalComponent } from "./taxonomy-form-modal.component";

@NgModule({
  declarations: [ApproachesPanelComponent, OwnerHomeComponent, SpecialtiesPanelComponent, TaxonomyFormModalComponent],
  imports: [SharedModule, RouterModule.forChild([{ path: "", component: OwnerHomeComponent }])],
})
export class OwnerModule {}
