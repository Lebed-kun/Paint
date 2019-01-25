import React from 'react';
import './MenuBar.css';

import MenuBarElement from '../MenuBarElement/MenuBarElement';

class MenuBar extends React.Component {
  render() {
    return (
      <div className="MenuBar">
        <MenuBarElement />
        <MenuBarElement />
        <MenuBarElement />
        <MenuBarElement />
        <MenuBarElement />
      </div>
    )
  }
}

export default MenuBar;
