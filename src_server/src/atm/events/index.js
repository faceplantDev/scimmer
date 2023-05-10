import { AtmFunctions } from "../classes/functions";

mp.events.add({
  "SERVER::Atm:UseAtm": AtmFunctions.useAtm,
  "SERVER::Atm:InterractAtm": AtmFunctions.interractAtm,
});
