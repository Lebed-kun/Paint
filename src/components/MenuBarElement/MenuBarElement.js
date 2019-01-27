import React from 'react';
import './MenuBarElement.css';

class MenuBarElement extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.openFileDialog = this.openFileDialog.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleClick() {
    this.props.onSelect(this.props.command);
  }

  chooseMenuComponent() {
    let menuComponent;
    switch (this.props.command) {
      case 'clear':
        menuComponent = (<div>{this.props.command}</div>);
        break;
      case 'import':
        menuComponent = (<div onClick={this.openFileDialog}>
            <div>{this.props.command}</div>
            <input type="file" className="file-input" style={{
              display : 'none'
            }} onChange={this.handleImageChange}/>
          </div>)
        break;
      case 'export':
        break;
    }

    return menuComponent;
  }

  openFileDialog() {
    document.querySelector('.file-input').click();
  }

  handleImageChange(event) {
    event.preventDefault();

    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      this.props.onSelectImage({
        file : file,
        imageUrl : reader.result
      });
    }

    reader.readAsDataURL(file);
  }

  render() {
    const menuComponent = this.chooseMenuComponent();

    return (
      <div className="MenuBarElement"
      onClick={this.handleClick}>
        {menuComponent}
      </div>
    );
  }
}

export default MenuBarElement;
