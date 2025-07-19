import { FormGroup } from "@angular/forms";

export function handleInvalidForm(form: FormGroup) {
  window.alert("Formulário inválido!");

  const invalidFields = Object.entries(form.controls)
    .filter(([_, control]) => control.invalid)
    .map(([key]) => key);

  console.log("Campos inválidos:", invalidFields);
}
