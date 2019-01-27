import Draw from './draw';
import { setOptions } from './change_object';
import Convert from './convert_units';

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
    mousePressed = true;

    Draw.handleDrawing({
      canvasPen : canvasPen,
      event : event,
      drawOptions : drawOptions,
      extraDrawOptions : { tool : component.state.tool }
    });

    if (drawOptions.tool.toolName == 'colorPicker')
      component.props.onSelect('color', drawOptions.tool.toolSettings.color);
  };

  canvasPen.onmousemove = event => {
    if (mousePressed) {
      Draw.handleDrawing({
        canvasPen : canvasPen,
        event : event,
        drawOptions : drawOptions,
        extraDrawOptions : { isDown : true }
      });
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

export function initPen(options) {
  const canvasPen = document.querySelector(options.canvasPenSelector);
  const context = canvasPen.getContext('2d');
  const component = options.component;
  let mouseOver = false;

  canvasPen.addEventListener('mouseenter', event => {
    mouseOver = true;
    component.setState( { tool : component.props.tool });

    Draw.handlePenMoving({
      canvasPen : canvasPen,
      event : event,
      component : component,
      context : context
    });
  });

  canvasPen.addEventListener('mousemove', event => {
    if (mouseOver) {
      Draw.handlePenMoving({
        canvasPen : canvasPen,
        event : event,
        component : component,
        context : context
      });
    }
  });

  canvasPen.addEventListener('mouseleave', event => {
    mouseOver = false;
    context.clearRect(0, 0, canvasPen.width, canvasPen.height);
  })
}
