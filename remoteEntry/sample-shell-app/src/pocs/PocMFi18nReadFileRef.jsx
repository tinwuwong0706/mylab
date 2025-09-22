import React, { Component, Suspense } from 'react';
import { I18nextProvider, withTranslation } from 'react-i18next';
import { shellI18n, registerRemoteModule, syncRemoteModules } from '../i18n';

// Move lazy import outside the class
const PocMFi18nReadFile = React.lazy(() => 
  import('sample_module_app/pocs/PocMFi18nReadFile')
);

class PocMFi18nReadFileRef extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLanguage: shellI18n.language,
      remoteModuleLoaded: false,
      syncCleanup: null,
      remoteModuleInstance: null
    };
    
    // Bind methods
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleRemoteModuleLoad = this.handleRemoteModuleLoad.bind(this);
  }

  componentDidMount() {
    // Listen for language changes from the shell i18n instance
    this.languageChangeHandler = (lng) => {
      this.setState({ currentLanguage: lng });
      console.log('[Shell] Language changed to:', lng);
    };

    shellI18n.on('languageChanged', this.languageChangeHandler);
  }

  componentWillUnmount() {
    // Cleanup event listeners
    if (this.languageChangeHandler) {
      shellI18n.off('languageChanged', this.languageChangeHandler);
    }
    
    // Cleanup remote module sync
    if (this.state.syncCleanup) {
      this.state.syncCleanup();
    }
  }

  handleLanguageChange = async (language) => {
    try {
      console.log('[Shell] Changing language to:', language);
      
      // Update the shell's i18next instance
      await shellI18n.changeLanguage(language);
      
      // State will be updated via the languageChanged event listener
      this.props.i18n.changeLanguage(language);
      
    } catch (error) {
      console.error('[Shell] Failed to change language:', error);
    }
  };

  handleRemoteModuleLoad = (remoteModuleInstance) => {
    if (remoteModuleInstance && remoteModuleInstance.i18n) {
      console.log('[Shell] Remote module loaded, setting up language sync');
      
      // Register the remote module for language synchronization
      const cleanup = registerRemoteModule(remoteModuleInstance.i18n);
      
      this.setState({
        remoteModuleLoaded: true,
        syncCleanup: cleanup,
        remoteModuleInstance: remoteModuleInstance.i18n
      });
    }
  };

  // Enhanced remote component wrapper to handle module instance
  RemoteComponentWrapper = (props) => {
    return (
      <Suspense fallback={<div>{props.t('loading')}</div>}>
        <PocMFi18nReadFile 
          ref={(instance) => {
            if (instance && !this.state.remoteModuleLoaded) {
              this.handleRemoteModuleLoad(instance);
            }
          }}
          shellI18nInstance={shellI18n}
          currentLanguage={this.state.currentLanguage}
          {...props}
        />
      </Suspense>
    );
  };

  render() {
    const { currentLanguage, remoteModuleLoaded } = this.state;
    const { t } = this.props;
    const RemoteComponent = this.RemoteComponentWrapper;

    return (
      <I18nextProvider i18n={shellI18n}>
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>
            {t('title', { defaultValue: 'Module Federation i18n Demo' })}
          </h1>
          
          {/* Language Controls */}
          <div style={{ 
            margin: '20px 0', 
            textAlign: 'center',
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#495057' }}>
              {t('languageControl', { defaultValue: 'Language Control' })}
            </h3>
            <p style={{ margin: '0 0 10px 0' }}>
              {t('shellLanguage', { defaultValue: 'Shell Language' })}: 
              <strong style={{ color: '#e74c3c', marginLeft: '5px' }}>
                {currentLanguage.toUpperCase()}
              </strong>
            </p>
            
            {remoteModuleLoaded && (
              <p style={{ 
                margin: '0 0 10px 0', 
                color: '#27ae60',
                fontWeight: 'bold'
              }}>
                ✅ {t('moduleSynced', { defaultValue: 'Remote module synchronized' })}
              </p>
            )}
            
            <div style={{ marginTop: '10px' }}>
              <button 
                onClick={() => this.handleLanguageChange('en')}
                style={{
                  margin: '0 5px',
                  padding: '10px 20px',
                  backgroundColor: currentLanguage === 'en' ? '#3498db' : '#95a5a6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  if (currentLanguage !== 'en') {
                    e.target.style.backgroundColor = '#7f8c8d';
                  }
                }}
                onMouseOut={(e) => {
                  if (currentLanguage !== 'en') {
                    e.target.style.backgroundColor = '#95a5a6';
                  }
                }}
              >
                {t('setEnglish', { defaultValue: 'Set English' })}
              </button>
              
              <button 
                onClick={() => this.handleLanguageChange('zh')}
                style={{
                  margin: '0 5px',
                  padding: '10px 20px',
                  backgroundColor: currentLanguage === 'zh' ? '#3498db' : '#95a5a6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  if (currentLanguage !== 'zh') {
                    e.target.style.backgroundColor = '#7f8c8d';
                  }
                }}
                onMouseOut={(e) => {
                  if (currentLanguage !== 'zh') {
                    e.target.style.backgroundColor = '#95a5a6';
                  }
                }}
              >
                {t('setChinese', { defaultValue: 'Set Chinese' })}
              </button>
              
              {/* Additional language buttons can be added here */}
              <button 
                onClick={() => this.handleLanguageChange('fr')}
                style={{
                  margin: '0 5px',
                  padding: '10px 20px',
                  backgroundColor: currentLanguage === 'fr' ? '#3498db' : '#95a5a6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
              >
                {t('setFrench', { defaultValue: 'Set French' })}
              </button>
            </div>
          </div>

          {/* Remote Module Container */}
          <div style={{ 
            marginTop: '30px',
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '2px solid #3498db',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              color: '#2c3e50',
              borderBottom: '2px solid #3498db',
              paddingBottom: '10px',
              marginBottom: '20px'
            }}>
              {t('remoteModule', { defaultValue: 'Remote Module Content' })}
            </h2>
            
            <RemoteComponent t={t} />
          </div>

          {/* Debug Information */}
          <div style={{ 
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#fff3cd',
            borderRadius: '6px',
            border: '1px solid #ffeaa7',
            fontSize: '14px'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#856404' }}>
              🔧 {t('debugInfo', { defaultValue: 'Debug Information' })}
            </h4>
            <p style={{ margin: '5px 0' }}>
              <strong>Shell Language:</strong> {currentLanguage}
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>Module Sync Status:</strong> {remoteModuleLoaded ? '✅ Synchronized' : '⏳ Loading...'}
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>Available Languages:</strong> {shellI18n.languages?.join(', ') || 'en, zh'}
            </p>
          </div>
        </div>
      </I18nextProvider>
    );
  }
}

// Wrap with translation HOC for class component
export default withTranslation()(PocMFi18nReadFileRef);