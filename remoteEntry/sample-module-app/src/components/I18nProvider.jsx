import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { i18nInstance } from '../i18n';

const I18nProvider = ({ children, i18n = i18nInstance }) => {
  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
};

export default I18nProvider;