export function clearCanvas(canvasSelector) {
  const canvas = document.querySelector(canvasSelector);
  const context = canvas.getContext('2d');

  context.clearRect(0, 0, canvas.width, canvas.height);
}
