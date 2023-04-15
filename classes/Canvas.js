class Canvas {
  constructor(ref, elements = []) {
    this.ref = ref;
    this.elements = elements;
    this.isDragging = false;
    this.ctx = this.ref.getContext('2d');
    this.#startEvent();
    this.onLoad();
  }


  #startEvent() {
    // Eventos del mouse
    const onMouseUp = (e) => {
      if (!this.isDragging) return;

      e.preventDefault();
      this.isDragging = false;
    }

    const onMouseDown = (e) => {
      e.preventDefault();
      this.elements.forEach((figure) => {
        const { offsetX, offsetY } = e;
        if (this.#isMouseShape(offsetX, offsetY, figure)) {
          figure.isSelected(true);
          this.isDragging = true;
          return;
        }
        figure.isSelected(false);
      });
    }

    const onMouseOut = (e) => {
      if (!this.isDragging) return;

      e.preventDefault();
      this.isDragging = false;
    }

    const onMouseMove = (e) => {
      if (!this.isDragging) {
        return
      } else {
        e.preventDefault();
        const { offsetX, offsetY } = e;
        const element = this.elements.find((elem) => elem.selected);
        element.moveTo(offsetX, offsetY);
        this.#fillRect();
      }
    }

    // Setear los eventos del canvas.
    this.ref.onmousemove = onMouseMove;
    this.ref.onmousedown = onMouseDown;
    this.ref.onmouseup = onMouseUp;
    this.ref.onmouseout = onMouseOut;
  }

  onLoad() {
    if (this.elements.length > 0) this.#fillRect();
  }

  #fillRect() {
    this.ctx.clearRect(0, 0, this.#getWidth(), this.#getHeight());

    this.elements.forEach((figure) => {
      this.ctx.fillStyle = figure.fillStyle;
      this.ctx.fillRect(figure.x, figure.y, figure.width, figure.height);
    })
  }

  #isMouseShape(offsetX, offsetY, figure) {
    if (offsetX >= figure.x && offsetX <= figure.x + figure.width &&
      offsetY >= figure.y && offsetY <= figure.y + figure.height) return true;

    return false;
  }

  #getWidth() {
    return this.ref.width;
  }

  #getHeight() {
    return this.ref.height;
  }

  getRef() {
    return this.ref;
  }

  setElements(elements) {
    this.elements = elements;
    this.#fillRect();
  }
}