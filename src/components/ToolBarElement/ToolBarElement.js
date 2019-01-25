import React from 'react';
import './ToolBarElement.css';

class ToolBarElement extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.tool);
  }

  render() {
    return (
      <div className="ToolBarElement">
        <div onClick={this.handleClick}>
          <img src={this.props.iconSrc} />
        </div>
      </div>
    );
  }
}

export default ToolBarElement;
