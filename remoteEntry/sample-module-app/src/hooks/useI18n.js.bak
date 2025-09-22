import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

export const useI18n = (namespace = 'translation') => {
  try {
    const { t, i18n, ready } = useTranslation(namespace);
    if (i18n) return { t, i18n, ready, changeLanguage: i18n.changeLanguage.bind(i18n), currentLanguage: i18n.language, isLanguageLoaded: (lng) => i18n.hasResourceBundle(lng, namespace) };
  } catch (error) {}
  
  // Fallback to global instance
  return {
    t: (key) => i18next.t(key, { ns: namespace }),
    i18n: i18next,
    ready: true,
    changeLanguage: i18next.changeLanguage.bind(i18next),
    currentLanguage: i18next.language,
    isLanguageLoaded: (lng) => i18next.hasResourceBundle(lng, namespace)
  };
};