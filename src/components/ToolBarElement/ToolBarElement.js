import React from 'react';
import './ToolBarElement.css';

class ToolBarElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = { highlight : { border : 'none'}};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.tool);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.active !== prevProps.active) {
      if(this.props.active) {
        this.setState({ highlight : { border : '2px solid orange' }});
      } else {
        this.setState({ highlight : { border : 'none' }});
      }
    }
  }

  render() {
    return (
      <div className="ToolBarElement" style={this.state.highlight}>
        <div onClick={this.handleClick}>
          <img src={this.props.iconSrc} />
        </div>
      </div>
    );
  }
}

export default ToolBarElement;
