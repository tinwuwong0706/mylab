// module-app/src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Auto-discover all locale files using Webpack's require.context
const loadResourcesWithContext = () => {
  const resources = {};
  const allNamespaces = new Set();
  
  // Get all JSON files in locales directory
  const requireContext = require.context(
    './locales', // relative path to locales (from current directory)
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
      allNamespaces.add(namespace);
      
      console.log(`Loaded locale: ${language}/${namespace}`);
    }
  });
  
  return { 
    resources, 
    namespaces: Array.from(allNamespaces) 
  };
};

// Create module-specific i18n instance
export const moduleI18n = i18n.createInstance();

// Load resources dynamically
const { resources, namespaces } = loadResourcesWithContext();

// Fallback to default if no files found
const defaultResources = {
  en: {
    translation: {
      hello: 'Hello',
      welcome: 'Welcome',
      description: 'Description'
    }
  },
  zh: {
    translation: {
      hello: '你好',
      welcome: '欢迎',
      description: '描述'
    }
  }
};

const finalResources = Object.keys(resources).length > 0 ? resources : defaultResources;
const finalNamespaces = namespaces.length > 0 ? namespaces : ['translation'];

console.log('Discovered namespaces:', finalNamespaces);
console.log('Discovered languages:', Object.keys(finalResources));

moduleI18n
  .use(initReactI18next)
  .init({
    resources: finalResources,
    lng: 'en',
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    ns: finalNamespaces,
    defaultNS: 'translation',
    
    interpolation: {
      escapeValue: false,
    },
    
    // Better error handling
    parseMissingKeyHandler: (key) => {
      console.warn(`Missing translation key: ${key}`);
      return `[${key}]`;
    },
    
    // Optional: Configure how missing keys are handled
    saveMissing: process.env.NODE_ENV === 'development',
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
      console.warn(`Missing translation - Language: ${lng}, Namespace: ${ns}, Key: ${key}`);
    }
  });

// Function to sync language with shell app
export const syncLanguageWithShell = (shellI18nInstance) => {
  if (shellI18nInstance) {
    // Set initial language to match shell
    moduleI18n.changeLanguage(shellI18nInstance.language);
    
    // Sync language changes
    const handleLanguageChange = (lng) => {
      console.log(`Syncing module language to: ${lng}`);
      moduleI18n.changeLanguage(lng);
    };
    
    shellI18nInstance.on('languageChanged', handleLanguageChange);
    
    // Return cleanup function
    return () => {
      shellI18nInstance.off('languageChanged', handleLanguageChange);
    };
  }
};

// Function to add resources dynamically (useful for adding new namespaces/languages at runtime)
export const addResourceBundle = (language, namespace, resources) => {
  moduleI18n.addResourceBundle(language, namespace, resources);
};

// Function to get available languages
export const getAvailableLanguages = () => {
  return Object.keys(finalResources);
};

// Function to get available namespaces for a language
export const getAvailableNamespaces = (language = 'en') => {
  return finalResources[language] ? Object.keys(finalResources[language]) : [];
};

export const getI18nNamespace = (appName, ns = 'translation') => {
  return ns;
};

// Utility to check if a translation exists
export const hasTranslation = (key, options = {}) => {
  const { lng = moduleI18n.language, ns = 'translation' } = options;
  return moduleI18n.exists(key, { lng, ns });
};

// Export the resource loading function for potential reuse
export { loadResourcesWithContext };