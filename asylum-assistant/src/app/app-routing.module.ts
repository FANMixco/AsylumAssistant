import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesSelectComponent } from './home/countries-select/countries-select.component';
import { IntroComponent } from './intro/intro.component';


const routes: Routes = [
  { path: 'intro', component: IntroComponent },
  { path: 'countries-select', component: CountriesSelectComponent },
  { path: '',   redirectTo: '/countries-select', pathMatch: 'full' },
  { path: '**', component: CountriesSelectComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
