import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { default as countries } from '../../assets/json/countries.json';
import { GetLanguages } from '../extensions/get-languages';
import { VoicesClassifier } from '../extensions/voices-classifier';
import { Globals } from '../globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  countriesList: Array<any> = countries;

  public innerHeight: any;

  constructor(private translateService: TranslateService, private globals: Globals, private router: Router) { }

  ngOnInit(): void {
    this.innerHeight = window.innerHeight * .75;

    if (sessionStorage.getItem('lng')) {
      window.location.href = `${document.location.origin}/options`;
    }
  }

  setLng(id:number) {
    let tmpLng = 'en';
    let cLng = countries[id - 1].lng;
    let getLanguages = new GetLanguages(this.globals);
    let aLang = getLanguages.isLangAvailable(cLng);

    tmpLng = aLang[0];

    new VoicesClassifier(aLang[1]);

    this.translateService.setDefaultLang(tmpLng);

    sessionStorage.setItem('lng', tmpLng);
    sessionStorage.setItem('countryId', id.toString());

    this.router.navigate(['/intro']);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.innerHeight = window.innerHeight * .75;
  }

}
