import React from 'react';
import './ToolSettings.css';

import ToolSettingsElement from '../ToolSettingsElement/ToolSettingsElement';
import ColorPicker from '../ColorPicker/ColorPicker';

class ToolSettings extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleColorSelect = this.handleColorSelect.bind(this);
  }

  handleSelect(event) {
    const property = event.target.id;
    const value = event.target.options[event.target.selectedIndex].value;
    this.props.onSelect(property, value);
  }

  handleColorSelect(color) {
    this.props.onSelect('color', color);
  }

  getSettingComponents() {
    const elementsCollection = {
      colorSelect : (<ToolSettingsElement key="color"
                      name="color">
                        <span>Color:</span>
                        <ColorPicker onSelect={this.handleColorSelect}
                        color={this.props.tool.toolSettings.color}/>
                    </ToolSettingsElement>),
      sizeSelect : (<ToolSettingsElement key="size"
                    name="size">
                      <span>Size:</span>
                      <select id="size"
                      onChange={this.handleSelect}>
                        <option value="4px" style={{fontSize : '0.5rem'}}>●</option>
                        <option value="8px" style={{fontSize : '1rem'}}>●</option>
                        <option value="16px" style={{fontSize : '2rem'}}>●</option>
                        <option value="32px" style={{fontSize : '4rem'}}>●</option>
                        <option value="64px" style={{fontSize : '8rem'}}>●</option>
                      </select>
                    </ToolSettingsElement>),
      fontSizeSelect : (<ToolSettingsElement key="fontSize"
                    name="fontSize">
                      <select id="fontSize"
                      onChange={this.handleSelect}>
                        <option value="0.5rem">8px</option>
                        <option value="0.75rem">12px</option>
                        <option value="1rem">16px</option>
                        <option value="1.5rem">24px</option>
                        <option value="2rem">32px</option>
                      </select>
                    </ToolSettingsElement>),
      fontFamilySelect : (<ToolSettingsElement key="fontFamily"
                          name="fontFamily">
                            <select id="fontFamily"
                            onChange={this.handleSelect}>
                              <option value="Arial">Arial</option>
                              <option value="Times New Roman">Times New Roman</option>
                              <option value="Comic Sans">Comic Sans</option>
                              <option value="Helvetica">Helvetica</option>
                            </select>
                          </ToolSettingsElement>),
      fontStyleSelect : (<ToolSettingsElement key="fontWeight"
                          name="fontWeight">
                          <select id="fontWeight"
                          onChange={this.handleSelect}>
                            <option value="Normal">Normal</option>
                            <option value="Bold">Bold</option>
                          </select>
                        </ToolSettingsElement>)
    };

    return elementsCollection;
  }

  getToolSettings(toolName) {
    const settingComponents = this.getSettingComponents();
    const toolSettings = {
      'brush' : [settingComponents.colorSelect, settingComponents.sizeSelect],
      'eraser' : [settingComponents.sizeSelect],
      'colorPicker' : [settingComponents.colorSelect],
      'text' : [settingComponents.colorSelect,  settingComponents.fontSizeSelect, settingComponents.fontFamilySelect, settingComponents.fontStyleSelect]
    };

    return toolSettings[toolName];
  }

  render() {
    const settings = this.getToolSettings(this.props.tool.toolName);
    return (
      <div className="ToolSettings">
        {settings}
      </div>
    )
  }
}

export default ToolSettings;
