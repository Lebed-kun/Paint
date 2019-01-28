import React from 'react';
import './MenuBarElement.css';

class MenuBarElement extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickClear = this.handleClickClear.bind(this);
    this.openFileDialog = this.openFileDialog.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.downloadImage = this.downloadImage.bind(this);
  }

  chooseMenuComponent() {
    let menuComponent;
    switch (this.props.command) {
      case 'clear':
        menuComponent = (<div onClick={this.handleClickClear}>{this.props.command}</div>);
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
        menuComponent = (<div onClick={this.downloadImage}>{this.props.command}</div>);
        break;
    }

    return menuComponent;
  }

  downloadImage() {
    this.props.onSelect('export');
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
        imageUrl : reader.result
      });
      this.props.onSelect('import');
    }

    reader.readAsDataURL(file);
  }

  handleClickClear() {
    this.props.onSelect('clear');
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
