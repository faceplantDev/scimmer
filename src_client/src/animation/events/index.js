import { AnimationHandlers } from "../classes/handlers";

mp.events.add({
  entityStreamIn: AnimationHandlers.entityStreamIn,
  "CLIENT::Animation:Play": AnimationHandlers.play,
  "CLIENT::Animation:SyncAnim": AnimationHandlers.syncAnim,
  "CLIENT::Animation:StopSpecial": AnimationHandlers.stop,
});

mp.events.addProc({
  "CLIENT::AnimationProc:GetData": AnimationHandlers.getData,
});
