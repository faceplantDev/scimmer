export class AnimationHandlers {
  static stopSync(player) {
    if (mp.players.exists(player)) {
      player.setVariable("Animation::Data", undefined);
    }
  }

  /** Синхра определенной позиции во время анимации, упрощенно) */
  static async syncAnim(player, target) {
    if (!mp.players.exists(player) || !mp.players.exists(target)) return;

    let animationData = target.getVariable("Animation::Data");
    if (animationData == undefined) return;

    let syncData = await target.callProc("CLIENT::AnimationProc:GetData", [animationData]);
    if (syncData == undefined) return;

    player.call(`CLIENT::Animation:SyncAnim`, [target, syncData.time, syncData.heading]);
  }
}
