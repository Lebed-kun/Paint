import React from 'react';
import './MenuBar.css';

import MenuBarElement from '../MenuBarElement/MenuBarElement';

class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(command) {
    this.props.onSelect(command);
  }

  render() {
    return (
      <div className="MenuBar">
        <MenuBarElement
        command="clear"
        onSelect={this.handleSelect}/>
        <MenuBarElement
        command="import"
        onSelect={this.handleSelect}/>
        <MenuBarElement
        command="export"
        onSelect={this.handleSelect}/>
      </div>
    )
  }
}

export default MenuBar;
