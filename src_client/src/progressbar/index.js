/** Числа взяты из головы и методом подбора
 * В игре выглядит вроде неплохо xD
 * Еще посидеть и от фронта вообще не отличить будет
 * Правда ровно отображается только в 1920x1080 из-за того что нет коэфицента
 */

import { NativeRender } from "./natives/nativeRender";

export class ProgressBar {
  constructor(x, y, width, height, max, padding, background, foreground) {
    this.POSITION_X = x;
    this.POSITION_Y = y;
    this.MAX_BAR_WIDTH = width;
    this.MAX_BAR_HEIGHT = height;
    this.BAR_PADDING = padding;
    this.MAX_VALUE = max;
    this.Background = background;
    this.Foreground = foreground;
    this.TextForeground = { R: 255, G: 255, B: 255, A: 255 };
    this.CURRENT_VALUE = 0.66;
    this.BAR_TEXT = "";
    this.BAR_TEXT_SCALE = 0.04;
    this.BAR_TEXT_CENTERED = false;
    this.BAR_TEXT_SHOW_PERCENTAGE = false;
    this.Instantiated = true;
  }

  SetPosition(x, y) {
    this.POSITION_X = x;
    this.POSITION_Y = y;
  }

  SetSize(w, h) {
    this.MAX_BAR_WIDTH = w;
    this.MAX_BAR_HEIGHT = h;
  }

  SetMaxValue(v) {
    this.MAX_VALUE = v;
  }

  SetCurrentValue(p) {
    this.CURRENT_VALUE = Math.max(0.0, Math.min(p, this.MAX_VALUE));
  }

  SetText(text) {
    this.BAR_TEXT = text;
  }

  SetTextScale(scale) {
    this.BAR_TEXT_SCALE = [scale, scale];
  }

  SetTextColour(color) {
    this.TextForeground = color;
  }

  SetTextCentered(v) {
    this.BAR_TEXT_CENTERED = v;
  }

  SetPercentageShown(v) {
    this.BAR_TEXT_SHOW_PERCENTAGE = v;
  }

  Draw() {
    if (this.BAR_TEXT != undefined) {
      NativeRender.DrawText(
        this.BAR_TEXT,
        this.POSITION_X + this.MAX_BAR_WIDTH / 2 - 0.005 * this.BAR_TEXT.length + 0.005,
        this.POSITION_Y - 0.0095,
        0,
        this.BAR_TEXT_SCALE,
        this.TextForeground,
        false
      );
    }
    NativeRender.DrawRectangle(
      this.POSITION_X + this.MAX_BAR_WIDTH / 2 + (this.MAX_BAR_WIDTH / 2 - 0.004 * this.BAR_TEXT.length) - 0.01,
      this.POSITION_Y,
      this.MAX_BAR_WIDTH + this.BAR_PADDING - (this.MAX_BAR_WIDTH / 2 - 0.0055 * this.BAR_TEXT.length) + 0.04,
      this.MAX_BAR_HEIGHT + this.BAR_PADDING + 0.0053,
      this.Background
    );
    NativeRender.DrawRectangle(
      this.POSITION_X + this.CURRENT_VALUE / (this.MAX_VALUE / this.MAX_BAR_WIDTH) / 2,
      this.POSITION_Y,
      this.CURRENT_VALUE / (this.MAX_VALUE / this.MAX_BAR_WIDTH),
      this.MAX_BAR_HEIGHT / 5,
      this.Foreground
    );
    NativeRender.DrawRectangle(
      this.POSITION_X + this.MAX_VALUE / (this.MAX_VALUE / this.MAX_BAR_WIDTH) / 2,
      this.POSITION_Y,
      this.MAX_BAR_WIDTH,
      this.MAX_BAR_HEIGHT / 5,
      {
        R: this.Foreground.R + 50 > 255 ? this.Foreground.R - 50 : this.Foreground.R + 50,
        G: this.Foreground.G + 50 > 255 ? this.Foreground.G - 50 : this.Foreground.G + 50,
        B: this.Foreground.B + 50 > 255 ? this.Foreground.B - 50 : this.Foreground.B + 50,
        A: this.Foreground.A,
      }
    );
  }
}
