/** Просто отрисовка баланса, что бы не использовать стандартный гташный худ(так проще) */

mp.events.add("render", () => {
  let money = mp.players.local.getVariable("money") | 0;
  mp.game.graphics.drawText(`${money}$`, [0.8, 0.1], { font: 4, centre: false, color: [45, 194, 94, 180], scale: 0.3, outline: false });
});
