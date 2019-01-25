import React from 'react';
import './ToolBar.css';

import ToolBarElement from '../ToolBarElement/ToolBarElement';

import BrushIcon from '../../resources/ToolBarIcons/brush.png';
import EraserIcon from '../../resources/ToolBarIcons/eraser.png';
import ColorPickerIcon from '../../resources/ToolBarIcons/color-picker.png';
import TextIcon from '../../resources/ToolBarIcons/text.png';
import PaintIcon from '../../resources/ToolBarIcons/paint.png';

class ToolBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTool : 'brush'
    }

    this.handleClick = this.handleClick.bind(this);
    this.isToolActive = this.isToolActive.bind(this);
  }

  handleClick(tool) {
    this.props.onSelect(tool);
    this.setState( { activeTool : tool });
  }

  isToolActive(tool) {
    return tool === this.state.activeTool;
  }

  render() {
    return (
      <div className="ToolBar">
        <ToolBarElement
        onClick={this.handleClick}
        iconSrc={BrushIcon}
        tool="brush"
        active={this.isToolActive('brush')}/>
        <ToolBarElement
        onClick={this.handleClick}
        iconSrc={EraserIcon}
        tool="eraser"
        active={this.isToolActive('eraser')}/>
        <ToolBarElement
        onClick={this.handleClick}
        iconSrc={ColorPickerIcon}
        tool="colorPicker"
        active={this.isToolActive('colorPicker')}/>
        <ToolBarElement
        onClick={this.handleClick}
        iconSrc={PaintIcon}
        tool="paint"
        active={this.isToolActive('paint')}/>
        <ToolBarElement
        onClick={this.handleClick}
        iconSrc={TextIcon}
        tool="text"
        active={this.isToolActive('text')}/>
      </div>
    )
  }
}

export default ToolBar;
