import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SeedService } from "./core/services/seed.service";
import { LogoutComponent } from "./features/logout.component";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent, LogoutComponent],
  imports: [BrowserModule, SharedModule, AppRoutingModule],
  providers: [{ provide: APP_INITIALIZER, useFactory: (seed: SeedService) => () => seed.run(), deps: [SeedService], multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
