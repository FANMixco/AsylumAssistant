import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  footer:string = "";
  translations: any;
  dirRTL = "auto";

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
      let currentLng = (sessionStorage.getItem('lng') === undefined || sessionStorage.getItem('lng') === null) ? window.navigator.language.substring(0, 2) : sessionStorage.getItem('lng');

      this.translateService.use(currentLng).subscribe(() => {
        this.translations = this.translateService.store.translations[currentLng];

        let d = new Date();
        let year:string = "2021";

        if (d.getFullYear() > 2021) {
          year += "-" + d.getFullYear().toString();
        }

        this.footer = `${this.translations.CreatedBy} <a href="https://federiconavarrete.com" target="_blank">Federico Navarrete</a> ${this.translations.From} <a href="https://supernovaic.com" target="_blank">Supernova IC</a>, ${year}`;

        if (!(sessionStorage.getItem('isRTL') === 'false' || sessionStorage.getItem('isRTL') === null || sessionStorage.getItem('isRTL') === undefined)) {
          this.dirRTL = "rtl";
        }
      }, err => {
        console.error(`Problem with language initialization.'`);
      }
    );
  }

}
