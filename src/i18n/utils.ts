import { translations, type Locale } from './translations';

export function useTranslations(locale: Locale) {
  return translations[locale];
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, locale] = url.pathname.split('/');
  if (locale === 'en') return 'en';
  return 'es';
}

export function getLocalizedPath(path: string, locale: Locale): string {
  // Si el path ya tiene locale, reemplazarlo
  const pathWithoutLocale = path.replace(/^\/(es|en)/, '');
  return `/${locale}${pathWithoutLocale || '/'}`;
}
