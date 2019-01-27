function pixelToDecimal(pixel) {
  return +(pixel.replace('px', ''));
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

function formatColor(hue, saturation, lightness) {
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

const Convert = {
  pixelToDecimal,
  rgbToHsl,
  formatColor
};

export default Convert;
