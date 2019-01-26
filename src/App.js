import React, { Component } from 'react';
import './App.css';

import ToolBar from './components/ToolBar/ToolBar';
import MenuBar from './components/MenuBar/MenuBar';
import Canvas from './components/Canvas/Canvas';
import ToolSettings from './components/ToolSettings/ToolSettings';

class App extends Component {
  constructor(props) {
    super(props);
    this.defaultToolSettings = {
      'brush' : {
        size : '12px'
      },
      'eraser' : {
        size : '12px'
      },
      'text' : {
        fontSize : '0.75rem',
        fontFamily : 'Arial',
        fontWeight : "Normal"
      }
    }
    this.state = {
      toolName : 'brush',
      toolSettings : {
        color : 'hsl(0, 0, 0)',
        size : '12px'
      }
    }
    this.selectTool = this.selectTool.bind(this);
    this.selectProperty = this.selectProperty.bind(this);
  }

  selectTool(toolName) {
    const defaultToolSettings = this.defaultToolSettings[toolName];

    this.setState({
      toolName : toolName,
      toolSettings : defaultToolSettings || this.state.toolSettings
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

  render() {
    return (
      <div className="App">
        <ToolBar
        onSelect={this.selectTool}
        />
        <MenuBar />
        <Canvas tool={this.state}/>
        <ToolSettings
        toolName={this.state.toolName}
        onSelect={this.selectProperty}/>
      </div>
    );
  }
}

export default App;
