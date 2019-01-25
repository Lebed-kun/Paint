import React from 'react';
import './Canvas.css';

class Canvas extends React.Component {
  render() {
    return (
      <div className="Canvas">
        <canvas id="draw-area" width="800px" height="400px">
        </canvas>
      </div>
    )
  }
}

export default Canvas;
