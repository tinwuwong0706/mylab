import React from 'react';
import './App.css';

function HelloWorldInBlue() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ color: 'blue' }}>
        <h1>Hello World in Blue from Remote Module!</h1>
        <p>This component is private but can be loaded remotely 🚀</p>
        </div>
      </header>
    </div>
  );
}

export default HelloWorldInBlue;

// Export for Module Federation
export { HelloWorldInBlue };
