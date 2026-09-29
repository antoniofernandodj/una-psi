import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ROLE_HOME } from "../../core/models";
import { AuthService } from "../../core/services/auth.service";
import { ToastService } from "../../core/services/toast.service";

@Component({
  selector: "app-login",
  template: `
    <app-auth-hero subtitle="Entre para acompanhar suas conexões com acolhimento e segurança.">
      <app-card>
        <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-5">
          <app-input formControlName="email" type="email" label="E-mail" icon="mail" placeholder="voce@email.com" autocomplete="email"></app-input>
          <app-input formControlName="password" type="password" label="Senha" icon="lock" placeholder="Sua senha" autocomplete="current-password"></app-input>
          <app-checkbox formControlName="remember">Manter conectado</app-checkbox>
          <app-button type="submit" icon="login" [block]="true" size="lg">Entrar</app-button>
        </form>
      </app-card>
      <p class="text-center text-body-sm text-on-surface-variant mt-6">
        Ainda não tem conta? <a routerLink="/signin" class="text-primary font-semibold hover:underline">Cadastre-se</a>
      </p>
    </app-auth-hero>
  `,
})
export class LoginComponent {
  form = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
    remember: [true],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: ToastService,
  ) {}

  submit() {
    if (this.form.invalid) return this.form.markAllAsTouched();
    const { email, password, remember } = this.form.value;
    if (!this.auth.login(email!, password!, !!remember)) {
      return this.toast.error("E-mail ou senha incorretos.");
    }
    this.router.navigate([ROLE_HOME[this.auth.currentUser!.role]]);
  }
}
