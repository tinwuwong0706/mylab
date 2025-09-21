import React, { useState } from 'react';
import './App.css';
import PocMFi18nRef from './pocs/PocMFi18nRef';
import PocMFi18nEvtRef from './pocs/PocMFi18nEvtRef';
import PocMFi18nReadFileRef from './pocs/PocMFi18nReadFileRef';


const RemotePocMFHelloWorld = React.lazy(() => 
  import('sample_module_app/pocs/PocMFHelloWorld')
);		 
// Mock POC cases - replace with your actual POC components
//const Poc1 = () => <div className="poc-content"><h2>POC 1: Module Federation</h2><p>This demonstrates remote component loading.</p></div>;
const Poc2 = () => <div className="poc-content"><h2>POC 2: Color API</h2><p>This shows API communication between apps.</p></div>;
const Poc3 = () => <div className="poc-content"><h2>POC 3: State Management</h2><p>This tests state synchronization.</p></div>;
const Poc4 = () => <div className="poc-content"><h2>POC 4: UI Components</h2><p>This showcases custom UI elements.</p></div>;

const POC_CASES = [
  { id: 1, name: "Module Federation", component: RemotePocMFHelloWorld },
  { id: 2, name: "i18n (state+parm)", component: PocMFi18nRef },
  { id: 3, name: "i18n (event-notify)", component: PocMFi18nEvtRef },
  { id: 4, name: "i18n (read file)", component: PocMFi18nReadFileRef },
];

function App() {
  const [selectedPoc, setSelectedPoc] = useState(POC_CASES[0]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const PocComponent = selectedPoc.component;

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <h1>POC Laboratory - Sample Shell Application</h1>
        <p>Proof of Concept Testing Platform</p>
      </header>

      <div className="app-body">
        {/* Sidebar */}
        <div className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-header">
            <h2>POC Cases</h2>
            <button 
              className="toggle-sidebar"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            >
              {isSidebarCollapsed ? '→' : '←'}
            </button>
          </div>
          
          {!isSidebarCollapsed && (
            <nav className="poc-nav">
              <ul>
                {POC_CASES.map(poc => (
                  <li key={poc.id}>
                    <button
                      className={`poc-button ${selectedPoc.id === poc.id ? 'active' : ''}`}
                      onClick={() => setSelectedPoc(poc)}
                    >
                      {poc.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        {/* Main Content */}
        <main className="main-content">
          <div className="content-header">
            <h2>{selectedPoc.name}</h2>
            {isSidebarCollapsed && (
              <button 
                className="show-sidebar"
                onClick={() => setIsSidebarCollapsed(false)}
              >
                Show Menu
              </button>
            )}
          </div>
          
          <div className="poc-container">
            <PocComponent />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;