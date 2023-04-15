class Figuras {
  constructor(x, y, width, height, fillStyle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fillStyle = fillStyle
    this.selected = false;
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }

  isSelected(selected) {
    this.selected = selected;
  }
}