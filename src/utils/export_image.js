export function exportImage(canvasSelector) {
  const canvas = document.querySelector(canvasSelector);
  document.location.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
}
