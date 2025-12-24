"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '@/i18n/config';

type Language = 'en' | 'ar';

interface LanguageContextType {
    language: Language;
    changeLanguage: (lang: Language) => void;
    dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState<Language>('en');
    const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');

    useEffect(() => {
        // Load language from localStorage on mount
        const savedLanguage = localStorage.getItem('language') as Language;
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
            setLanguage(savedLanguage);
            i18n.changeLanguage(savedLanguage);
            setDir(savedLanguage === 'ar' ? 'rtl' : 'ltr');
            document.documentElement.lang = savedLanguage;
        }
    }, [i18n]);

    const changeLanguage = (lang: Language) => {
        setLanguage(lang);
        i18n.changeLanguage(lang);
        const direction = lang === 'ar' ? 'rtl' : 'ltr';
        setDir(direction);
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, dir }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
