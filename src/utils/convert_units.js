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

function HueToRgb(m1, m2, hue) {
	let v;
	if (hue < 0)
		hue += 1;
	else if (hue > 1)
		hue -= 1;

	if (6 * hue < 1)
		v = m1 + (m2 - m1) * hue * 6;
	else if (2 * hue < 1)
		v = m2;
	else if (3 * hue < 2)
		v = m1 + (m2 - m1) * (2/3 - hue) * 6;
	else
		v = m1;

	return 255 * v;
}

function hslToRgb(hue, saturation, lightness) {
  let m1, m2, h1;
	let r, g, b;
  let h = hue;
	let s = saturation / 100;
	let l = lightness / 100;
	if (s == 0)
		r = g = b = (l * 255);
	else {
		if (l <= 0.5)
			m2 = l * (s + 1);
		else
			m2 = l + s - l * s;
		m1 = l * 2 - m2;
		h1 = h / 360;
		r = HueToRgb(m1, m2, h1 + 1/3);
		g = HueToRgb(m1, m2, h1);
		b = HueToRgb(m1, m2, h1 - 1/3);
	}
	return {red : Math.round(r), green : Math.round(g), blue : Math.round(b)};
}

function formatColor(hue, saturation, lightness) {
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function deformatColor(color) {
  const arr = color.split(',');
  const hue = arr[0].replace('hsl(', '');
  const saturation = arr[1].replace(' ', '').replace('%', '');
  const lightness = arr[2].replace(' ', '').replace('%)', '');

  return {
    hue : +hue,
    saturation : +saturation,
    lightness : +lightness
  }
}

const Convert = {
  pixelToDecimal,
  rgbToHsl,
  hslToRgb,
  formatColor,
  deformatColor
};

export default Convert;
