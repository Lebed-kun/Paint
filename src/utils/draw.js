function drawPanel(canvasSelector, imgSrc) {
  const canvas = document.querySelector(canvasSelector);
  const context = canvas.getContext('2d');

  const image = new Image();
  image.src = imgSrc;

  image.onload = () => {
    context.drawImage(image, 0, 0);
  }
}

function drawPen(canvasPenSelector, canvasSelector, drawFunction) {
  const canvasPen = document.querySelector(canvasPenSelector);
  const contextPen = canvasPen.getContext('2d');

  const canvas = document.querySelector(canvasSelector);

  drawFunction(contextPen, canvas);
}

function getMousePos(canvas, event) {
  const rectangle = canvas.getBoundingClientRect();
  return {
    x : event.clientX - rectangle.left,
    y : event.clientY - rectangle.top
  }
}

function rgbToHsl(red, green, blue) {
  const redFloat = red / 255;
  const greenFloat = green / 255;
  const blueFloat = blue / 255;
  const cMax = Math.max(redFloat, greenFloat, blueFloat);
  const cMin = Math.min(redFloat, greenFloat, blueFloat);
  const delta = cMax - cMin;

  // Hue calculation
  const hue = delta == 0 ? 0 :
    cMax == redFloat ? 60 * ((greenFloat - blueFloat) / delta) :
    cMax == greenFloat ? 60 * ((blueFloat - redFloat) / delta + 2) :
    60 * ((redFloat - greenFloat) / delta + 4);

  // Lightness calculation
  const lightness = (cMax + cMin) / 2;

  // Saturation calculation
  const saturation = delta == 0 ? 0 :
    delta / (1 - Math.abs(2 * lightness - 1));

  return {
    hue,
    saturation : saturation * 100,
    lightness : lightness * 100
  }
}

const Draw = {
  drawPanel,
  drawPen,
  getMousePos,
  rgbToHsl
}

export default Draw;
