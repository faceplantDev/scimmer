import { Colshape } from "../colshapeHelper";

const skimmerMarkerPos = new mp.Vector3(-50.34288024902344, -97.34062194824219, 56.3);

mp.markers.new(1, skimmerMarkerPos, 1, {
  color: [255, 0, 0, 120],
  dimension: 0,
});

Colshape.create("skimmerMarker", skimmerMarkerPos, 0, 2, (player) => {
  if (player.getVariable("hasSkimmer") == true) return mp.players.broadcastInRange(player.position, 2, "У вас уже есть скиммер");
  player.setVariable("hasSkimmer", true);
  mp.players.broadcastInRange(player.position, 2, "Вы получили скиммер в количестве 1 шт");
});
