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
│   └── locales/
│       ├── en/
│       │   └── translation.json     # English translations
│       └── ar/
│           └── translation.json     # Arabic translations
├── components/
│   ├── language-provider.tsx        # Language context provider
│   └── LanguageSwitcher.tsx         # Language switcher component
```

## How It Works

### 1. Configuration (`i18n/config.ts`)
- Initializes i18next with react-i18next
- Imports translation files for both languages
- Sets English as the default language
- Configures fallback language

### 2. Language Provider (`components/language-provider.tsx`)
- Provides language context throughout the app
- Manages language state and direction (RTL/LTR)
- Persists language preference in localStorage
- Automatically updates `document.documentElement.dir` and `document.documentElement.lang`

### 3. Translation Files (`i18n/locales/*/translation.json`)
- Organized by feature/component
- Structured JSON format for easy maintenance
- Contains all translatable strings

### 4. Language Switcher (`components/LanguageSwitcher.tsx`)
- Displays a language icon button
- Shows a popover with language options
- Highlights the currently selected language

## Usage

### Using Translations in Components

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('navbar.home')}</h1>
      <p>{t('hero.description')}</p>
    </div>
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

1. Open both translation files:
   - `src/i18n/locales/en/translation.json`
   - `src/i18n/locales/ar/translation.json`

2. Add your new key-value pairs in the same structure:

**English:**
```json
{
  "myFeature": {
    "title": "My Feature Title",
    "description": "My feature description"
  }
}
```

**Arabic:**
```json
{
  "myFeature": {
    "title": "عنوان ميزتي",
    "description": "وصف ميزتي"
  }
}
```

3. Use in your component:
```tsx
{t('myFeature.title')}
{t('myFeature.description')}
```

## RTL Support

The application automatically handles RTL layout when Arabic is selected:

- `document.documentElement.dir` is set to `"rtl"`
- CSS automatically flips layout using `dir` attribute
- No manual CSS changes needed for most components
- Tailwind CSS respects the `dir` attribute automatically

### Custom RTL Styles (if needed)

If you need custom RTL styles, use the `dir` attribute selector:

```css
/* LTR specific */
[dir="ltr"] .my-element {
  margin-left: 1rem;
}

/* RTL specific */
[dir="rtl"] .my-element {
  margin-right: 1rem;
}
```

Or use Tailwind's RTL modifiers:

```tsx
<div className="ml-4 rtl:mr-4 rtl:ml-0">
  Content
</div>
```

## Language Persistence

The selected language is automatically saved to `localStorage` with the key `"language"`. When the user returns to the app, their language preference is restored.

## Translation Keys Structure

Current translation structure:

```
navbar.*          - Navigation bar items
hero.*            - Hero section content
services.*        - Services page content
about.*           - About page content
contact.*         - Contact page content
footer.*          - Footer content
common.*          - Common UI elements (buttons, messages, etc.)
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
