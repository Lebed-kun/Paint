import React from 'react';
import './MenuBarElement.css';

class MenuBarElement extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onSelect(this.props.command);
  }

  render() {
    return (
      <div className="MenuBarElement"
      onClick={this.handleClick}>
        {this.props.command}
      </div>
    );
  }
}

export default MenuBarElement;
