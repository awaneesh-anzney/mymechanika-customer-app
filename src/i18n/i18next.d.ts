// Type definitions for i18next
import 'react-i18next';
import type common from './locales/en/common.json';
import type navbar from './locales/en/navbar.json';
import type home from './locales/en/home.json';
import type auth from './locales/en/auth.json';
import type services from './locales/en/services.json';
import type about from './locales/en/about.json';

declare module 'react-i18next' {
    interface CustomTypeOptions {
        defaultNS: 'common';
        resources: {
            common: typeof common;
            navbar: typeof navbar;
            home: typeof home;
            auth: typeof auth;
            services: typeof services;
            about: typeof about;
        };
    }
}
