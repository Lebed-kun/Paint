export function importImage(canvasSelector, image) {
  const canvas = document.querySelector(canvasSelector);
  const context = canvas.getContext('2d');

  const img = new Image();
  img.src = image.imageUrl;

  img.onload = () => {
    context.drawImage(img, 0, 0);
  }
}
