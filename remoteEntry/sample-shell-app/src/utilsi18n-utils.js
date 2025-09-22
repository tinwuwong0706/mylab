// module-app/src/utils/i18n-utils.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Auto-discover all locale files using Webpack's require.context
const loadResourcesWithContext = () => {
  const resources = {};
  
  // Get all JSON files in locales directory
  const requireContext = require.context(
    './locales', // relative path to locales
    true,         // include subdirectories
    /\.json$/     // match JSON files
  );
  
  requireContext.keys().forEach((key) => {
    // Extract language and namespace from path like './en/translation.json'
    const match = key.match(/\.\/([^/]+)\/([^/]+)\.json$/);
    if (match) {
      const [, language, namespace] = match;
      
      if (!resources[language]) {
        resources[language] = {};
      }
      
      resources[language][namespace] = requireContext(key);
    }
  });
  
  return resources;
};

export const createI18nInstance = (appName, basePath = '') => {
  const instance = i18n.createInstance();
  
  const resources = loadResourcesWithContext();
  const namespaces = Object.keys(resources.en || resources.zh || {});
  
  instance
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en',
      fallbackLng: 'en',
      debug: process.env.NODE_ENV === 'development',
      ns: namespaces.length > 0 ? namespaces : ['translation'],
      defaultNS: 'translation',
      
      interpolation: {
        escapeValue: false,
      },
    });

  return instance;
};

export const getI18nNamespace = (appName, ns = 'translation') => ns;