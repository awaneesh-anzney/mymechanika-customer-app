import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English
import enCommon from './locales/en/common.json';
import enNavbar from './locales/en/navbar.json';
import enHome from './locales/en/home.json';
import enAuth from './locales/en/auth.json';

// Arabic
import arCommon from './locales/ar/common.json';
import arNavbar from './locales/ar/navbar.json';
import arHome from './locales/ar/home.json';
import arAuth from './locales/ar/auth.json';

const resources = {
  en: {
    common: enCommon,
    navbar: enNavbar,
    home: enHome,
    auth: enAuth,
  },
  ar: {
    common: arCommon,
    navbar: arNavbar,
    home: arHome,
    auth: arAuth,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    ns: ['common', 'navbar', 'home', 'auth'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
