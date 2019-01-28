import React, { Component } from 'react';
import './App.css';

import ToolBar from './components/ToolBar/ToolBar';
import MenuBar from './components/MenuBar/MenuBar';
import Canvas from './components/Canvas/Canvas';
import ToolSettings from './components/ToolSettings/ToolSettings';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolName : 'brush',
      toolSettings : {
        color : 'hsl(0, 0%, 0%)',
        size : '8px'
      },
      command : 'draw'
    }
    this.selectTool = this.selectTool.bind(this);
    this.selectProperty = this.selectProperty.bind(this);
    this.selectCommand = this.selectCommand.bind(this);
    this.selectImage = this.selectImage.bind(this);
  }

  selectTool(toolName) {
    this.setState({
      toolName : toolName
    });
  }

  selectProperty(property, value) {
    const newSettings = {};
    for (let key in this.state.toolSettings) {
      if (key === property) {
        newSettings[key] = value;
      } else {
        newSettings[key] = this.state.toolSettings[key];
      }
    }
    this.setState({ toolSettings : newSettings });
  }

  selectCommand(command) {
    this.setState({ command : command });
  }

  selectImage(imageData) {
    this.setState({ image : imageData });
  }

  render() {
    return (
      <div className="App">
        <MenuBar
        onSelect={this.selectCommand}
        onSelectImage={this.selectImage}/>
        <div className="row-1">
          <ToolBar
          onSelect={this.selectTool}
          />
          <Canvas tool={this.state}
          onSelect={this.selectProperty}
          command={this.state.command}
          onSelectCommand={this.selectCommand}
          image={this.state.image}
          />
          <ToolSettings
          tool={this.state}
          onSelect={this.selectProperty}/>
        </div>
      </div>
    );
  }
}

export default App;
