import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { moduleI18n, syncLanguageWithShell, getI18nNamespace } from '../i18n';

const PocMFi18nReadFile = ({ shellI18nInstance }) => {
  const { t, i18n } = useTranslation(getI18nNamespace('sample-module-app', 'translation'));

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'zh' : 'en';
    
    // Use the i18n instance from useTranslation hook
    i18n.changeLanguage(newLanguage);
  };

  useEffect(() => {
    if (shellI18nInstance) {
      syncLanguageWithShell(shellI18nInstance);
    }
  }, [shellI18nInstance]);

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
          {t('language')}: <code>{t('currentLanguage')}</code>
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

export default PocMFi18nReadFile;