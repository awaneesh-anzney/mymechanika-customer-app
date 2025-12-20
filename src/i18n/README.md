# Internationalization (i18n) Setup

This document explains the internationalization setup for the MyMechanika Customer Portal.

## Overview

The application supports two languages:
- **English (en)** - Left-to-Right (LTR)
- **Arabic (ar)** - Right-to-Left (RTL)

## Folder Structure

```
src/
├── i18n/
│   ├── config.ts                    # i18n configuration
│   ├── i18next.d.ts                 # Type definitions for namespaces
│   └── locales/
│       ├── en/
│       │   ├── common.json          # Generic UI strings
│       │   ├── navbar.json          # Navigation translations
│       │   ├── home.json            # Home page sections
│       │   └── auth.json            # Auth related strings
│       └── ar/
│           ├── common.json
│           ├── navbar.json
│           ├── home.json
│           └── auth.json
├── components/
│   ├── language-provider.tsx        # Language context provider
│   └── LanguageSwitcher.tsx         # Language switcher component
```

## How It Works

### 1. Configuration (`i18n/config.ts`)
- Initializes i18next with react-i18next
- Imports separate JSON files for each namespace (`common`, `navbar`, `home`, `auth`)
- Sets English as the default language
- Configures `common` as the default namespace

### 2. Language Provider (`components/language-provider.tsx`)
- Provides language context throughout the app
- Manages language state and direction (RTL/LTR)
- Persists language preference in localStorage
- Automatically updates `document.documentElement.lang` and applies RTL direction to text elements via CSS

### 3. Translation Files (`i18n/locales/*/*.json`)
- Split into multiple files for better organization and performance
- Each file acts as a separate namespace
- Structured JSON format for easy maintenance

### 4. Language Switcher (`components/LanguageSwitcher.tsx`)
- Displays a language icon button
- Shows a popover with language options
- Highlights the currently selected language

## Usage

### Using Translations in Components

When using translations, you can specify the namespace(s) your component needs:

```tsx
import { useTranslation } from 'react-i18next';

function MyHomeComponent() {
  // Using multiple namespaces
  const { t } = useTranslation(['navbar', 'home']);
  
  return (
    <div>
      {/* Accessing navbar namespace */}
      <h1>{t('navbar:home')}</h1> 
      
      {/* Accessing home namespace */}
      <p>{t('home:hero.description')}</p>
    </div>
  );
}

function MySimpleComponent() {
  // Using a single namespace (keys don't need prefixes)
  const { t } = useTranslation('navbar');
  
  return (
    <button>{t('login')}</button>
  );
}
```

### Changing Language Programmatically

```tsx
import { useLanguage } from '@/components/language-provider';

function MyComponent() {
  const { language, changeLanguage, dir } = useLanguage();
  
  const switchToArabic = () => {
    changeLanguage('ar');
  };
  
  return (
    <div>
      <p>Current language: {language}</p>
      <p>Current direction: {dir}</p>
      <button onClick={switchToArabic}>Switch to Arabic</button>
    </div>
  );
}
```

## Adding New Translations

1. Identify the relevant category for your translation (e.g., `common`, `home`, `auth`).
2. Open the corresponding JSON file in both languages:
   - `src/i18n/locales/en/[category].json`
   - `src/i18n/locales/ar/[category].json`

3. Add your new key-value pairs:

**English (`home.json`):**
```json
{
  "myFeature": {
    "title": "My Feature Title"
  }
}
```

**Arabic (`home.json`):**
```json
{
  "myFeature": {
    "title": "عنوان ميزتي"
  }
}
```

3. Use in your component with the namespace:
```tsx
const { t } = useTranslation('home');
// ...
{t('myFeature.title')}
```

## RTL Support

The application handles RTL layout by setting `lang="ar"` on the `html` tag. Global CSS applies `direction: rtl` and `text-align: right` to text-carrying elements (body, p, headings, etc.) while preserving the overall grid/flex layout order.

## Language Persistence

The selected language is automatically saved to `localStorage` with the key `"language"`. When the user returns to the app, their language preference is restored.

## Translation Categories (Namespaces)

Current namespaces:

```
common.json   - Generic UI elements (loading, buttons, alerts)
navbar.json   - Header and Navigation menu items
home.json     - Landing page sections (hero, stats, features, footer)
auth.json     - Login, Signup, and Password recovery strings
```

## Best Practices

1. **Keep keys organized** - Group related translations together
2. **Use descriptive keys** - Make keys self-explanatory
3. **Maintain consistency** - Use the same structure in all language files
4. **Test both languages** - Always test your changes in both English and Arabic
5. **Avoid hardcoded strings** - Always use translation keys for user-facing text
6. **Consider context** - Some words may need different translations in different contexts

## Troubleshooting

### Translations not showing
- Ensure you've imported the i18n config in your component or provider
- Check that the translation key exists in both language files
- Verify the key path is correct (e.g., `navbar.home` not `home`)

### RTL not working
- Check that `LanguageProvider` is wrapping your app in `layout.tsx`
- Verify `document.documentElement.dir` is being set correctly
- Some CSS properties may need explicit RTL handling

### Language not persisting
- Check browser's localStorage is enabled
- Verify the `LanguageProvider` is mounted correctly
- Check browser console for any errors
