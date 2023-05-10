import { ProgressBar } from "../../progressbar";

export class Skimmer {
  static startSetup() {
    /** Данные были введены случайно - с другими параметрами будет кривое отображение(один хер это делается через фронт, а я так для вида накидал) */
    let bar = new ProgressBar(0.8, 0.86, 0.087, 0.025, 100, 0.001005, { R: 10, G: 10, B: 15, A: 190 }, { R: 47, G: 165, B: 204, A: 180 });

    /** Задаем параметры прогрессбару */
    bar.SetCurrentValue(0);
    bar.SetText("Установка устройства");
    bar.SetTextScale(0.25);
    bar.SetTextColour({ R: 255, G: 255, B: 255, A: 255 });

    /** Рендер для работы прогрессбара */
    const render = () => bar.Draw();
    mp.events.add("render", render);

    /** Обновление счетчика и остановка прогресс бара через 15 секунд(0 включительно, поэтому до 14 сек) */
    let progressValue = 0;
    let barInterval = setInterval(() => {
      if (progressValue < 100) {
        progressValue += 100 / 14 / 20;
        bar.SetCurrentValue(progressValue);
      } else {
        clearInterval(barInterval);
        mp.events.remove("render", render);
      }
    }, 50);
  }
}
