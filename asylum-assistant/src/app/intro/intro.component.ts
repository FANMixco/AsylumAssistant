import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    sessionStorage.setItem('lng', this.route.snapshot.paramMap.get("lng"));
  }

  ngOnInit(): void {
  }

  introEnded(): void {

  }
}
