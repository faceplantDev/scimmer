/** Базовая релизация анимаций за 5 минут на коленке */
import { Tools } from "./tools";

export class AnimationFunctions {
  static async play(player, duration) {
    if (!mp.players.exists(player)) return;

    let data = player.getVariable(`Animation::Data`);
    if (!data) return;

    let { animDict, animName, flag } = data;
    if (typeof animDict !== "string" || typeof animName !== "string" || typeof flag !== "number") return mp.gui.chat.push(`error`);

    mp.game.streaming.requestAnimDict(animDict);
    await Tools.waitAnimationLoad(animDict);

    player.taskPlayAnim(animDict, animName, 2.0, 2.0, -1, flag, 0, false, false, false);

    let animTotalTime = duration ? duration : player.getAnimTotalTime(animDict, animName);
    setTimeout(() => {
      player.stopAnimTask(animDict, animName, 3.0);
      mp.events.callRemote("SERVER::Animation:StopSync");
    }, animTotalTime);
  }

  static async syncAnim(player, animationTime, heading) {
    if (mp.players.local == player) return;

    let data = player.getVariable(`Animation::Data`);
    if (!data) return;

    let { animDict, animName, flag } = data;
    if (typeof animDict !== "string" || typeof animName !== "string" || typeof flag !== "number") return;

    mp.game.streaming.requestAnimDict(animDict);
    await Tools.waitAnimationLoad(animDict);

    player.taskPlayAnim(animDict, animName, 2.0, 2.0, -1, flag, animationTime, false, false, false);
    player.setHeading(heading);
  }
}
