import Convert from '../convert_units';

export function drawBrush(options, isEraser) {
  const context = options.context;

  context.beginPath();
  context.strokeStyle = !isEraser ? options.tool.toolSettings.color : 'white';
  context.lineWidth = Convert.pixelToDecimal(options.tool.toolSettings.size) / 2;
  context.lineJoin = 'round';
  context.moveTo(options.lastX, options.lastY);
  context.lineTo(options.x, options.y);
  context.closePath();
  context.stroke();
}
