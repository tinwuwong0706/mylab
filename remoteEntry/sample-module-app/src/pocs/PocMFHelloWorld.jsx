import React, { Component } from 'react'; // Added { Component } import
import HelloWorldLabel from './HelloWorldLabel';

class PocMFHelloWorld extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    
        const color = "blue";
        const fontSize = "25px";
        const text = "Hello World!";
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
export const title = "Module Federation";
PocMFHelloWorld.title = "Module Federation";
//export const description = "Demonstrates remote component loading via Module Federation";
export default PocMFHelloWorld;