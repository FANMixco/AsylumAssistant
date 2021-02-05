import { Globals } from "../globals";

export class GetLanguages {
  constructor (private globals: Globals) { }

  isLangAvailable(lang:string) {
    for (let i = 0; i < this.globals.availableLng.length; i++) {
      if (this.globals.availableLng[i].includes(lang)) {
        return this.globals.availableLng[i];
      }
    }
    return this.globals.availableLng[0];
  }
}
