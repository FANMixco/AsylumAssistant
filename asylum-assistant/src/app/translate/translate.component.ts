import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import {default as countries} from '../../assets/json/countries.json';
import { Globals } from '../globals';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {
  countriesList: Array<any> = countries;

  constructor(public activeModal: NgbActiveModal, private translateService: TranslateService, private globals: Globals) { }

  ngOnInit(): void {
  }

  changeCountry(id:number){
    let tmpLng = 'en';
    let currentLng = this.countriesList[id - 1].lng;

    if (this.globals.availableLng.includes(currentLng))
      tmpLng = currentLng;

    this.translateService.setDefaultLang(tmpLng);
    this.activeModal.close();
  }

}
