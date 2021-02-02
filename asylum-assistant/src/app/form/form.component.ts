import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor() {
    if (!sessionStorage.getItem('lng')) {
      window.location.href = `${document.location.origin}/home`;
    }
  }

  ngOnInit(): void {
  }

}
