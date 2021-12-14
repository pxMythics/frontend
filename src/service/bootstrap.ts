import { en } from 'i18n/en';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const bootstrap = (): void => {
  i18n.use(initReactI18next).init({
    resources: {
      en,
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
};
