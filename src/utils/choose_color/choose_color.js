import Draw from '../draw';
import Convert from '../convert_units';

import ChooseColorHelper from './choose_color_helper';

export function chooseColor(options) {
  /* clickableClass,
  colorPickerClasses{showPanelClass, huePenClass, lightnessPenClass},
  colorPanelSelector,
  colorPickerPlanes{hueCircleSelector, lightnessBarSelector},
  colorPickerImages{hueCircleImage, lightnessBarImage}
  component,
  event
   */
  const showPanelClass = options.colorPickerClasses.showPanelClass;
  const huePenClass = options.colorPickerClasses.huePenClass;
  const lightnessPenClass = options.colorPickerClasses.lightnessPenClass;

  const hueCircleSelector = options.colorPickerPlanes.hueCircleSelector;
  const lightnessBarSelector = options.colorPickerPlanes.lightnessBarSelector;

  const hueCircleImage = options.colorPickerImages.hueCircleImage;
  const lightnessBarImage = options.colorPickerImages.lightnessBarImage;

  const component = options.component;

  switch (options.clickableClass) {
    case showPanelClass:
      const colorPanel = document.querySelector(options.colorPanelSelector);
      if (colorPanel.style.display === 'none') {
        colorPanel.style.display = 'block';

        Draw.drawPanel(hueCircleSelector, hueCircleImage);
        Draw.drawPanel(lightnessBarSelector, lightnessBarImage);

        ChooseColorHelper.drawHuePen(huePenClass, hueCircleSelector);
        ChooseColorHelper.drawLightnessPen(lightnessPenClass, lightnessBarSelector);
      } else {
        colorPanel.style.display = 'none';

        ChooseColorHelper.clearColorPickerPen(huePenClass, hueCircleSelector);
        ChooseColorHelper.clearColorPickerPen(lightnessPenClass, lightnessBarSelector);
      }
      break;
    case huePenClass:
      Draw.drawPen(`.${huePenClass}`, hueCircleSelector, (contextPen, canvas) => {
        ChooseColorHelper.setHueSaturation({
          contextPen : contextPen,
          canvas : canvas,
          component : component,
          colorPickerOptions : options
        });
      });
      break;
    case lightnessPenClass:
      Draw.drawPen(`.${lightnessPenClass}`, lightnessBarSelector, (contextPen, canvas) => {
        ChooseColorHelper.setLightness({
          contextPen : contextPen,
          canvas : canvas,
          component : component,
          colorPickerOptions : options
        })
      })
      break;
  }
}
