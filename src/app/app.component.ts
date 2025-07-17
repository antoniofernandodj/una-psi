import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "angular-test";

  userForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      remember: [false],
    });

    this.registerForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(6)]],
      remember: [false],
      userClass: ["patient"],
    });
  }

  onLoginFormSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
  }

  onRegisterFormSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }
  }

  ngOnInit() {
    this.userForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
}
