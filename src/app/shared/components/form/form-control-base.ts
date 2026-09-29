import { Directive, Input, Optional, Self } from "@angular/core";
import { ControlValueAccessor, NgControl, Validators } from "@angular/forms";

export const DEFAULT_MESSAGES: Record<string, string> = {
  required: "Campo obrigatório.",
  email: "Informe um e-mail válido.",
  phone: "Informe um telefone com DDD (10 ou 11 dígitos).",
  crp: "Informe o CRP no formato 06/123456.",
  weakPassword: "Use 8+ caracteres com letras e números.",
  mismatch: "As senhas não coincidem.",
  minlength: "Valor muito curto.",
  maxItems: "Limite de seleções excedido.",
};

let nextId = 0;

/** Base para os campos de formulário: integra ControlValueAccessor + exibição de erros. */
@Directive()
export abstract class FormControlBase<T> implements ControlValueAccessor {
  @Input() label = "";
  @Input() hint = "";
  @Input() messages: Record<string, string> = {};
  @Input() required?: boolean;

  readonly id = `field-${nextId++}`;
  value!: T;
  disabled = false;
  protected onChange: (v: T) => void = () => {};
  protected onTouched: () => void = () => {};

  constructor(@Self() @Optional() private ngControl: NgControl | null) {
    if (ngControl) ngControl.valueAccessor = this;
  }

  get isRequired(): boolean {
    return this.required ?? this.ngControl?.control?.hasValidator(Validators.required) ?? false;
  }

  get error(): string | null {
    const c = this.ngControl?.control;
    if (!c || !c.invalid || !(c.touched || c.dirty)) return null;
    const key = Object.keys(c.errors ?? {})[0];
    return this.messages[key] ?? DEFAULT_MESSAGES[key] ?? "Valor inválido.";
  }

  writeValue(v: T): void { this.value = v; }
  registerOnChange(fn: (v: T) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.disabled = d; }

  touch(): void { this.onTouched(); }

  protected update(v: T): void {
    this.value = v;
    this.onChange(v);
  }
}
