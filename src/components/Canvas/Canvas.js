import React from 'react';
import './Canvas.css';

import Draw from '../../utils/draw';
import { setOptions } from '../../utils/change_object';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tool : this.props.tool };
    this.initDrawing = this.initDrawing.bind(this);
  }

  initDrawing() {
    const canvasPen = document.querySelector('.pen');
    const canvasDraw = document.querySelector('.draw-area');
    const context = canvasDraw.getContext('2d');
    let options = {
      isDown : false,
      context : context,
      tool : this.props.tool
    };
    let mousePressed = false;

    canvasPen.onmousedown = event => {
      const mouseCoordinates = Draw.getMousePos(canvasPen, event);
      mousePressed = true;
      setOptions(options, {
        x : mouseCoordinates.x,
        y : mouseCoordinates.y,
        tool : this.props.tool
      });
      Draw.draw(options);
    };

    canvasPen.onmousemove = event => {
      if (mousePressed) {
        const mouseCoordinates = Draw.getMousePos(canvasPen, event);
        setOptions(options, {
          x : mouseCoordinates.x,
          y : mouseCoordinates.y,
          isDown : true
        });
        Draw.draw(options);
      }
    }

    canvasPen.onmouseup = event => {
      mousePressed = false;
      setOptions(options, {
        isDown : false
      });
    }

    canvasPen.onmouseleave = event => {
      mousePressed = false;
      setOptions(options, {
        isDown : false
      });
    }
  }

  componentDidMount() {
    this.initDrawing();
  }

  render() {
    return (
      <div className="Canvas">
        <canvas id="pen" width="800px" height="400px" className="pen">
        </canvas>
        <canvas id="draw-area" width="800px" height="400px" className="draw-area">
        </canvas>
      </div>
    )
  }
}

export default Canvas;
