import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Globals } from '../globals';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  currentTab = 0; // Current tab is set to be the first tab (0)
  translations: any;
  //currentLng = 'en-US';
  synth = window.speechSynthesis;

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

  constructor(private formBuilder: FormBuilder, private translateService: TranslateService, private globals: Globals) {
    if (!sessionStorage.getItem('lng')) {
      window.location.href = `${document.location.origin}/home`;
    }
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

  textToSpeechOff(n:number) {
    document.getElementById(`btnSpeech${n}`).style.display = 'inline';
    document.getElementById(`btnSpeechOff${n}`).style.display = 'none';
    this.synth.cancel();
  }

  textToSpeech(n:number) {
    document.getElementById(`btnSpeech${n}`).style.display = 'none';
    document.getElementById(`btnSpeechOff${n}`).style.display = 'inline';

    let text = '';

    switch (n) {
      case 1:
        text = this.translations.text1;
        break;
      case 2:
        text = this.translations.text2;
        break;
      case 3:
        text = this.translations.text3;
        break;
      default:
        text = this.translations.text4;
        break;
    }

    let msg2Speech = new SpeechSynthesisUtterance(text);
    msg2Speech.lang = sessionStorage.getItem('t2sLang');

    this.synth.speak(msg2Speech);

    msg2Speech.onend = function() {
      document.getElementById(`btnSpeech${n}`).style.display = 'inline';
      document.getElementById(`btnSpeechOff${n}`).style.display = 'none';
    }
  }

  ngOnInit(): void {
    this.showTab(this.currentTab); // Display the current tab
    this.translations = this.translateService.store.translations[`${sessionStorage.getItem('lng')}`];

    if (!this.translations || !('speechSynthesis' in window)) {
      let x = document.getElementsByClassName("tab");

      for (let i = 0; i < x.length - 2; i++) {
        document.getElementById(`btnSpeech${i + 1}`).style.display = 'none';
      }
    }
  }

  onSubmit(): void {
    this.nextPrev(1);
    console.log('form data', this.asylumSeekerForm);
    console.log(this.asylumSeekerForm.controls['fName'].value);
    console.log(this.asylumSeekerForm.controls['lName'].value);
    console.log(this.asylumSeekerForm.controls['email'].value);
    console.log(this.asylumSeekerForm.controls['tel'].value);
    console.log(this.asylumSeekerForm.controls['username'].value);
  }

}
