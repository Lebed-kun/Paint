export function clearCanvas(canvasSelector) {
  const canvas = document.querySelector(canvasSelector);
  const context = canvas.getContext('2d');

  context.fillRect(0, 0, canvas.width, canvas.height);
}
