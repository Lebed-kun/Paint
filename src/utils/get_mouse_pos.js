export function getMousePos(canvas, event) {
  const rectangle = canvas.getBoundingClientRect();
  return {
    x : event.clientX - rectangle.left,
    y : event.clientY - rectangle.top
  }
}
