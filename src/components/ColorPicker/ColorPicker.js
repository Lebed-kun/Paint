import React from 'react';
import './ColorPicker.css';

import  ColorCircle  from '../../resources/ColorPicker/color-circle.png';
import  LightnessBar  from '../../resources/ColorPicker/grey-bar.png';

import Draw from '../../utils/draw';

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      hue : 0,
      saturation : 0,
      lightness : 0
    }
  }

  handleClick(event) {
    const id = event.target.id;

    switch (id) {
      case 'show-panel':
        const colorPanel = document.querySelector('.color-panel');
        if (colorPanel.style.display === 'none') {
          colorPanel.style.display = 'block';

          Draw.drawPanel('.hue-circle', ColorCircle);
          Draw.drawPanel('.lightness-bar', LightnessBar);

          Draw.drawPen('.hue-pen', '.hue-circle', (contextPen, canvas) => {
            contextPen.beginPath();
            contextPen.arc(canvas.width / 4, canvas.height / 4, 2, 0, 2 * Math.PI);
            contextPen.stroke();
            contextPen.closePath();
          });

          Draw.drawPen('.lightness-pen', '.lightness-bar', (contextPen, canvas) => {
            contextPen.strokeRect(0, 0, canvas.width, 3);
          });
        } else {
          colorPanel.style.display = 'none';

          Draw.drawPen('.hue-pen', '.hue-circle', (contextPen, canvas) => {
            contextPen.clearRect(0, 0, canvas.width, canvas.height);
          });

          Draw.drawPen('.lightness-pen', '.lightness-bar', (contextPen, canvas) => {
            contextPen.clearRect(0, 0, canvas.width, canvas.height);
          });
        }
        break;
      case 'hue-pen':
        Draw.drawPen('.hue-pen', '.hue-circle', (contextPen, canvas) => {
          // Moving hue-staruration pointer
          contextPen.clearRect(0, 0, canvas.width, canvas.height);
          const clickCoordinates = Draw.getMousePos(canvas, event);
          contextPen.beginPath();
          contextPen.arc(clickCoordinates.x, clickCoordinates.y, 2, 0, 2 * Math.PI);
          contextPen.stroke();
          contextPen.closePath();

          // Getting hue and saturation values
          const data = canvas.getContext('2d').getImageData(clickCoordinates.x, clickCoordinates.y, 1, 1).data;
          const hueSaturation = Draw.rgbToHsl(data[0], data[1], data[2]);

          this.setState( { hue : hueSaturation.hue, saturation : hueSaturation.saturation });

          // Sending color value
          this.props.onSelect(Draw.formatColor(hueSaturation.hue, hueSaturation.saturation, this.state.lightness));
        });
        break;
      case 'lightness-pen':
        Draw.drawPen('.lightness-pen', '.lightness-bar', (contextPen, canvas) => {
          // Moving lightness pointer
          contextPen.clearRect(0, 0, canvas.width, canvas.height);
          const clickCoordinates = Draw.getMousePos(canvas, event);
          contextPen.strokeRect(0, clickCoordinates.y, canvas.width, 3);

          // Getting lightness value
          const data = canvas.getContext('2d').getImageData(clickCoordinates.x, clickCoordinates.y, 1, 1).data;
          const lightness = Draw.rgbToHsl(data[0], data[1], data[2]).lightness;

          this.setState({ lightness : lightness });
          // Sending color value
          this.props.onSelect(Draw.formatColor(this.state.hue, this.state.saturation, lightness))
        })
        break;
    }
  }


  render() {
    const color = Draw.formatColor(this.state.hue, this.state.saturation, this.state.lightness);

    return (
      <div className="ColorPicker">
        <div id="show-panel" onClick={this.handleClick}
        style={{
          width : '20px',
          height : '10px',
          backgroundColor : color
        }}></div>
        <div className="color-panel" style={{display : 'none'}}>
          <div className="hue-panel">
            <canvas id="hue-pen" className="hue-pen"
            width="200px" height="200px"
            onClick={this.handleClick}></canvas>
            <canvas id="hue-circle" className="hue-circle"
            width="400px" height="400px"></canvas>
          </div>
          <div className="lightness-panel">
            <canvas id="lightness-pen" className="lightness-pen"
            width="20px" height="200px"
            onClick={this.handleClick}></canvas>
            <canvas id="lightness-bar" className="lightness-bar"
            width="20px" height="200px"></canvas>
          </div>
        </div>
      </div>
    )
  }
}

export default ColorPicker;
