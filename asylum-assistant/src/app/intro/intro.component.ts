import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { Globals } from '../globals';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  isDivVisible = false;
  lng = 'en';
  path = '';

  readonly defaultVideo = `${window.location.origin}/assets/videos/en/intro.mp4`;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private translateService: TranslateService, private globals: Globals) {
    this.lng = this.route.snapshot.paramMap.get("lng");
    sessionStorage.setItem('lng', this.lng);
    this.path = this.getVideoPath();
    this.setLng();
  }

  setLng():void {
    let tmpLng = 'en';

    if (this.globals.availableLng.includes(this.lng))
      tmpLng = this.lng;

    this.translateService.setDefaultLang(tmpLng);
  }

  ngOnInit(): void {
  }

  introEnded(): void {
    this.isDivVisible = true;
  }

  getVideoPath(): string {
    let tmpPath = `${window.location.origin}/assets/videos/${this.lng}/intro.mp4`;
    this.httpClient.get(tmpPath).subscribe(() => {
      return tmpPath;
    }, (err) => {
      // HANDLE file not found
      if (err.status === 404) {
        return this.defaultVideo;
      }
    });
    return this.defaultVideo;
  }
}
