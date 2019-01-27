import React from 'react';
import './Canvas.css';

import { initDrawing, initPen } from '../../utils/init_drawing';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tool : this.props.tool };
  }

  componentDidMount() {
    initDrawing({
      canvasPenSelector : '.pen',
      canvasDrawSelector : '.draw-area',
      component : this
    });
    initPen({
      canvasPenSelector : '.pen',
      component : this
    });
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
