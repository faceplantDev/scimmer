import { AnimationHandlers } from "../classes/handlers";

mp.events.add({
  "SERVER::Animation:StopSync": AnimationHandlers.stopSync,
  "SERVER::Animation:SyncAnim": AnimationHandlers.syncAnim,
});
