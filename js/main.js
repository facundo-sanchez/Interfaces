/**
 * @Olavarria_TUDAI
 * @Entregable_N1 
 * @Facundo_Sanchez
 */


const position = () => {
  return {
    x: Number((Math.random() * 500).toFixed()),
    y: Number((Math.random() * 700).toFixed())
  }
}

const width = () => (Number((Math.random() * 300).toFixed()))

const randomRGBA = () => {
  let r = Math.round(Math.random() * 255);
  let g = Math.round(Math.random() * 255);
  let b = Math.round(Math.random() * 255); 
  return `rgba(${r}, ${g}, ${b})`;
}

const generateFigures = () => {
  const limit = Number((Math.random() * 5).toFixed());
  const figures = []

  for (let i = 0; i < limit; i++) {
    const { x: posX, y: posY } = position()
    const rectangulo = new Rectangulo(posX, posY, width(), width(), randomRGBA());
    const cuadrado = new Cuadrado(posX, width(), width(), randomRGBA());
    figures.push(rectangulo);
    figures.push(cuadrado);
  }
  return figures;
}


window.addEventListener('load', () => {
  let elements = generateFigures();
  const canvas = new Canvas(document.getElementById('canvas'), elements);
  document.getElementById('reset').addEventListener('click', () => {
    elements = generateFigures();
    canvas.setElements(elements)
  })
})
