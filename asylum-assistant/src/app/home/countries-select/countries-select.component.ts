import { Component, OnInit } from '@angular/core';
import countries from '../../../assets/json/countries.json';

@Component({
  selector: 'app-countries-select',
  templateUrl: './countries-select.component.html',
  styleUrls: ['./countries-select.component.css']
})
export class CountriesSelectComponent implements OnInit {

  selectedCountry: number = -1;

  countriesList: Array<any> = countries;

  constructor() { }

  ngOnInit(): void {
    this.selectedCountry = -1;
    //this.selectedCountry = this.countriesList.filter(a => a.defaultSelected)[0].value;
  }

  public changeValue() {
    this.selectedCountry = this.countriesList.filter(a => a.defaultSelected)[0].value;
  }

}
