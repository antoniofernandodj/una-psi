import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ROLE_HOME } from "../../core/models";
import { AuthService } from "../../core/services/auth.service";
import { ToastService } from "../../core/services/toast.service";
import { onlyDigits } from "../../core/utils/masks";
import { buildProfileGroup, profileFromGroup } from "../../core/utils/profile-form";
import { matchesControl, phoneValidator, strongPassword } from "../../core/utils/validators";
import { SegmentOption } from "../../shared/components/segmented.component";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent {
  roleOptions: SegmentOption[] = [
    { value: "patient", label: "Quero fazer terapia", icon: "spa" },
    { value: "psychologist", label: "Sou Psicólogo(a)", icon: "psychology" },
  ];
  role: "patient" | "psychologist" = this.route.snapshot.queryParamMap.get("tipo") === "psicologo" ? "psychologist" : "patient";

  form = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    email: ["", [Validators.required, Validators.email]],
    phone: ["", [Validators.required, phoneValidator]],
    password: ["", [Validators.required, strongPassword]],
    confirmPassword: ["", [Validators.required, matchesControl("password")]],
    terms: [false, [Validators.requiredTrue]],
  });
  profile = buildProfileGroup(this.fb);

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService,
  ) {
    this.form.controls.password.valueChanges.subscribe(() => this.form.controls.confirmPassword.updateValueAndValidity());
  }

  get isPsychologist() { return this.role === "psychologist"; }

  submit() {
    this.form.markAllAsTouched();
    if (this.isPsychologist) this.profile.markAllAsTouched();
    if (this.form.invalid || (this.isPsychologist && this.profile.invalid)) {
      return this.toast.error("Revise os campos destacados.");
    }

    const { name, email, phone, password } = this.form.value;
    const ok = this.auth.register(
      {
        name: name!.trim(),
        email: email!,
        phone: onlyDigits(phone),
        password: password!,
        role: this.role,
        profile: this.isPsychologist ? profileFromGroup(this.profile) : undefined,
      },
      true,
    );
    if (!ok) return this.toast.error("Já existe uma conta com este e-mail.");

    this.toast.success("Cadastro realizado com sucesso!");
    this.router.navigate([ROLE_HOME[this.role]]);
  }
}
