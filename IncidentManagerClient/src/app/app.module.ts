import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { BasePageComponent } from './partials/base-page/base-page.component';
import { ModelModule } from './model/model.module';
import { IncidentModule } from './incident/incident.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BasePageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ModelModule, IncidentModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
