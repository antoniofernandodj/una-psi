import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { PsychologistProfile, User } from "../../core/models";
import { AuthService } from "../../core/services/auth.service";
import { PsychologistsService } from "../../core/services/psychologists.service";
import { ToastService } from "../../core/services/toast.service";
import { maskPhone, onlyDigits } from "../../core/utils/masks";
import { buildProfileGroup, profileFromGroup } from "../../core/utils/profile-form";
import { phoneValidator } from "../../core/utils/validators";

@Component({
  selector: "app-profile-editor",
  template: `
    <form (ngSubmit)="save()" class="space-y-6">
      <app-card>
        <app-section-title [step]="1" title="Dados pessoais"></app-section-title>
        <div [formGroup]="account" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <app-input formControlName="name" label="Nome completo" icon="person"></app-input>
          <app-input formControlName="phone" type="tel" label="Telefone" icon="call" mask="phone" [maxlength]="15"></app-input>
        </div>
      </app-card>

      <app-card>
        <app-section-title [step]="2" tone="secondary" title="Perfil público"></app-section-title>
        <app-profile-fields [group]="profile" [name]="account.controls.name.value ?? ''"></app-profile-fields>
      </app-card>

      <div class="flex justify-end">
        <app-button type="submit" size="lg" icon="save">Salvar alterações</app-button>
      </div>
    </form>
  `,
})
export class ProfileEditorComponent implements OnInit {
  @Input() user!: User;
  @Input() profileData!: PsychologistProfile;

  account = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    phone: ["", [Validators.required, phoneValidator]],
  });
  profile = buildProfileGroup(this.fb);

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private service: PsychologistsService,
    private toast: ToastService,
  ) {}

  ngOnInit() {
    this.account.setValue({ name: this.user.name, phone: maskPhone(this.user.phone) });
    this.profile = buildProfileGroup(this.fb, this.profileData);
  }

  save() {
    this.account.markAllAsTouched();
    this.profile.markAllAsTouched();
    if (this.account.invalid || this.profile.invalid) return this.toast.error("Revise os campos destacados.");

    this.auth.updateUser({ name: this.account.value.name!.trim(), phone: onlyDigits(this.account.value.phone) });
    this.service.saveProfile({ ...profileFromGroup(this.profile), id: this.user.id });
    this.toast.success("Perfil atualizado com sucesso!");
  }
}
