import Draw from '../draw';
import Convert from '../convert_units';
import { getMousePos } from '../get_mouse_pos';

function setHslProperties(options, props, drawPen) {
  // Set up options
  const contextPen = options.contextPen;
  const canvas = options.canvas;
  const component = options.component;
  const colorPickerOptions = options.colorPickerOptions;

  const clickCoordinates = getMousePos(canvas, colorPickerOptions.event);

  // Getting hue and saturation values
  const data = canvas.getContext('2d').getImageData(clickCoordinates.x, clickCoordinates.y, 1, 1).data;
  const dataHsl = Convert.rgbToHsl(data[0], data[1], data[2]);
  const hsl = {
    hue : props['hue'] ? dataHsl.hue : component.state.hue,
    saturation : props['saturation'] ? dataHsl.saturation : component.state.saturation,
    lightness : props['lightness'] ? dataHsl.lightness : component.state.lightness
  }

  const showColor = Convert.formatColor(hsl.hue, hsl.saturation, hsl.lightness);

  component.setState(hsl);

  // Sending color value
  component.props.onSelect(showColor);

  // Moving pointer
  contextPen.clearRect(0, 0, canvas.width, canvas.height);
  drawPen(contextPen, canvas, clickCoordinates);
};

const ChooseColorHelper = {
  drawHuePen : (huePenClass, hueCircleSelector) => {
    Draw.drawPen(`.${huePenClass}`, hueCircleSelector, (contextPen, canvas) => {
      contextPen.beginPath();
      contextPen.arc(canvas.width / 2, canvas.height / 2, 2, 0, 2 * Math.PI);
      contextPen.stroke();
      contextPen.closePath();
    });
  },

  drawLightnessPen : (lightnessPenClass, lightnessBarSelector) => {
    Draw.drawPen(`.${lightnessPenClass}`, lightnessBarSelector, (contextPen, canvas) => {
      contextPen.strokeRect(0, 0, canvas.width, 3);
    });
  },

  clearColorPickerPen : (penClass, planeSelector) => {
    Draw.drawPen(`.${penClass}`, planeSelector, (contextPen, canvas) => {
      contextPen.clearRect(0, 0, canvas.width, canvas.height);
    });
  },

  setHueSaturation : options => {
    setHslProperties(options, {
      'hue' : true,
      'saturation' : true
    }, (contextPen, canvas, clickCoordinates) => {
      // Moving hue-staruration pointer
      contextPen.beginPath();
      contextPen.arc(clickCoordinates.x, clickCoordinates.y, 2, 0, 2 * Math.PI);
      contextPen.stroke();
      contextPen.closePath();

      console.log(contextPen);
      console.log(canvas);
      console.log(clickCoordinates);
    });
  },

  setLightness : options => {
    setHslProperties(options, { 'lightness' : true }, (contextPen, canvas, clickCoordinates) => {
      // Moving lightness pointer
      contextPen.strokeRect(0, clickCoordinates.y, canvas.width, 3);
    });
  }
}

export default ChooseColorHelper;
