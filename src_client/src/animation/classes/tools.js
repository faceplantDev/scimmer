export class Tools {
  /** Функция ожидания прогрузки анимации */
  static async waitAnimationLoad(animDict) {
    for (let i = 0; mp.game.streaming.hasAnimDictLoaded(animDict) == false && i < 15; i++) {
      if (i === 14) {
        destroy();
        setTimeout(() => init(), 500);
        return false;
      }
      await mp.game.waitAsync(100);
    }

    return true;
  }
}
