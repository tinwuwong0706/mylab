import React, { Component, Suspense } from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Initialize i18next in the shell app
i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          loading: "Loading i18n component...",
          loading2: "Loading i18n2 component...",
          shellLanguage: "Shell app knows current language",
          setEnglish: "Set English",
          setChinese: "Set Chinese",
          title: "Module Federation i18n Demo"
        }
      },
      zh: {
        translation: {
          loading: "正在加载国际化组件...",
          loading2: "正在加载国际化组件2...",
          shellLanguage: "Shell应用知道当前语言",
          setEnglish: "设置为英文",
          setChinese: "设置为中文",
          title: "模块联邦国际化演示"
        }
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

 // Listen for language changes and notify micro-frontends
i18next.on('languageChanged', (lng) => {
  // Dispatch custom event to all micro-frontends
  window.dispatchEvent(new CustomEvent('language-change', { 
    detail: { language: lng } 
  }));
});

// Move lazy import outside the class
const PocMFi18nEvt = React.lazy(() => 
  import('sample_module_app/pocs/PocMFi18nEvt')
);

class PocMFi18nEvtRef extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLanguage: 'en'
    };
  }

  handleLanguageChange = (language) => {
    this.setState({ currentLanguage: language });
    // Also update the shell's i18next instance
    i18next.changeLanguage(language);
    console.log('Language changed to:', language);
  };

  componentDidMount() {
    // Set up listener for language changes from MFEs
    this.languageChangeListener = (lang) => {
      this.setState({ currentLanguage: lang });
      i18next.changeLanguage(lang);
    };
  }

  componentWillUnmount() {
    // Clean up listener if needed
    if (this.languageChangeListener) {
      // Remove listener logic here if implemented
    }
  }

  render() {
    const { currentLanguage } = this.state;
    const { t } = this.useTranslation();

    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>
          {t('title')}
        </h1>
        
        <Suspense fallback={<div>{t('loading')}</div>}>
          <PocMFi18nEvt 
            key={currentLanguage}
            initialLanguage={currentLanguage}
            onLanguageChange={this.handleLanguageChange}
          />
        </Suspense>
        
        <div style={{ 
          marginTop: '20px', 
          textAlign: 'center',
          padding: '15px',
          backgroundColor: '#e8f4f8',
          borderRadius: '8px'
        }}>
          <p>
            {t('shellLanguage')}: <strong>{currentLanguage}</strong>
          </p>
          <div style={{ marginTop: '10px' }}>
            <button 
              onClick={() => this.handleLanguageChange('en')}
              style={{
                margin: '0 5px',
                padding: '8px 16px',
                backgroundColor: currentLanguage === 'en' ? '#3498db' : '#95a5a6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {t('setEnglish')}
            </button>
            <button 
              onClick={() => this.handleLanguageChange('zh')}
              style={{
                margin: '0 5px',
                padding: '8px 16px',
                backgroundColor: currentLanguage === 'zh' ? '#3498db' : '#95a5a6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {t('setChinese')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Custom hook to use translation in class component
  useTranslation = () => {
    // This is a simplified version - in a real app, you might want to use
    // a HOC or context to provide the translation function
    return {
      t: (key) => i18next.t(key)
    };
  }
}

export default PocMFi18nEvtRef;