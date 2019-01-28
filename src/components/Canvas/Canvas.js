import React from 'react';
import './Canvas.css';

import { initDrawing, initPen } from '../../utils/init_drawing';
import { clearCanvas } from '../../utils/clear_canvas';
import { importImage } from '../../utils/import_image';
import { exportImage } from '../../utils/export_image';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelectCommand = this.handleSelectCommand.bind(this);
  }

  handleSelectCommand(command) {
    this.props.onSelectCommand(command);
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.command !== prevProps.command) {
      switch (this.props.command) {
        case 'clear':
          clearCanvas('.draw-area');
          break;
        case 'import':
          importImage('.draw-area', this.props.image);
          break;
        case 'export':
          exportImage('.draw-area');
          break;
      }
    }
  }

  render() {
    return (
      <div className="Canvas">
        <canvas id="pen" className="pen">
        </canvas>
        <canvas id="draw-area" className="draw-area">
        </canvas>
      </div>
    )
  }
}

export default Canvas;
