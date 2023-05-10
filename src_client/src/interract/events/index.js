import { Interract } from "../classes/interract";

mp.events.add({
  "CLIENT::Interract:SetActive": Interract.setInterractActive,
});
