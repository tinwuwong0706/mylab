import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Default translations as fallback
const defaultTranslations = {
  en: {
    hello: "Hello",
    welcome: "Welcome to Module Federation i18n",
    description: "This component demonstrates internationalization with i18next",
    button: "Change Language",
    currentLanguage: "Current Language: English",
    technicalDetails: "Technical Details",
    language: "Language",
    using: "Using",
    loadedFrom: "Loaded from"
  },
  zh: {
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
};

const initializeI18n = (options = {}) => {
  const {
    namespace = 'translation',
    fallbackLng = 'en',
    debug = false,
    useHttpBackend = true,
    backendOptions = {},
    detectionOptions = {}
  } = options;

  const i18nConfig = {
    fallbackLng,
    debug,
    interpolation: {
      escapeValue: false,
    },
    defaultNS: namespace,
    ns: [namespace],
    resources: defaultTranslations,
    react: {
      useSuspense: false,
    }
  };

  const plugins = [initReactI18next];

  if (useHttpBackend) {
    plugins.push(HttpBackend);
    i18nConfig.backend = {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      ...backendOptions
    };
  }

  plugins.push(LanguageDetector);
  i18nConfig.detection = {
    order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
    caches: ['localStorage', 'cookie'],
    ...detectionOptions
  };

  return i18next
    .use(plugins)
    .init(i18nConfig);
};

// Export initialized instance
export const i18nInstance = i18next;

// Export initialization function
export { initializeI18n };

// Export translation hooks and utilities
export { useTranslation, Trans, Translation } from 'react-i18next';

// Utility function to change language
export const changeLanguage = (lng) => i18next.changeLanguage(lng);

// Utility function to get current language
export const getCurrentLanguage = () => i18next.language;

// Utility function to add resources
export const addResources = (lng, namespace, resources) => {
  i18next.addResourceBundle(lng, namespace, resources, true, true);
};

export default i18next;