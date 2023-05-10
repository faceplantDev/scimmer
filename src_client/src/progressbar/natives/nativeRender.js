/** Чисто прослойка для упрощения */

export class NativeRender {
  static DrawRectangle(x, y, width, height, color) {
    mp.game.graphics.drawRect(x, y, width, height, color.R, color.G, color.B, color.A);
  }

  static DrawText(text, x, y, font, scale, color, centred = false) {
    color = [color.R, color.G, color.B, color.A];
    mp.game.graphics.drawText(text, [x, y], { font, centre: centred, color, scale, outline: false });
  }
}
