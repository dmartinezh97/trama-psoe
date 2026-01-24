import { translations, type Locale } from './translations';

export function useTranslations(locale: Locale) {
  return translations[locale];
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, locale] = url.pathname.split('/');
  if (locale === 'en') return 'en';
  return 'es';
}

// Mapeo de rutas ES <-> EN
const routeMap: Record<string, Record<string, string>> = {
  es: {
    'cases': 'casos',
    'timeline': 'cronologia',
    'defendants': 'imputados',
    'documents': 'documentos',
  },
  en: {
    'casos': 'cases',
    'cronologia': 'timeline',
    'imputados': 'defendants',
    'documentos': 'documents',
  },
};

export function getLocalizedPath(path: string, targetLocale: Locale): string {
  const pathWithoutLocale = path.replace(/^\/(es|en)/, '');

  // Traducir cada segmento de la ruta
  const segments = pathWithoutLocale.split('/').filter(Boolean);
  const translatedSegments = segments.map(segment => {
    return routeMap[targetLocale]?.[segment] || segment;
  });

  const translatedPath = translatedSegments.length > 0
    ? '/' + translatedSegments.join('/')
    : '/';

  return `/${targetLocale}${translatedPath}`;
}
