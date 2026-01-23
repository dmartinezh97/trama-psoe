export const translations = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre nosotros',
      resources: 'Recursos',
    },
    home: {
      title: 'Bienvenido',
      description: 'Un proyecto Astro con Vue, Tailwind CSS 4 e i18n.',
    },
    counter: {
      label: 'Contador',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      resources: 'Resources',
    },
    home: {
      title: 'Welcome',
      description: 'An Astro project with Vue, Tailwind CSS 4 and i18n.',
    },
    counter: {
      label: 'Counter',
    },
  },
} as const;

export type Locale = keyof typeof translations;
