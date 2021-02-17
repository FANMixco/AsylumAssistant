import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { IntroComponent } from './intro/intro.component';
import { OptionsComponent } from './options/options.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Globals } from './globals';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TranslateComponent } from './translate/translate.component';
import { GetLanguages } from './extensions/get-languages';
import { FooterComponent } from './footer/footer.component';

export function translateHttpLoaderFactory(http: HttpClient) {
  //return new TranslateHttpLoader(http);
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    IntroComponent,
    OptionsComponent,
    AboutComponent,
    HomeComponent,
    TranslateComponent,
    FooterComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateHttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ Globals ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private translateService: TranslateService, private globals: Globals) {
    this.setLng();
  }

  setLng():void {
    let currentLng = (sessionStorage.getItem('lng') === undefined || sessionStorage.getItem('lng') === null) ? window.navigator.language.substring(0, 2) : sessionStorage.getItem('lng');

    let getLanguages = new GetLanguages(this.globals);
    let aLang = getLanguages.isLangAvailable(currentLng);

    this.translateService.setDefaultLang(aLang[0]);
  }
}
