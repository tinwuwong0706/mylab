import React, { Component, Suspense } from 'react';

class PocMFHelloWorld extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const RemoteHelloWorld = React.lazy(() => 
      import('sample_module_app/pocs/PocMFHelloWorld')
    );

    return (
      <div className="App">
        <header className="App-header">
          <h1>Shell Application</h1>
          <p>Controlling color via Remote API</p>          
        </header>
        <div className="App-body">
          <Suspense fallback={<div>Loading Remote Component...</div>}>
            <RemoteHelloWorld/>
          </Suspense>
        </div>
      </div>
    );
  }
}
PocMFHelloWorld.title = "Module Federation";
export default PocMFHelloWorld;