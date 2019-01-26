import React, { Component } from 'react';
import './App.css';

import ToolBar from './components/ToolBar/ToolBar';
import MenuBar from './components/MenuBar/MenuBar';
import Canvas from './components/Canvas/Canvas';
import ToolSettings from './components/ToolSettings/ToolSettings';

import { setOptions } from './utils/change_object';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolName : 'brush',
      toolSettings : {
        color : 'hsl(0, 0, 0)',
        size : '8px'
      }
    }
    this.selectTool = this.selectTool.bind(this);
    this.selectProperty = this.selectProperty.bind(this);
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

  render() {
    return (
      <div className="App">
        <ToolBar
        onSelect={this.selectTool}
        />
        <MenuBar />
        <Canvas tool={this.state}
        onSelect={this.selectProperty}/>
        <ToolSettings
        tool={this.state}
        onSelect={this.selectProperty}/>
      </div>
    );
  }
}

export default App;
