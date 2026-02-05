# Trama PSOE

Sitio web de documentación periodística que centraliza información sobre los casos judiciales conocidos como "Trama PSOE": Caso Koldo, Begoña Gómez, Hidrocarburos y David Sánchez.

**Producción:** https://trama-psoe.com

## Stack Tecnológico

- **Framework:** Astro 5.16+
- **Componentes:** Vue 3
- **Estilos:** Tailwind CSS 4+ (Vite plugin)
- **Lenguaje:** TypeScript
- **Animaciones:** GSAP
- **Iconos:** Lucide, Material Symbols
- **Analytics:** Vercel Analytics
- **i18n:** Español/Inglés

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/dmartinezh97/trama-psoe.git
cd trama-psoe

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## Comandos

| Comando           | Descripción                              |
|-------------------|------------------------------------------|
| `npm install`     | Instalar dependencias                    |
| `npm run dev`     | Servidor de desarrollo (localhost:4321)  |
| `npm run build`   | Build de producción (./dist/)            |
| `npm run preview` | Preview del build                        |

## Estructura del Proyecto

```
src/
├── components/        # Componentes Vue y Astro
├── content/           # Content Collections
├── i18n/              # Internacionalización
│   ├── translations.ts    # Traducciones ES/EN
│   └── utils.ts           # Helpers i18n
├── img/               # Imágenes (logos, portraits)
├── layouts/           # Layouts base
├── pages/
│   ├── es/            # Páginas en español
│   ├── en/            # Páginas en inglés
│   ├── index.astro    # Redirect a /es
│   └── og-image.png.ts    # Generación OG images
├── scripts/           # Scripts auxiliares
└── styles/            # Estilos globales

fuentes/
├── 360_fuentes_trama_psoe.json  # Base de datos de fuentes
└── trama-psoe-completa.txt      # Documentación completa
```

## Internacionalización

El sitio soporta español e inglés con rutas separadas:

- `/es/` - Versión en español
- `/en/` - Versión en inglés

Las traducciones están centralizadas en `src/i18n/translations.ts` con estructura tipada.

## Base de Datos de Fuentes

El archivo `fuentes/360_fuentes_trama_psoe.json` contiene más de 360 fuentes periodísticas y judiciales verificables utilizadas para documentar los casos.

## Páginas

- **Inicio** - Overview con estadísticas y casos
- **Casos** - Detalle de los 4 casos principales
- **Cronología** - Timeline 2024-2026
- **Imputados** - Perfiles de +30 acusados
- **Documentos** - Informes UCO, autos judiciales, IGAE, testimonios

## Licencia

Código privado. Contenido basado en fuentes públicas.
