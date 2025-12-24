# Quick Start Guide: Adding i18n to Your Components

## Step 1: Import the hook

```tsx
import { useTranslation } from 'react-i18next';
```

## Step 2: Use the hook in your component

```tsx
export function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('mySection.title')}</h1>
      <p>{t('mySection.description')}</p>
    </div>
  );
}
```

## Step 3: Add translations to JSON files

### English (`src/i18n/locales/en/translation.json`)
```json
{
  "mySection": {
    "title": "My Title",
    "description": "My Description"
  }
}
```

### Arabic (`src/i18n/locales/ar/translation.json`)
```json
{
  "mySection": {
    "title": "عنواني",
    "description": "وصفي"
  }
}
```

## Common Patterns

### With Variables
```tsx
// In component
{t('welcome.message', { name: 'John' })}

// In translation.json
{
  "welcome": {
    "message": "Hello, {{name}}!"
  }
}
```

### With Pluralization
```tsx
// In component
{t('items.count', { count: 5 })}

// In translation.json
{
  "items": {
    "count_one": "{{count}} item",
    "count_other": "{{count}} items"
  }
}
```

### Conditional Text
```tsx
const { t } = useTranslation();
const status = isActive ? t('status.active') : t('status.inactive');
```

## Example: Converting Existing Component

### Before (Hardcoded)
```tsx
export function Hero() {
  return (
    <div>
      <h1>Welcome to MyMechanika</h1>
      <p>Your trusted partner for all mechanical needs</p>
      <button>Get Started</button>
    </div>
  );
}
```

### After (i18n)
```tsx
import { useTranslation } from 'react-i18next';

export function Hero() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
      <button>{t('hero.cta')}</button>
    </div>
  );
}
```

### Translation Files
```json
// en/translation.json
{
  "hero": {
    "title": "Welcome to MyMechanika",
    "subtitle": "Your trusted partner for all mechanical needs",
    "cta": "Get Started"
  }
}

// ar/translation.json
{
  "hero": {
    "title": "مرحبا بك في ماي ميكانيكا",
    "subtitle": "شريكك الموثوق لجميع الاحتياجات الميكانيكية",
    "cta": "ابدأ الآن"
  }
}
```

## Tips

1. **Always add to both language files** - Keep them in sync
2. **Use descriptive keys** - `hero.title` not `text1`
3. **Group by feature** - Keep related translations together
4. **Test in both languages** - Switch languages to verify
5. **Check RTL layout** - Ensure UI looks good in Arabic

## Need Help?

See the full documentation in `src/i18n/README.md`
