import React from 'react';
import './ColorPicker.css';

import  ColorCircle  from '../../resources/ColorPicker/color-circle.png';
import  LightnessBar  from '../../resources/ColorPicker/grey-bar.png';

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const id = event.target.id;

    switch (id) {
      case 'show-panel':
        const colorPanel = document.querySelector('.color-panel');
        if (colorPanel.style.display === 'none') {
          colorPanel.style.display = 'block';

          this.drawPanel('.hue-circle', ColorCircle);
          this.drawPanel('.lightness-bar', LightnessBar);

          this.drawPen('.hue-pen', '.hue-circle', (contextPen, canvas) => {
            contextPen.arc(canvas.width / 2, canvas.height / 2, 2, 0, 2 * Math.PI);
            contextPen.stroke();
          });

          this.drawPen('.lightness-pen', '.lightness-bar', (contextPen, canvas) => {
            contextPen.strokeRect(0, 0, canvas.width, 3);
          });
        } else {
          colorPanel.style.display = 'none';
        }
        break;
      case 'hue-pen':
        console.log('!');
        this.drawPen('.hue-pen', '.hue-circle', (contextPen, canvas) => {
          contextPen.clearRect(0, 0, canvas.width, canvas.height);

        });
        break;
    }
  }

  drawPanel(canvasSelector, imgSrc) {
    const canvas = document.querySelector(canvasSelector);
    const context = canvas.getContext('2d');

    const image = new Image();
    image.src = imgSrc;

    image.onload = () => {
      context.drawImage(image, 0, 0);
    }
  }

  drawPen(canvasPenSelector, canvasSelector, drawFunction) {
    const canvasPen = document.querySelector(canvasPenSelector);
    const contextPen = canvasPen.getContext('2d');

    const canvas = document.querySelector(canvasSelector);

    drawFunction(contextPen, canvas);
  }

  render() {
    return (
      <div className="ColorPicker">
        <button id="show-panel"onClick={this.handleClick}>Color</button>
        <div className="color-panel" style={{display : 'none'}}>
          <div className="hue-panel">
            <canvas id="hue-pen" className="hue-pen"
            width="200px" height="200px"></canvas>
            <canvas id="hue-circle" className="hue-circle"
            width="200px" height="200px"></canvas>
          </div>
          <div className="lightness-panel">
            <canvas id="lightness-pen" className="lightness-pen"
            width="20px" height="200px"></canvas>
            <canvas id="lightness-bar" className="lightness-bar"
            width="20px" height="200px"></canvas>
          </div>
        </div>
      </div>
    )
  }
}

export default ColorPicker;
