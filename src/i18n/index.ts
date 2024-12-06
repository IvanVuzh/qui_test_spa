import i18n from 'i18next';

import en from './en.json';

const resources = {
  en: {
    translation: en,
  },
};

const allowedLanguages = ['en'];

const defaultLng = allowedLanguages[0];
let lng = defaultLng;

i18n
  .init({
    debug: true,
    defaultNS: 'translation',
    resources,
    lng,
    fallbackLng: defaultLng, 
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;