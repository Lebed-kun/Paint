import Convert from './convert_units';
import { setOptions } from './change_object';
import { getMousePos } from './get_mouse_pos';

import { drawBrush } from './paint_tools/brush';
import { pickColor } from './paint_tools/color_picker';

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

function draw(options) {
  /*
    options:
      x - current x position
      y - current y position
      lastX - initial x position
      lastY - initial y position
      isDown - is mouse down
      canvasDraw - canvas for drawing
      context - context of canvas
      tool - current tool
  */
  if (options.isDown) {
    switch (options.tool.toolName) {
      case 'brush':
        drawBrush(options);
        break;
      case 'eraser':
        drawBrush(options, true);
        break;
    }
  }

  options.lastX = options.x;
  options.lastY = options.y;

  switch (options.tool.toolName) {
    case 'colorPicker':
      pickColor(options);
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
  let size = options.component.props.tool.toolSettings.size;

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
  draw,
  handleDrawing,
  handlePenMoving
}

export default Draw;
