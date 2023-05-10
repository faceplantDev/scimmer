import { AtmHandlers } from "../classes/handlers";

mp.events.add({
  "CLIENT::Atm:CanInterract": AtmHandlers.startInterract,
  "CLIENT::Atm:StopInterract": AtmHandlers.stopInterract,
});
