import { Component, HostListener, OnInit } from '@angular/core';
import {default as countries} from '../../assets/json/countries.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  countriesList: Array<any> = countries;

  public innerHeight: any;

  constructor() { }

  ngOnInit(): void {
    this.innerHeight = window.innerHeight * .75;

    if (sessionStorage.getItem('lng')) {
      window.location.href = `${document.location.origin}/options`;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerHeight = window.innerHeight * .75;
  }
}
