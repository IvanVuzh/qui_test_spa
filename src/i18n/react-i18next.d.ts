import 'react-i18next';
import en from './en.json'; 

//https://github.com/i18next/react-i18next/issues/1601#issuecomment-1426633981

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: typeof en;
  }
}

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}