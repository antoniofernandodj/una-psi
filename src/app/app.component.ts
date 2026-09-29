import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `<router-outlet></router-outlet><app-toast-host></app-toast-host>`,
})
export class AppComponent {}
