export class Interract {
  static isInterractActive = false;
  static data;

  static setInterractActive(boolean, newData) {
    if (boolean) {
      /** Вывод подсказки */
      mp.game.ui.clearHelp(true);
      mp.game.ui.setTextComponentFormat("STRING");
      mp.game.ui.addTextComponentSubstringPlayerName("Для взаимодействия, нажмите ~INPUT_CONTEXT~");
      mp.game.ui.displayHelpTextFromStringLabel(0, false, true, -1);

      this.isInterractActive = true;
      this.data = newData;
    } else {
      /** Очистка подсказки */
      mp.game.ui.clearHelp(true);

      this.isInterractActive = false;
      this.data = undefined;
    }
  }
}
