import React from 'react';
import './ColorPicker.css';

import  ColorCircle  from '../../resources/ColorPicker/color-circle.png';
import  LightnessBar  from '../../resources/ColorPicker/grey-bar.png';

import { chooseColor } from '../../utils/choose_color/choose_color';

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
    const clickableClass = event.target.className;

    chooseColor({
      clickableClass : clickableClass,
      colorPickerClasses : {
        showPanelClass : 'show-panel',
        huePenClass : 'hue-pen',
        lightnessPenClass : 'lightness-pen'
      },
      colorPanelSelector : '.color-panel',
      colorPickerPlanes : {
        hueCircleSelector : '.hue-circle',
        lightnessBarSelector : '.lightness-bar'
      },
      colorPickerImages : {
        hueCircleImage : ColorCircle,
        lightnessBarImage : LightnessBar
      },
      component : this,
      event : event
    });
  }


  render() {
    return (
      <div className="ColorPicker">
        <div id="show-panel" onClick={this.handleClick}
        style={{
          width : '20px',
          height : '10px',
          backgroundColor : this.props.color
        }} className="show-panel"></div>
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
