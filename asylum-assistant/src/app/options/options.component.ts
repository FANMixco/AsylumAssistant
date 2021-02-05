import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AboutComponent } from '../about/about.component';
import { TranslateComponent } from '../translate/translate.component';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  lng: string;

  constructor(private modalService: NgbModal) {
    this.lng = sessionStorage.getItem('lng');
  }

  ngOnInit(): void {
  }

  openAbout() {
    this.modalService.open(AboutComponent);
  }

  openChangeLng() {
    this.modalService.open(TranslateComponent, { scrollable: true });
  }

  close() {
    sessionStorage.clear();
    setTimeout(function () {
        window.location.replace(document.location.origin);
    }, 1000);
  }
}
