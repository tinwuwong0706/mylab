import React, { useState, useEffect } from 'react';
import i18next from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';

// Initialize i18next
i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          hello: "Hello",
          welcome: "Welcome to Module Federation i18n",
          description: "This component demonstrates internationalization with i18next",
          button: "Change Language",
          currentLanguage: "Current Language: English",
          technicalDetails: "Technical Details",
          language: "Language",
          using: "Using",
          loadedFrom: "Loaded from"
        }
      },
      zh: {
        translation: {
          hello: "你好",
          welcome: "欢迎使用模块联邦国际化",
          description: "这个组件使用i18next展示了国际化功能",
          button: "切换语言",
          currentLanguage: "当前语言: 中文",
          technicalDetails: "技术细节",
          language: "语言",
          using: "使用",
          loadedFrom: "加载自"
        }
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

const PocMFi18n = ({ initialLanguage = 'en', onLanguageChange }) => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(initialLanguage);

  // Initialize language
  useEffect(() => {
    if (i18n.language !== initialLanguage) {
      i18n.changeLanguage(initialLanguage);
    }
    setCurrentLanguage(initialLanguage);
  }, [initialLanguage, i18n]);

  // Notify parent when language changes
  useEffect(() => {
    if (onLanguageChange) {
      onLanguageChange(currentLanguage);
    }
  }, [currentLanguage, onLanguageChange]);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
  };

  return (
    <div style={{ 
      padding: '2rem',
      border: '2px solid #4CAF50',
      borderRadius: '12px',
      backgroundColor: '#f8fff8',
      maxWidth: '500px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <h2>🌐 i18n Module Federation Demo</h2>
      
      <div style={{ 
        margin: '1.5rem 0',
        padding: '1rem',
        backgroundColor: '#e8f5e8',
        borderRadius: '8px'
      }}>
        <h3 style={{ color: '#2e7d32', margin: '0 0 1rem 0' }}>
          {t('hello')}!
        </h3>
        <p style={{ margin: '0.5rem 0', fontSize: '1.1rem' }}>
          {t('welcome')}
        </p>
        <p style={{ margin: '0.5rem 0', color: '#666' }}>
          {t('description')}
        </p>
      </div>

      <div style={{ 
        margin: '1.5rem 0',
        padding: '1rem',
        backgroundColor: '#fff3e0',
        borderRadius: '8px',
        border: '1px solid #ffb74d'
      }}>
        <p style={{ margin: '0 0 1rem 0', fontWeight: 'bold' }}>
          {t('currentLanguage')}
        </p>
        <button
          onClick={toggleLanguage}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ff9800',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          {t('button')}
        </button>
      </div>

      <div style={{ 
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: '#e3f2fd',
        borderRadius: '8px',
        fontSize: '0.9rem'
      }}>
        <p style={{ margin: '0', color: '#1976d2' }}>
          <strong>🔧 {t('technicalDetails')}:</strong>
        </p>
        <p style={{ margin: '0.5rem 0' }}>
          {t('language')}: <code>{currentLanguage}</code>
        </p>
        <p style={{ margin: '0.5rem 0' }}>
          {t('using')}: <code>i18next</code>
        </p>
        <p style={{ margin: '0' }}>
          {t('loadedFrom')}: <code>sample_module_app/pocs/PocMFi18n</code>
        </p>
      </div>
    </div>
  );
};

export default PocMFi18n;