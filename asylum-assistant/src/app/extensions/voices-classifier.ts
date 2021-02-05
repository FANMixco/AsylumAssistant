var requiredLng:string;
var orderedLang:any;

export class VoicesClassifier {

  constructor(lang:string) {
    requiredLng = lang;
    window.speechSynthesis.onvoiceschanged = function(e) {
      VoicesClassifier.orderVoicesByLanguage();

      if (VoicesClassifier.isLangSupported() != '') {
        sessionStorage.setItem('t2sSupported', 'true');
        sessionStorage.setItem('t2sLang', lang);
      } else {
        sessionStorage.setItem('t2sSupported', 'false');
      }
    }
  }

  static isLangSupported() {
    let lngSplit = requiredLng.split('-');

    if (lngSplit[0] in orderedLang) {
      let found = false;
      for (let i=0; i<orderedLang[lngSplit[0]].length; i++) {
        if (orderedLang[lngSplit[0]][i].lang == requiredLng) {
          found = true;
          break;
        }
      }

      if (found) {
        return requiredLng;
      }
      else {
        return orderedLang[lngSplit[0]][0].lang;
      }
    } else {
      return '';
    }
  }

  static orderVoicesByLanguage() {
    let voices = speechSynthesis.getVoices();
    voices.forEach(function(voice, i) {
      let lng = voice.lang.split('-');
      let collection = { "lang": voice.lang, "isLocal": voice.localService, "name": voice.name, "URI": voice.voiceURI, "default": voice.default };

      if (!orderedLang) {
        let key = lng[0];
        let obj = {
            [key]: [collection]
        };

        orderedLang = obj;
      }
      else if (!(lng[0] in orderedLang)) {
        let key = lng[0];
        let obj = {
            [key]: [collection]
        };

        orderedLang = { ...orderedLang, ...obj };
      } else {
        let key = lng[0];
        orderedLang[key].push(collection);
       }
    });
  }
}
