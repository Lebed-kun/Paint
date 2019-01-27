import Convert from './convert_units';
import { setOptions } from './change_object';

const Helper = {
  drawWithBrush : (options, context, isEraser) => {
    context.beginPath();
    context.strokeStyle = !isEraser ? options.tool.toolSettings.color : 'white';
    context.lineWidth = Convert.pixelToDecimal(options.tool.toolSettings.size) / 2;
    context.lineJoin = 'round';
    context.moveTo(options.lastX, options.lastY);
    context.lineTo(options.x, options.y);
    context.closePath();
    context.stroke();
  }
}

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

function draw(options) {
  /*
    options:
      x - current x position
      y - current y position
      lastX - initial x position
      lastY - initial y position
      isDown - is mouse down
      context - context of canvas
      tool - current tool
  */
  const context = options.context;

  if (options.isDown) {
    switch (options.tool.toolName) {
      case 'brush':
        Helper.drawWithBrush(options, context);
        break;
      case 'eraser':
        Helper.drawWithBrush(options, context, true);
        break;
    }
  }

  options.lastX = options.x;
  options.lastY = options.y;

  switch (options.tool.toolName) {
    case 'colorPicker':
      const data = context.getImageData(options.lastX, options.lastY, 1, 1).data;
      const hsl = Convert.rgbToHsl(data[0], data[1], data[2]);
      options.tool.toolSettings.color = `hsl(${hsl.hue}, ${hsl.saturation}%, ${hsl.lightness}%)`;
      break;
  }
}

function handleDrawing(options) {
  const mouseCoordinates = getMousePos(options.canvasPen, options.event);
  setOptions(options.drawOptions, {
    x : mouseCoordinates.x,
    y : mouseCoordinates.y
  });
  setOptions(options.drawOptions, options.extraDrawOptions);
  draw(options.drawOptions);
}

function handlePenMoving(options) {
  const mouseCoordinates = getMousePos(options.canvasPen, options.event); // 1
  let size = options.component.state.tool.toolSettings.size;

  options.context.clearRect(0, 0, options.canvasPen.width, options.canvasPen.height);
  options.context.beginPath();

  size = size ? Convert.pixelToDecimal(size) / 4 : 1;
  options.context.arc(mouseCoordinates.x, mouseCoordinates.y, size, 0, 2 * Math.PI);

  options.context.stroke();
  options.context.closePath();
}

const Draw = {
  drawPanel,
  drawPen,
  getMousePos,
  draw,
  handleDrawing,
  handlePenMoving
}

export default Draw;
