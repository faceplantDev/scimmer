/** Базовая релизация анимаций за 5 минут на коленке */

import { AnimationFunctions } from "./functions";

export class AnimationHandlers {
  static getData(animation) {
    let time = mp.players.local.getAnimCurrentTime(animation.animDict, animation.animName);
    let heading = mp.players.local.getHeading();
    return {
      time: time,
      heading: heading,
    };
  }

  static entityStreamIn(entity) {
    if (entity.type !== "player") return;

    entity.data = entity.getVariable("Animation::Data");

    if (entity.data == null || entity.data == undefined) return;
    mp.events.callRemote("SERVER::Animation:SyncAnim", entity);
  }

  static play(player, duration) {
    AnimationFunctions.play(player, duration);
  }
  static syncAnim(player, animationTime, heading) {
    AnimationFunctions.syncAnim(player, animationTime, heading);
  }

  static stop(animationDictionary, animationName) {
    mp.players.local.stopAnimTask(animationDictionary, animationName, 3.0);
    mp.events.callRemote("SERVER::Animation:StopSync");
  }
}
