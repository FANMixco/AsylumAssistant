import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Asylum Assistant';
  year:string = "2021";

  constructor() {
    let d = new Date();

    if (d.getFullYear() > 2021) {
      this.year += "-" + d.getFullYear().toString();
    }
  }
}
