import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
