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
  videoClass = 'video-fluid z-depth-1';
  textOrientation = 'text-right';

  readonly defaultVideo = `assets/videos/en/intro.mp4`;

  constructor(private httpClient: HttpClient) {
    this.lng = sessionStorage.getItem('lng');
    this.path = this.getVideoPath();

    if(window.innerHeight > window.innerWidth){
      this.videoClass = 'video-fluid-vertical z-depth-1';
    }

    this.textOrientation = sessionStorage.getItem('isRTL') === 'true' ? 'text-left' : this.textOrientation;
  }

  ngOnInit(): void {
    try {
      this.openfullscreen('introVid');
    } catch { }
  }

  introEnded(): void {
    this.isDivVisible = true;
    try {
      this.closefullscreen();
    } catch { }
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

  openfullscreen(id:string) {
    // Trigger fullscreen
    const docElmWithBrowsersFullScreenFunctions = document.getElementById(id) as HTMLElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullscreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
    };

    if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
      docElmWithBrowsersFullScreenFunctions.requestFullscreen();
    } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
      docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
    } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
    } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE/Edge */
      docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
    }
    //this.isfullscreen = true;
  }

  closefullscreen() {
    const docWithBrowsersExitFunctions = document as Document & {
      mozCancelFullScreen(): Promise<void>;
      webkitExitFullscreen(): Promise<void>;
      msExitFullscreen(): Promise<void>;
    };
    if (docWithBrowsersExitFunctions.exitFullscreen) {
      docWithBrowsersExitFunctions.exitFullscreen();
    } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) { /* Firefox */
      docWithBrowsersExitFunctions.mozCancelFullScreen();
    } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      docWithBrowsersExitFunctions.webkitExitFullscreen();
    } else if (docWithBrowsersExitFunctions.msExitFullscreen) { /* IE/Edge */
      docWithBrowsersExitFunctions.msExitFullscreen();
    }
    //this.isfullscreen = false;
  }
}
