import React from 'react';
import './ToolSettings.css';

import ToolSettingsElement from '../ToolSettingsElement/ToolSettingsElement';
import ColorPicker from '../ColorPicker/ColorPicker';

class ToolSettings extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.elementsCollections = {
      colorSelect : (<ToolSettingsElement key="color"
                      name="color">
                        <ColorPicker />
                    </ToolSettingsElement>),
      sizeSelect : (<ToolSettingsElement key="size"
                    name="size">
                      <select id="size"
                      onChange={this.handleSelect}>
                        <option value="4px" style={{fontSize : '0.25rem'}}>●</option>
                        <option value="8px" style={{fontSize : '0.5rem'}}>●</option>
                        <option value="12px" style={{fontSize : '1rem'}}>●</option>
                        <option value="18px" style={{fontSize : '2rem'}}>●</option>
                        <option value="24px" style={{fontSize : '4rem'}}>●</option>
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
    this.toolSettings = {
      'brush' : [this.elementsCollections.colorSelect, this.elementsCollections.sizeSelect],
      'eraser' : [this.elementsCollections.sizeSelect],
      'colorPicker' : [this.elementsCollections.colorSelect],
      'paint' : [this.elementsCollections.colorSelect],
      'text' : [this.elementsCollections.colorSelect,  this.elementsCollections.fontSizeSelect, this.elementsCollections.fontFamilySelect, this.elementsCollections.fontStyleSelect]
    };
  }

  handleSelect(event) {
    const property = event.target.id;
    const value = event.target.options[event.target.selectedIndex].value;
    this.props.onSelect(property, value);
  }

  render() {
    const settings = this.toolSettings[this.props.tool];
    return (
      <div className="ToolSettings">
        {settings}
      </div>
    )
  }
}

export default ToolSettings;
