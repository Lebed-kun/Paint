import Convert from '../convert_units';

export function pickColor(options) {
  const data = options.context.getImageData(options.lastX, options.lastY, 1, 1).data;
  const hsl = Convert.rgbToHsl(data[0], data[1], data[2]);
  options.tool.toolSettings.color = `hsl(${hsl.hue}, ${hsl.saturation}%, ${hsl.lightness}%)`;
}
