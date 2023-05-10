import { AnimationFunctions } from "../../animation/classes/functions";
import { types } from "../enums/coords";
import { Tools } from "./tools";

export class Atm {
  colshape;
  skimmer;
  skimmerOwner;
  skimmerLast = 20;
  hasSkimmer = false;

  constructor(id, data) {
    this.id = id;
    this.position = data.position;
    this.heading = data.heading;
    this.type = data.type;
  }
  /** Установка скиммера */
  setupSkimmer(player) {
    player.call("CLIENT::Skimmer:StartSetup");
    AnimationFunctions.play(player, "mp_common_heist", "a_atm_mugging", 17, 15000);

    player.setVariable("blockInterract", true);

    player.addAttachment("p_gaffer_tape_s");
    player.addAttachment("prop_cs_mini_tv");

    setTimeout(() => {
      player.setVariable("blockInterract", false);
      player.addAttachment("p_gaffer_tape_s", true);
      player.addAttachment("prop_cs_mini_tv", true);
      AnimationFunctions.stopSpecial(player, "mp_common_heist", "a_atm_mugging");

      /** Вешаем на банкомат объект */
      let { offset, rot } = types[this.type];
      this.skimmer = mp.objects.new(mp.joaat("prop_cs_mini_tv"), Tools.calculatePointFromOffsetWithHeading(this.position, offset, this.heading), {
        alpha: 255,
        dimension: 0,
        rotation: new mp.Vector3(rot.x, rot.y, this.heading + rot.z),
      });
    }, 15000);

    this.hasSkimmer = true;
    this.skimmerOwner = player;
    this.skimmerLast = 20;
  }

  /** Удаление скиммера с банкомата с анимацией */
  destroyFindedSkimmer(player) {
    AnimationFunctions.play(player, "anim@heists@ornate_bank@grab_cash_heels", "grab_suit", 16, 700);
    this.destroySkimmer();
  }
  /** Удаление скиммера с банкомата без анимации */
  destroySkimmer() {
    this.hasSkimmer = false;
    this.skimmerOwner = undefined;
    this.skimmerLast = 20;

    if (mp.objects.exists(this.skimmer)) this.skimmer.destroy();
    this.skimmer = undefined;
  }
}
