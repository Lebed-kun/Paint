function pixelToDecimal(pixel) {
  return +(pixel.replace('px', ''));
}

const Convert = {
  pixelToDecimal
};

export default Convert;
