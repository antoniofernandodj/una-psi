import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

import { handleInvalidForm } from "../utils";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  userForm: FormGroup;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  constructor(private router: Router) {
    this.userForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      remember: [false],
    });
  }

  // onLoginFormSubmit() {}

  onLoginFormSubmit() {
    if (!this.userForm.valid) {
      return handleInvalidForm(this.userForm);
    }

    let { email, password, remember } = this.userForm.value;

    this.authService.login(email, password, remember).subscribe({
      next: (result) => {
        if (result) {
          window.alert("Login realizado com sucesso!");
          this.router.navigate(["/home"]);
        } else {
          window.alert("Login falhou!");
        }
      },
      error: (error) => {
        window.alert(`Erro ao realizar login: ${error}`);
      },
    });
  }
}
