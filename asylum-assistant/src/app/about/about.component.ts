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

  constructor(public activeModal: NgbActiveModal, private globals: Globals) {
    this.version = globals.version;
    this.isRTL = sessionStorage.getItem('isRTL') === 'true' ? true : this.isRTL;
  }

  ngOnInit(): void {
  }

}
