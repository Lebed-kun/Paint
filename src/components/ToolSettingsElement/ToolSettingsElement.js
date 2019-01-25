import React from 'react';
import './ToolSettingsElement.css';

class ToolSettingsElement extends React.Component {

  render() {

    return (
      <div className="ToolSettingsElement">
        {this.props.children}
      </div>
    )
  }
}

export default ToolSettingsElement;
