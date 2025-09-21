import React, { Component } from 'react';

class HelloWorldLabel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { color, fontSize, text } = this.props; // Destructure props

    return (
      <div>
        <span 
          style={{ 
            color: color, 
            fontSize: fontSize,
            fontWeight: 'bold',
            padding: '10px',
            border: `2px solid ${color}`,
            borderRadius: '5px'
          }}
        >
          {text}
        </span>
      </div>
    );
  }
}

// Add default props for safety
HelloWorldLabel.defaultProps = {
  color: 'black',
  fontSize: '16px',
  text: 'Hello World'
};

export default HelloWorldLabel;