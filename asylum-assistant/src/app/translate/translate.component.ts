import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { default as countries } from '../../assets/json/countries.json';
import { GetLanguages } from '../extensions/get-languages';
import { VoicesClassifier } from '../extensions/voices-classifier';
import { Globals } from '../globals';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {
  countriesList: Array<any> = countries.filter(function(el) { return el.isSupported });

  constructor(public activeModal: NgbActiveModal, private translateService: TranslateService, private globals: Globals) { }

  ngOnInit(): void {
  }

  changeCountry(id:number){
    let tmpLng = 'en';
    let currentLng = this.countriesList[id - 1].lng;
    let getLanguages = new GetLanguages(this.globals);
    let aLang = getLanguages.isLangAvailable(currentLng);

    tmpLng = aLang[0];

    new VoicesClassifier(aLang[1]);

    this.translateService.setDefaultLang(tmpLng);

    this.activeModal.close();
  }

}
