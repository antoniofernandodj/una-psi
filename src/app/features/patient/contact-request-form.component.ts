import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { User } from "../../core/models";
import { onlyDigits } from "../../core/utils/masks";
import { maskPhone } from "../../core/utils/masks";
import { phoneValidator } from "../../core/utils/validators";

export interface ContactRequestData {
  name: string;
  email: string;
  phone: string;
  preferredTime: string;
  message: string;
}

@Component({
  selector: "app-contact-request-form",
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <app-input formControlName="name" label="Seu nome" icon="person" placeholder="Nome completo"></app-input>
        <app-input formControlName="email" type="email" label="E-mail" icon="mail" placeholder="voce@email.com"></app-input>
        <app-input formControlName="phone" type="tel" label="Telefone / WhatsApp" icon="call" mask="phone" placeholder="(11) 98765-4321" [maxlength]="15"></app-input>
        <app-input formControlName="preferredTime" label="Preferência de horário" icon="event_available" placeholder="Ex: Quintas à tarde"></app-input>
      </div>
      <app-textarea
        formControlName="message"
        label="Como podemos ajudar?"
        placeholder="Conte brevemente o que motiva a busca por terapia..."
        [rows]="4"
        [maxlength]="600"
      ></app-textarea>
      <app-button type="submit" icon="send" [block]="true" size="lg">Enviar solicitação de contato</app-button>
    </form>
  `,
})
export class ContactRequestFormComponent {
  @Input() set user(u: User | null) {
    if (u && !this.form.dirty) this.form.patchValue({ name: u.name, email: u.email, phone: maskPhone(u.phone) });
  }
  @Output() send = new EventEmitter<ContactRequestData>();

  form = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    email: ["", [Validators.required, Validators.email]],
    phone: ["", [Validators.required, phoneValidator]],
    preferredTime: [""],
    message: ["", [Validators.required, Validators.minLength(10)]],
  });

  constructor(private fb: FormBuilder) {}

  submit() {
    if (this.form.invalid) return this.form.markAllAsTouched();
    const v = this.form.getRawValue();
    this.send.emit({
      name: v.name!.trim(),
      email: v.email!.trim(),
      phone: onlyDigits(v.phone),
      preferredTime: v.preferredTime!.trim(),
      message: v.message!.trim(),
    });
    this.form.reset({ name: v.name, email: v.email, phone: v.phone, preferredTime: "", message: "" });
  }
}
