import { atms } from "../atm/enums/coords";

/** Выдать скиммер */
mp.events.addCommand("addSkimmer", (player) => {
  player.setVariable("hasSkimmer", true);
});
/** Выдать 1500$ */
mp.events.addCommand("addMoney", (player) => {
  player.setVariable("money", (parseFloat(player.getVariable("money")) | 0) + 1500);
});

mp.events.addCommand("atm", (player, fulltext) => {
  let atm = parseInt(fulltext);
  if (atm != undefined || atm != null || atm != NaN) {
    player.position = atms[atm].position;
  }
});
