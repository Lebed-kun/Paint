import Draw from './draw';
import { setOptions } from './change_object';

export function initDrawing(options) {
  /* canvasPenSelector, canvasDrawSelector, component */

  const canvasPen = document.querySelector(options.canvasPenSelector);
  const canvasDraw = document.querySelector(options.canvasDrawSelector);
  const context = canvasDraw.getContext('2d');
  const component = options.component;
  let drawOptions = {
    isDown : false,
    context : context,
    tool : component.state.tool
  };
  let mousePressed = false;

  canvasPen.onmousedown = event => {
    const mouseCoordinates = Draw.getMousePos(canvasPen, event);
    mousePressed = true;
    component.setState( { tool : component.props.tool });
    setOptions(drawOptions, {
      x : mouseCoordinates.x,
      y : mouseCoordinates.y,
      tool : component.state.tool
    });
    Draw.draw(drawOptions);

    if (drawOptions.tool.toolName == 'colorPicker')
      component.props.onSelect('color', drawOptions.tool.toolSettings.color);
  };

  canvasPen.onmousemove = event => {
    if (mousePressed) {
      const mouseCoordinates = Draw.getMousePos(canvasPen, event);
      setOptions(drawOptions, {
        x : mouseCoordinates.x,
        y : mouseCoordinates.y,
        isDown : true
      });
      Draw.draw(drawOptions);
    }
  }

  canvasPen.onmouseup = event => {
    mousePressed = false;
    setOptions(drawOptions, {
      isDown : false
    });
  }

  canvasPen.onmouseleave = event => {
    mousePressed = false;
    setOptions(drawOptions, {
      isDown : false
    });
  }
}
