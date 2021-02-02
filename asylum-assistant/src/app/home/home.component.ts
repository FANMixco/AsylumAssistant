import { Component, HostListener, OnInit } from '@angular/core';
import {default as countries} from '../../assets/json/countries.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedCountry: number = -1;

  countriesList: Array<any> = countries;

  public innerHeight: any;

  constructor() { }

  ngOnInit(): void {
    this.selectedCountry = -1;
    this.innerHeight = window.innerHeight * .75;
  }

  public changeValue() {
    this.selectedCountry = this.countriesList.filter(a => a.defaultSelected)[0].value;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerHeight = window.innerHeight * .75;
  }
}
