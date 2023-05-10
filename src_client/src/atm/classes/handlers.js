import { Interract } from "../../interract/classes/interract";

export class AtmHandlers {
  static startInterract(index) {
    Interract.setInterractActive(true, { index });
  }
  static stopInterract() {
    Interract.setInterractActive(false);
  }
}
