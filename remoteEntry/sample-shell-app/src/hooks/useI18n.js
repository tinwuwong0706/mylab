import { useTranslation } from 'react-i18next';

export const useI18n = (namespace = 'translation') => {
  const { t, i18n, ready } = useTranslation(namespace);
  
  return {
    t,
    i18n,
    ready,
    changeLanguage: i18n.changeLanguage.bind(i18n),
    currentLanguage: i18n.language,
    isLanguageLoaded: (lng) => i18n.hasResourceBundle(lng, namespace)
  };
};

export default useI18n;