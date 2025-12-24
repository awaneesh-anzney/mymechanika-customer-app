# MyMechanika i18n Folder Structure

```
mymechanika-customer-app/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                    ✅ Modified - Added LanguageProvider
│   │   └── globals.css                   ✅ Modified - Added RTL styles
│   │
│   ├── components/
│   │   ├── Navbar.tsx                    ✅ Modified - Added translations & switcher
│   │   ├── language-provider.tsx         ✨ NEW - Language context provider
│   │   └── LanguageSwitcher.tsx          ✨ NEW - Language switcher component
│   │
│   └── i18n/
│       ├── config.ts                     ✨ NEW - i18next configuration
│       ├── i18next.d.ts                  ✨ NEW - TypeScript definitions
│       ├── README.md                     ✨ NEW - Full documentation
│       ├── QUICK_START.md                ✨ NEW - Quick reference
│       └── locales/
│           ├── en/
│           │   └── translation.json      ✨ NEW - English translations
│           └── ar/
│               └── translation.json      ✨ NEW - Arabic translations
│
└── IMPLEMENTATION_SUMMARY.md             ✨ NEW - Implementation summary

Legend:
✅ Modified - Existing file that was updated
✨ NEW - Newly created file
```

## File Purposes

### Configuration Files
- **`i18n/config.ts`** - Initializes i18next with both languages
- **`i18n/i18next.d.ts`** - TypeScript type definitions for autocomplete

### Translation Files
- **`i18n/locales/en/translation.json`** - All English text
- **`i18n/locales/ar/translation.json`** - All Arabic text

### Provider & Components
- **`components/language-provider.tsx`** - Manages language state & RTL/LTR
- **`components/LanguageSwitcher.tsx`** - UI component for language selection

### Documentation
- **`i18n/README.md`** - Complete guide with examples
- **`i18n/QUICK_START.md`** - Quick reference for developers
- **`IMPLEMENTATION_SUMMARY.md`** - Overview of implementation

### Modified Files
- **`app/layout.tsx`** - Wrapped app with LanguageProvider
- **`app/globals.css`** - Added RTL support styles
- **`components/Navbar.tsx`** - Integrated translations

## Translation Structure

```json
{
  "navbar": {
    "home": "...",
    "services": "...",
    "about": "...",
    "contact": "...",
    "login": "...",
    "getStarted": "...",
    "toggleTheme": "..."
  },
  "hero": { ... },
  "services": { ... },
  "about": { ... },
  "contact": { ... },
  "footer": { ... },
  "common": { ... }
}
```

## Integration Points

```
┌─────────────────────────────────────────┐
│          app/layout.tsx                 │
│  ┌───────────────────────────────────┐  │
│  │     LanguageProvider              │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │    All Components           │  │  │
│  │  │  - Can use useTranslation() │  │  │
│  │  │  - Can use useLanguage()    │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│          Navbar Component               │
│  ┌───────────────────────────────────┐  │
│  │  LanguageSwitcher (🌐)            │  │
│  │  - English                        │  │
│  │  - العربية                        │  │
│  └───────────────────────────────────┘  │
│                                         │
│  Navigation Links (translated)          │
│  Buttons (translated)                   │
└─────────────────────────────────────────┘
```

## Data Flow

```
User clicks language switcher
        ↓
LanguageProvider.changeLanguage()
        ↓
    ┌───────────────────────────┐
    │ 1. Update i18n language   │
    │ 2. Set document.dir       │
    │ 3. Set document.lang      │
    │ 4. Save to localStorage   │
    └───────────────────────────┘
        ↓
All components re-render with new translations
        ↓
UI updates with new language & direction
```

## How to Extend

1. **Add new translation keys** to both JSON files
2. **Use in components** with `t('key.path')`
3. **Test in both languages** to verify
4. **Check RTL layout** for Arabic

See `QUICK_START.md` for detailed examples!
