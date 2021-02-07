import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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

  constructor(private httpClient: HttpClient) {
    this.lng = sessionStorage.getItem('lng');
    this.path = this.getVideoPath();
  }

  ngOnInit(): void {
  }

  introEnded(): void {
    this.isDivVisible = true;
  }

  getVideoPath(): string {
    let tmpPath = `assets/videos/${this.lng}/intro.mp4`;
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
