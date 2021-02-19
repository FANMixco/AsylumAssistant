import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  currentTab = 0; // Current tab is set to be the first tab (0)
  translations: any;
  synth = window.speechSynthesis;
  isRTL = false;
  dirRTL:string = "";
  table:string = "";

  asylumSeekerForm = this.formBuilder.group({
    fName: '',
    lName: '',
    email: '',
    tel: '',
    day: 0,
    month: 0,
    year: 0,
    username: '',
    password: ''
  });

  constructor(private formBuilder: FormBuilder, private translateService: TranslateService) {
    if (!sessionStorage.getItem('lng')) {
      window.location.href = `${document.location.origin}/home`;
    }
    this.isRTL = sessionStorage.getItem('isRTL') === 'true' ? true : this.isRTL;
    this.dirRTL = this.isRTL ? "rtl" : "";
  }

  showTab(n:number) {
    // This function will display the specified tab of the form ...
    let x = document.getElementsByClassName("tab") as HTMLCollectionOf<HTMLElement>;
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:

    if (n == (x.length - 1)) {
      document.getElementById("divOptions").style.display = "none";
      return;
    }

    if (n == 0) {
      document.getElementById("prevBtn").style.display = "none";
    } else {
      document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 2)) {
      //(<HTMLInputElement>document.getElementById("nextBtn")).type = "submit";
      document.getElementById("submitBtn").style.display = "inline";
      document.getElementById("nextBtn").style.display = "none";
    } else {
      document.getElementById("submitBtn").style.display = "none";
      document.getElementById("nextBtn").style.display = "inline";
    }
    // ... and run a function that displays the correct step indicator:
    this.fixStepIndicator(n);
  }

  nextPrev(n:number) {
    // This function will figure out which tab to display
    let x = document.getElementsByClassName("tab") as HTMLCollectionOf<HTMLElement>;
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !this.validateForm()) return false;
    // Hide the current tab:
    x[this.currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    this.currentTab = this.currentTab + n;

    this.showTab(this.currentTab);
  }

  validateForm() {
    // This function deals with validation of the form fields
    let x:any, y:any, i:any, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[this.currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
      // If a field is empty...
      if (y[i].value == "") {
        // add an "invalid" class to the field:
        y[i].className += " invalid";
        // and set the current valid status to false:
        valid = false;
      }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
      document.getElementsByClassName("step")[this.currentTab].className += " finish";
    }
    return valid; // return the valid status
  }

  fixStepIndicator(n:number) {
    // This function removes the "active" class of all steps...
    let i:number, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";
  }

  speakT2S() {
    document.getElementById(`btnSpeech`).style.display = 'none';
    document.getElementById(`btnSpeechOff`).style.display = 'inline';
    document.getElementById(`btnPause`).style.display = 'inline';

    let text = this.translations[`text${this.currentTab + 1}`];

    let msg2Speech = new SpeechSynthesisUtterance(text);
    msg2Speech.lang = sessionStorage.getItem('t2sLang');

    this.synth.speak(msg2Speech);

    msg2Speech.onend = function() {
      document.getElementById(`btnSpeech`).style.display = 'inline';
      document.getElementById(`btnSpeechOff`).style.display = 'none';
      document.getElementById(`btnPause`).style.display = 'none';
      document.getElementById(`btnPlay`).style.display = 'none';
    }
  }

  pauseT2S() {
    document.getElementById(`btnPause`).style.display = 'none';
    document.getElementById(`btnPlay`).style.display = 'inline';
    this.synth.pause();
  }

  playT2S() {
    document.getElementById(`btnPause`).style.display = 'inline';
    document.getElementById(`btnPlay`).style.display = 'none';
    this.synth.resume();
  }

  cancelT2S() {
    document.getElementById(`btnSpeech`).style.display = 'inline';
    document.getElementById(`btnSpeechOff`).style.display = 'none';
    this.synth.cancel();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.showTab(this.currentTab); // Display the current tab
    }, 100);

    this.translateService.use(sessionStorage.getItem('lng')).subscribe(() => {
      this.translations = this.translateService.store.translations[sessionStorage.getItem('lng')];
        if (!this.translations || !('speechSynthesis' in window)) {
          document.getElementById(`divT2S`).style.display = 'none';
        }
      }, err => {
        console.error(`Problem with language initialization.'`);
      }
    );
  }

  onSubmit(): void {
    this.nextPrev(1);
    document.getElementById(`divT2S`).style.display = 'none';

    this.table = `<table class="table"><thead>
      <tr>
        <th scope="col">${this.translations.Input1Form}</th>
        <th scope="col">${this.translations.Input2Form}</th>
        <th scope="col">${this.translations.Input3Form}</th>
        <th scope="col">${this.translations.Input4Form}</th>
        <th scope="col">${this.translations.Birthday}</th>
        <th scope="col">${this.translations.Input8Form}</th>
        <th scope="col">${this.translations.Input9Form}</th>
      </tr>
    </thead>
    <tbody>
    <tr>
      <th scope="row">${this.asylumSeekerForm.controls['fName'].value}</th>
      <td>${this.asylumSeekerForm.controls['lName'].value}</td>
      <td>${this.asylumSeekerForm.controls['email'].value}</td>
      <td>${this.asylumSeekerForm.controls['tel'].value}</td>
      <td>${this.asylumSeekerForm.controls['year'].value}/${this.asylumSeekerForm.controls['month'].value}/${this.asylumSeekerForm.controls['day'].value}</td>
      <td>${this.asylumSeekerForm.controls['username'].value}</td>
      <td>*****</td>
    </tr>
    </tbody>
    </table>`;
  }

}
