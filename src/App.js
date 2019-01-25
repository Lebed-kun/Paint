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
        color : 'hsl(0, 0, 0)',
        size : '12px'
      },
      'eraser' : {
        size : '12px'
      },
      'colorPicker' : {
        color : 'hsl(0, 0, 0)'
      },
      'paint' : {
        color : 'hsl(0, 0, 0)'
      },
      'text' : {
        color : 'hsl(0, 0, 0)',
        fontSize : '0.75rem',
        fontFamily : 'Arial',
        fontWeight : "Normal"
      }
    }
    this.state = {
      tool : 'brush',
      toolSettings : this.defaultToolSettings['brush']
    }
    this.selectTool = this.selectTool.bind(this);
    this.selectProperty = this.selectProperty.bind(this);
  }

  selectTool(tool) {
    this.setState({
      tool : tool,
      toolSettings : this.defaultToolSettings[tool]
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
        <Canvas />
        <ToolSettings
        tool={this.state.tool}
        onSelect={this.selectProperty}/>
      </div>
    );
  }
}

export default App;
