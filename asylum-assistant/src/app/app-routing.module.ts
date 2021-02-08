import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { IntroComponent } from './intro/intro.component';
import { OptionsComponent } from './options/options.component';

const routes: Routes = [
  { path: 'intro', component: IntroComponent },
  { path: 'home', component: HomeComponent },
  { path: 'form', component: FormComponent },
  { path: 'options', component: OptionsComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '404', component: AppComponent },
  { path: '**', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
