import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countries-select',
  templateUrl: './countries-select.component.html',
  styleUrls: ['./countries-select.component.css']
})
export class CountriesSelectComponent implements OnInit {

  selectedCountry: number = -1;

  countriesList: Array<any> = [
    {
      "id": 1,
      "name": "المغرب/Maroc",
      "flag": "./assets/images/morocco.png"
    },
    {
      "id": 2,
      "name": "تونس/Tunisie",
      "flag": "./assets/images/tunisia.png"
    },
    {
      "id": 3,
      "name": "ليبيا/Libye",
      "flag": "./assets/images/libya.png"
    },
    {
      "id": 4,
      "name": "سوريا/Syria",
      "flag": "./assets/images/syria.png"
    },
    {
      "id": 5,
      "name": "عربي صحراوي/RASD",
      "flag": "./assets/images/sahrawi.png"
    },
    {
      "id": 6,
      "name": "Nigeria",
      "flag": "./assets/images/nigeria.png"
    },
    {
      "id": 7,
      "name": "Mali",
      "flag": "./assets/images/mali.png"
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.selectedCountry = -1;
    //this.selectedCountry = this.countriesList.filter(a => a.defaultSelected)[0].value;
  }

  public changeValue() {
    this.selectedCountry = this.countriesList.filter(a => a.defaultSelected)[0].value;
  }

}
