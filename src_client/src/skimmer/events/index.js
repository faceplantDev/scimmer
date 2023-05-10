import { Skimmer } from "../classes/skimmer";

mp.events.add({
  "CLIENT::Skimmer:StartSetup": Skimmer.startSetup,
});
