import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService, UserClass } from "src/app/services/auth.service";
import { handleInvalidForm } from "../utils";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent {
  registerForm: FormGroup;
  UserClass = UserClass;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      crp: [""],
      specialty: [""],
      confirmPassword: ["", [Validators.required, Validators.minLength(6)]],
      remember: [false],
      userClass: ["patient"],
    });
  }

  onRegisterFormSubmit() {
    if (!this.registerForm.valid) {
      return handleInvalidForm(this.registerForm);
    }

    if (
      this.registerForm.value.password !==
      this.registerForm.value.confirmPassword
    ) {
      window.alert("As senhas não coincidem!");
      return;
    }

    let {
      name,
      email,
      password,
      confirmPassword,
      userClass,
      remember,
      crp,
      specialty,
    } = this.registerForm.value;

    this.authService
      .signin(name, email, password, userClass, remember, crp, specialty)
      .subscribe({
        next: (result: boolean) => {
          if (result) {
            window.alert("Cadastro realizado com sucesso!");
            this.router.navigate(["/home"]);
          } else {
            window.alert("Cadastro falhou!");
          }
        },
        error: (error) => {
          window.alert(`Erro ao realizar cadastro: ${error}`);
        },
      });
  }
}
