import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CountriesSelectComponent } from './home/countries-select/countries-select.component';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { IntroComponent } from './intro/intro.component';
import { OptionsComponent } from './options/options.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    CountriesSelectComponent,
    FormComponent,
    IntroComponent,
    OptionsComponent,
    AboutComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
