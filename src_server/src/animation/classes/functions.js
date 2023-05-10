export class AnimationFunctions {
  static play(player, animationDictionary, animationName, flag, time) {
    player.setVariable("Animation::Data", {
      animDict: animationDictionary,
      animName: animationName,
      flag: flag,
    });
    mp.players.callInRange(player.position, 100, `CLIENT::Animation:Play`, [player, time]);
  }

  /** Стоп определенной анимации */
  static stopSpecial(player, animationDictionary, animationName) {
    player.call("CLIENT::Animation:StopSpecial", [animationDictionary, animationName]);
  }
}
