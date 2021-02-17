import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AboutComponent } from '../about/about.component';
import { TranslateComponent } from '../translate/translate.component';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

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
    setTimeout(() => {
      let str = document.location.href;
      str = str.substring(0, str.lastIndexOf("/"));

      window.location.replace(str + '/home');
    }, 1000);
  }
}
