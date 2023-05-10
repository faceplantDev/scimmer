import { Colshape } from "../../colshapeHelper";
import { atms as atmsData } from "../enums/coords";
import { Atm } from "./atm";
import { Tools } from "./tools";

export class AtmFunctions {
  static atms = [];
  /** Просто расстановка колшейпов на банкоматы с коллбеками, используя небольшой модуль, дико облегчающий жизнь */
  static init() {
    for (let index = 0; index < atmsData.length; index++) {
      const atmData = atmsData[index];
      let newAtm = new Atm(index, atmData);

      newAtm.colshape = Colshape.create(
        `atm${index}`,
        atmData.position,
        0,
        2,
        (player) => {
          player.call("CLIENT::Atm:CanInterract", [index]);
        },
        (player) => {
          player.call("CLIENT::Atm:StopInterract");
        }
      );

      AtmFunctions.atms.push(newAtm);
    }
  }

  /** Использование банкомата на E */
  static useAtm(player, index) {
    let atm = AtmFunctions.atms.find((atm) => atm.id == index);
    if (atm == undefined) return player.call("CLIENT::Interract:SetActive", [false]);

    /** Проверка дистанции до игрока во избежание бага или эксекута */
    if (atm.position.subtract(player.position).length() > 3) return;

    if (atm.hasSkimmer) {
      let victimMoney = parseFloat(player.getVariable("money")) | 0;
      if (victimMoney < 1500) return mp.players.broadcastInRange(player.position, 2, "Интерфейс банкомата закрыт | Недостаточно средств");

      /** Должна быть ссылка на модель в базе, но так как базы нет - проверяем онлайн ли вор */
      if (!mp.players.exists(atm.skimmerOwner)) return;
      let robberMoney = parseFloat(atm.skimmerOwner.getVariable("money")) | 0;

      /** Если скиммер сработал на владельце, забираем у него только комиссионные */
      if (atm.skimmerOwner != player) {
        victimMoney -= 1500;
        player.setVariable("money", victimMoney);
        mp.players.broadcastInRange(player.position, 2, "У вас украли 1500$ через скиммер");

        robberMoney += 1000;
        atm.skimmerOwner.setVariable("money", robberMoney);
        mp.players.broadcastInRange(atm.skimmerOwner.position, 2, "Вы заработали 1000$ через скиммер");
      } else {
        robberMoney -= 500;
        atm.skimmerOwner.setVariable("money", robberMoney);
        mp.players.broadcastInRange(atm.skimmerOwner.position, 2, "Вы попались на свой скиммер.\nТем самым потеряли 500$ на комиссии производителя скиммера.");
      }
      /** Отбираем прочность */
      atm.skimmerLast -= 1;
      if (atm.skimmerLast < 1) {
        atm.destroySkimmer();
        mp.players.broadcastInRange(player.position, 2, `Интерфейс банкомата закрыт | Скиммер сломался`);
      } else mp.players.broadcastInRange(player.position, 2, `Интерфейс банкомата закрыт | Операция была произведена успешно. Прочность ${atm.skimmerLast}/20`);
    } else {
      mp.players.broadcastInRange(player.position, 2, "Интерфейс банкомата закрыт | Скиммера нет");
    }
  }
  /** Использование банкомата на G */
  static interractAtm(player, index) {
    let atm = AtmFunctions.atms.find((atm) => atm.id == index);
    if (atm == undefined) return player.call("CLIENT::Interract:SetActive", [false]);

    /** Проверка дистанции до игрока во избежание бага или эксекута */
    if (atm.position.subtract(player.position).length() > 3) return;

    if (atm.hasSkimmer) {
      /** Удаляем скиммер с анимацией */
      atm.destroyFindedSkimmer(player);
    } else {
      /** Тупая коненчо проверка, но для имитиации "инвентаря" - я думаю пойдет */
      if (player.getVariable("hasSkimmer") == true) {
        /** Ставим скиммер с анимацией и таймером */
        atm.setupSkimmer(player);
        /** Типо забрали предмет из инвентаря */
        player.setVariable("hasSkimmer", false);
      }
    }
  }
}
