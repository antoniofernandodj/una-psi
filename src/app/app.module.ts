import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';
import { PsychologistsComponent } from './pages/psychologists/psychologists.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, SigninComponent, PsychologistsComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
