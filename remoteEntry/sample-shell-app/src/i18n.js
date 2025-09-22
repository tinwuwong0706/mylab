// shell-app/src/i18n.js
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
      
      console.log(`[Shell] Loaded locale: ${language}/${namespace}`);
    }
  });
  
  return { 
    resources, 
    namespaces: Array.from(allNamespaces) 
  };
};

// Create shell-specific i18n instance
export const shellI18n = i18n.createInstance();

// Load resources dynamically
const { resources, namespaces } = loadResourcesWithContext();

// Fallback to default if no files found
const defaultResources = {
 };

const finalResources = Object.keys(resources).length > 0 ? resources : defaultResources;
const finalNamespaces = namespaces.length > 0 ? namespaces : ['translation', 'navigation', 'dashboard'];

console.log('[Shell] Discovered namespaces:', finalNamespaces);
console.log('[Shell] Discovered languages:', Object.keys(finalResources));

// Initialize i18n
shellI18n
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
      console.warn(`[Shell] Missing translation key: ${key}`);
      return `[${key}]`;
    },
    
    saveMissing: process.env.NODE_ENV === 'development',
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
      console.warn(`[Shell] Missing translation - Language: ${lng}, Namespace: ${ns}, Key: ${key}`);
    }
  });

// Function to get current language
export const getCurrentLanguage = () => shellI18n.language;

// Function to subscribe to language changes
export const onLanguageChanged = (callback) => {
  shellI18n.on('languageChanged', callback);
  return () => shellI18n.off('languageChanged', callback);
};

// Function to change language (with remote module sync support)
export const changeLanguage = (lng) => {
  return shellI18n.changeLanguage(lng);
};

// Function to add resources dynamically
export const addResourceBundle = (language, namespace, resources) => {
  shellI18n.addResourceBundle(language, namespace, resources);
};

// Function to get available languages
export const getAvailableLanguages = () => {
  return Object.keys(finalResources);
};

// Function to get available namespaces for a language
export const getAvailableNamespaces = (language = 'en') => {
  return finalResources[language] ? Object.keys(finalResources[language]) : [];
};

// Utility to check if a translation exists
export const hasTranslation = (key, options = {}) => {
  const { lng = shellI18n.language, ns = 'translation' } = options;
  return shellI18n.exists(key, { lng, ns });
};

// Function to get all registered remote modules for language sync
export const registerRemoteModule = (moduleI18nInstance) => {
  // Sync the remote module with shell's current language
  if (moduleI18nInstance) {
    moduleI18nInstance.changeLanguage(shellI18n.language);
    
    // Listen for shell language changes and sync with remote module
    const handleLanguageChange = (lng) => {
      console.log(`[Shell] Syncing remote module to language: ${lng}`);
      moduleI18nInstance.changeLanguage(lng);
    };
    
    shellI18n.on('languageChanged', handleLanguageChange);
    
    // Return cleanup function
    return () => {
      shellI18n.off('languageChanged', handleLanguageChange);
    };
  }
};

// Function to sync multiple remote modules
export const syncRemoteModules = (moduleInstances = []) => {
  const cleanups = [];
  
  moduleInstances.forEach((moduleI18nInstance, index) => {
    if (moduleI18nInstance) {
      // Set initial language
      moduleI18nInstance.changeLanguage(shellI18n.language);
      
      // Create sync handler
      const handleLanguageChange = (lng) => {
        console.log(`[Shell] Syncing module ${index} to language: ${lng}`);
        moduleI18nInstance.changeLanguage(lng);
      };
      
      shellI18n.on('languageChanged', handleLanguageChange);
      
      // Store cleanup function
      cleanups.push(() => {
        shellI18n.off('languageChanged', handleLanguageChange);
      });
    }
  });
  
  // Return cleanup function for all listeners
  return () => {
    cleanups.forEach(cleanup => cleanup());
  };
};

// Export the resource loading function for potential reuse
export { loadResourcesWithContext };

// Export utility functions
export const i18nUtils = {
  getAvailableLanguages: () => Object.keys(shellI18n.store.data || {}),
  getAvailableNamespaces: (lang = shellI18n.language) => 
    shellI18n.store.data?.[lang] ? Object.keys(shellI18n.store.data[lang]) : [],
  hasResourceBundle: (lang, ns) => shellI18n.hasResourceBundle(lang, ns),
  addResourceBundle: (lang, ns, resources, deep = true, overwrite = true) => 
    shellI18n.addResourceBundle(lang, ns, resources, deep, overwrite)
};

export default shellI18n;