import "./animation";
import "./attachmanager";
import "./atm";
import "./commands";

mp.events.add("consolelog", (player, data) => {
  console.log(JSON.parse(data));
});
