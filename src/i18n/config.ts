import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English
import enCommon from './locales/en/common.json';
import enNavbar from './locales/en/navbar.json';
import enHome from './locales/en/home.json';
import enAuth from './locales/en/auth.json';
import enServices from './locales/en/services.json';
import enAbout from './locales/en/about.json';
import enContact from './locales/en/contact.json';

// Arabic
import arCommon from './locales/ar/common.json';
import arNavbar from './locales/ar/navbar.json';
import arHome from './locales/ar/home.json';
import arAuth from './locales/ar/auth.json';
import arServices from './locales/ar/services.json';
import arAbout from './locales/ar/about.json';
import arContact from './locales/ar/contact.json';

const resources = {
  en: {
    common: enCommon,
    navbar: enNavbar,
    home: enHome,
    auth: enAuth,
    services: enServices,
    about: enAbout,
    contact: enContact,
  },
  ar: {
    common: arCommon,
    navbar: arNavbar,
    home: arHome,
    auth: arAuth,
    services: arServices,
    about: arAbout,
    contact: arContact,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    ns: ['common', 'navbar', 'home', 'auth', 'services', 'about', 'contact'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
