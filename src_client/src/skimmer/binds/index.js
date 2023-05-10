/** Базовая имитации клавиш инпута и интеракта */

import { Interract } from "../../interract/classes/interract";

function inputButton() {
  if (!Interract.isInterractActive) return;
  if (mp.players.local.getVariable("blockInterract") == true) return;
  mp.events.callRemote("SERVER::Atm:UseAtm", Interract.data.index);
}

function interractButton() {
  if (!Interract.isInterractActive) return;
  if (mp.players.local.getVariable("blockInterract") == true) return;
  mp.events.callRemote("SERVER::Atm:InterractAtm", Interract.data.index);
}

mp.keys.bind(0x45, true, inputButton);
mp.keys.bind(0x47, true, interractButton);
