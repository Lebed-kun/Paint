import Draw from '../draw';
import Convert from '../convert_units';

const ChooseColorHelper = {
  drawHuePen : (huePenClass, hueCircleSelector) => {
    Draw.drawPen(`.${huePenClass}`, hueCircleSelector, (contextPen, canvas) => {
      contextPen.beginPath();
      contextPen.arc(canvas.width / 4, canvas.height / 4, 2, 0, 2 * Math.PI);
      contextPen.stroke();
      contextPen.closePath();
    });
  },

  drawLightnessBar : (lightnessPenClass, lightnessBarSelector) => {
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
    // Set up options
    const contextPen = options.contextPen;
    const canvas = options.canvas;
    const component = options.component;
    const colorPickerOptions = options.colorPickerOptions;

    // Moving hue-staruration pointer
    contextPen.clearRect(0, 0, canvas.width, canvas.height);
    const clickCoordinates = Draw.getMousePos(canvas, colorPickerOptions.event);
    contextPen.beginPath();
    contextPen.arc(clickCoordinates.x, clickCoordinates.y, 2, 0, 2 * Math.PI);
    contextPen.stroke();
    contextPen.closePath();

    // Getting hue and saturation values
    const data = canvas.getContext('2d').getImageData(clickCoordinates.x, clickCoordinates.y, 1, 1).data;
    const hueSaturation = Convert.rgbToHsl(data[0], data[1], data[2]);

    const showColor = Convert.formatColor(hueSaturation.hue, hueSaturation.saturation, component.state.lightness);

    component.setState( { hue : hueSaturation.hue, saturation : hueSaturation.saturation});

    // Sending color value
    component.props.onSelect(showColor);
  },

  setLightness : options => {
    // Set up options
    const contextPen = options.contextPen;
    const canvas = options.canvas;
    const component = options.component;
    const colorPickerOptions = options.colorPickerOptions;

    // Moving lightness pointer
    contextPen.clearRect(0, 0, canvas.width, canvas.height);
    const clickCoordinates = Draw.getMousePos(canvas, colorPickerOptions.event);
    contextPen.strokeRect(0, clickCoordinates.y, canvas.width, 3);

    // Getting lightness value
    const data = canvas.getContext('2d').getImageData(clickCoordinates.x, clickCoordinates.y, 1, 1).data;
    const lightness = Convert.rgbToHsl(data[0], data[1], data[2]).lightness;

    const showColor = Convert.formatColor(component.state.hue, component.state.saturation, lightness);

    component.setState({ lightness : lightness });

    // Sending color value
    component.props.onSelect(showColor)
  }
}

export default ChooseColorHelper;
