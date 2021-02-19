import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Globals } from '../globals';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  version:string = '';
  isRTL = false;
  dirRTL = 'auto';

  constructor(public activeModal: NgbActiveModal, private globals: Globals) {
    this.version = globals.version;
    this.isRTL = sessionStorage.getItem('isRTL') === 'true' ? true : false;
    this.dirRTL = this.isRTL ? "rtl" : this.dirRTL;
  }

  styleHeader(): Object {
    if (this.isRTL) {
      console.log(this.isRTL);
      return { 'padding': '1rem 1rem', 'margin': '-1rem auto -1rem -1rem' };
    }
  }

  ngOnInit(): void {
  }

}
