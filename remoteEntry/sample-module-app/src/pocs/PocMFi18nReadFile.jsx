import React from 'react';
import { useI18n } from '../hooks/useI18n';

const PocMFi18nReadFile = ({ initialLanguage = 'en', onLanguageChange }) => {
  const { t, currentLanguage, changeLanguage, ready, i18n } = useI18n('translation');

  // Listen for language change events from other micro-frontends
  React.useEffect(() => {
    const handleLanguageChange = (event) => {
      const newLanguage = event.detail.language;
      changeLanguage(newLanguage);
      if (onLanguageChange) {
        onLanguageChange(newLanguage);
      }
    };

    window.addEventListener('language-change', handleLanguageChange);
    
    return () => {
      window.removeEventListener('language-change', handleLanguageChange);
    };
  }, [changeLanguage, onLanguageChange]);

  // Initialize language on component mount
  // React.useEffect(() => {
  //   if (currentLanguage !== initialLanguage) {
  //     changeLanguage(initialLanguage);
  //   }
  // }, [initialLanguage, changeLanguage, currentLanguage]);

  // Notify parent when language changes
  React.useEffect(() => {
    if (onLanguageChange && ready) {
      onLanguageChange(currentLanguage);
    }
  }, [currentLanguage, onLanguageChange, ready]);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'zh' : 'en';
    console.log('Changing language to:', newLanguage);
    
    // Change the language
    changeLanguage(newLanguage)
      .then(() => {
        console.log('Language changed successfully to:', newLanguage);
        
        // Dispatch event for other micro-frontends
        window.dispatchEvent(new CustomEvent('language-change', {
          detail: { language: newLanguage }
        }));
        
        if (onLanguageChange) {
          onLanguageChange(newLanguage);
        }
      })
      .catch((error) => {
        console.error('Failed to change language:', error);
      });
  };

  // Debug current language
  React.useEffect(() => {
    console.log('Current language:', currentLanguage);
    console.log('i18n language:', i18n.language);
  }, [currentLanguage, i18n.language]);

  // Show loading state while translations are being loaded
  if (!ready) {
    return (
      <div style={{ 
        padding: '2rem',
        border: '2px solid #ccc',
        borderRadius: '12px',
        backgroundColor: '#f8f8f8',
        maxWidth: '500px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <p>Loading translations...</p>
      </div>
    );
  }

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
          {t('currentLanguage')}: {currentLanguage}
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
          {t('loadedFrom')}: <code>sample_module_app/pocs/PocMFi18nReadFile</code>
        </p>
      </div>
    </div>
  );
};

export default PocMFi18nReadFile;