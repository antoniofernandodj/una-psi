import { Component } from "@angular/core";
import { Observable, of } from "rxjs";
import { User } from "src/app/services/auth.service";
import { PsychologistsService } from "src/app/services/psychologists.service";

@Component({
  selector: "app-psychologists",
  templateUrl: "./psychologists.component.html",
  styleUrls: ["./psychologists.component.css"],
})
export class PsychologistsComponent {
  psychologists$: Observable<User[]> = of([]);
  window = window;
  JSON = JSON;

  constructor(private psychService: PsychologistsService) {
    this.psychService.getAllPsychologists().subscribe((psychologists) => {
      this.psychologists$ = of(psychologists);
    });
  }

  addPsychologist(psy: User) {
    this.psychService.addPsychologist(psy).subscribe((ok) => {
      console.log(ok ? "Adicionado" : "Já existe");
    });
  }
}
