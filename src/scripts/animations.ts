import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin
gsap.registerPlugin(ScrollTrigger);

// Check for reduced motion preference
const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Cleanup function for SPA navigation
export function cleanupAnimations(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  gsap.killTweensOf('*');
}

// Initialize all scroll animations
export function initScrollAnimations(): void {
  // Skip animations if user prefers reduced motion
  if (prefersReducedMotion()) {
    // Make all animated elements visible without animation
    gsap.set('[data-animate]', { opacity: 1, clearProps: 'all' });
    return;
  }

  // Initialize each section's animations
  initHeroAnimations();
  initStatsAnimations();
  initBentoAnimations();
  initTimelineAnimations();
  initProtagonistsAnimations();
  initFooterAnimations();
}

// Hero Section Animations
function initHeroAnimations(): void {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;

  // Background "26" parallax
  const bgYear = hero.querySelector('[data-hero-bg]');
  if (bgYear) {
    gsap.to(bgYear, {
      y: -100,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // Header fade down (now global, not inside hero)
  const header = document.querySelector('header');
  if (header) {
    gsap.from(header, {
      y: -30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      force3D: true,
    });
  }

  // Title lines slide from left with stagger
  const titleLines = hero.querySelectorAll('[data-hero-title]');
  if (titleLines.length) {
    gsap.from(titleLines, {
      x: -100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      force3D: true,
    });
  }

  // Stats fade up with stagger
  const stats = hero.querySelectorAll('[data-hero-stat]');
  if (stats.length) {
    gsap.from(stats, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      delay: 0.3,
      ease: 'power2.out',
      force3D: true,
    });
  }

  // CTA button scale up
  const cta = hero.querySelector('[data-hero-cta]');
  if (cta) {
    gsap.from(cta, {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      delay: 0.6,
      ease: 'back.out(1.7)',
      force3D: true,
    });
  }

  // Decorative line width animation
  const line = hero.querySelector('[data-hero-line]');
  if (line) {
    gsap.from(line, {
      width: 0,
      duration: 0.8,
      delay: 0.5,
      ease: 'power2.out',
    });
  }
}

// Stats Section Animations
function initStatsAnimations(): void {
  const stats = document.querySelector('[data-stats]');
  if (!stats) return;

  // Animate numbers with CountUp effect
  const numbers = stats.querySelectorAll('[data-stat-number]');
  numbers.forEach((numEl) => {
    const element = numEl as HTMLElement;
    const text = element.textContent || '0';
    // Extract numeric value (handle formats like "780+" or "4.000M")
    const numericMatch = text.match(/[\d.,]+/);
    if (!numericMatch) return;

    const numericStr = numericMatch[0].replace(/\./g, '').replace(',', '.');
    const endValue = parseFloat(numericStr);
    const prefix = text.match(/^[^\d]*/)?.[0] || '';
    const suffix = text.match(/[^\d.,]*$/)?.[0] || '';
    const hasDecimal = text.includes(',');
    const useThousandSeparator = text.includes('.');

    gsap.from(element, {
      textContent: 0,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        once: true,
      },
      snap: { textContent: 1 },
      onUpdate: function () {
        const current = parseFloat(element.textContent || '0');
        let formatted: string;

        if (useThousandSeparator) {
          formatted = Math.floor(current).toLocaleString('es-ES');
        } else if (hasDecimal) {
          formatted = current.toFixed(1).replace('.', ',');
        } else {
          formatted = Math.floor(current).toString();
        }

        element.textContent = prefix + formatted + suffix;
      },
    });
  });

  // Labels fade up with stagger
  const labels = stats.querySelectorAll('[data-stat-label]');
  if (labels.length) {
    gsap.from(labels, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: stats,
        start: 'top 80%',
        once: true,
      },
    });
  }
}

// Bento Cases Section Animations
function initBentoAnimations(): void {
  const bento = document.querySelector('[data-bento]');
  if (!bento) return;

  const cards = bento.querySelectorAll('[data-bento-card]');
  if (cards.length) {
    gsap.from(cards, {
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'back.out(1.4)',
      force3D: true,
      scrollTrigger: {
        trigger: bento,
        start: 'top 75%',
        once: true,
      },
    });
  }
}

// Timeline Section Animations
function initTimelineAnimations(): void {
  const timeline = document.querySelector('[data-timeline]');
  if (!timeline) return;

  // Background text parallax horizontal
  const bgText = timeline.querySelector('[data-timeline-bg]');
  if (bgText) {
    gsap.to(bgText, {
      x: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: timeline,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // Events slide from right with stagger
  const events = timeline.querySelectorAll('[data-timeline-event]');
  if (events.length) {
    gsap.from(events, {
      x: 100,
      opacity: 0,
      duration: 0.7,
      stagger: 0.2,
      ease: 'power3.out',
      force3D: true,
      scrollTrigger: {
        trigger: timeline,
        start: 'top 70%',
        once: true,
      },
    });
  }
}

// Protagonists Section Animations
function initProtagonistsAnimations(): void {
  const protagonists = document.querySelector('[data-protagonists]');
  if (!protagonists) return;

  const cards = protagonists.querySelectorAll('[data-person-card]');
  if (cards.length) {
    gsap.from(cards, {
      scale: 0.9,
      opacity: 0,
      duration: 0.5,
      stagger: 0.12,
      ease: 'back.out(1.2)',
      force3D: true,
      scrollTrigger: {
        trigger: protagonists,
        start: 'top 75%',
        once: true,
      },
    });
  }
}

// Footer Section Animations
function initFooterAnimations(): void {
  const footer = document.querySelector('[data-footer]');
  if (!footer) return;

  const content = footer.querySelectorAll('[data-footer-content]');
  if (content.length) {
    gsap.from(content, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footer,
        start: 'top 85%',
        once: true,
      },
    });
  }
}

// Cases Page Animations
export function initCasesPageAnimations(): void {
  if (prefersReducedMotion()) {
    gsap.set('[data-cases-hero-item], [data-case-content], [data-case-chip], [data-cases-footer-item]', {
      opacity: 1,
      clearProps: 'all',
    });
    return;
  }

  initCasesHeroAnimations();
  initCaseSectionAnimations();
  initCasesFooterAnimations();
}

function initCasesHeroAnimations(): void {
  const hero = document.querySelector('[data-cases-hero]');
  if (!hero) return;

  const items = hero.querySelectorAll('[data-cases-hero-item]');
  if (items.length) {
    gsap.from(items, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      force3D: true,
    });
  }
}

function initCaseSectionAnimations(): void {
  const sections = document.querySelectorAll('[data-case-section]');

  sections.forEach((section) => {
    // Parallax on background number
    const bgNumber = section.querySelector('[data-case-bg-number]');
    if (bgNumber) {
      gsap.to(bgNumber, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Content fade in
    const content = section.querySelector('[data-case-content]');
    if (content) {
      gsap.from(content, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
        },
      });
    }

    // Chips scale in with stagger
    const chips = section.querySelectorAll('[data-case-chip]');
    if (chips.length) {
      gsap.from(chips, {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'back.out(1.4)',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          once: true,
        },
      });
    }

    // Stats number count up
    const statNumbers = section.querySelectorAll('[data-case-stat-number]');
    statNumbers.forEach((numEl) => {
      const element = numEl as HTMLElement;
      const text = element.textContent || '0';

      // Skip animation for complex formats (date ranges like "1989-2013", text like "Feb 2026")
      // Only animate simple numbers with optional currency symbols and separators
      const isSimpleNumber = /^[\d.,€$M]+$/.test(text.trim());
      if (!isSimpleNumber) {
        // Just fade in for complex formats
        gsap.fromTo(
          element,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              once: true,
            },
          }
        );
        return;
      }

      const numericMatch = text.match(/[\d.,]+/);
      if (!numericMatch) return;

      const originalText = text;
      const numericStr = numericMatch[0].replace(/\./g, '').replace(',', '.');
      const endValue = parseFloat(numericStr);
      const prefix = text.slice(0, text.indexOf(numericMatch[0]));
      const suffix = text.slice(text.indexOf(numericMatch[0]) + numericMatch[0].length);
      const useThousandSeparator = numericMatch[0].includes('.');

      gsap.fromTo(
        element,
        { textContent: prefix + '0' + suffix },
        {
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            once: true,
          },
          onUpdate: function () {
            const progress = this.progress();
            const current = Math.floor(endValue * progress);
            let formatted: string;

            if (useThousandSeparator) {
              formatted = current.toLocaleString('es-ES');
            } else {
              formatted = current.toString();
            }

            element.textContent = prefix + formatted + suffix;
          },
          onComplete: function () {
            element.textContent = originalText;
          },
        }
      );
    });
  });
}

function initCasesFooterAnimations(): void {
  const footer = document.querySelector('[data-cases-footer]');
  if (!footer) return;

  const items = footer.querySelectorAll('[data-cases-footer-item]');
  if (items.length) {
    gsap.from(items, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footer,
        start: 'top 85%',
        once: true,
      },
    });
  }
}

// Cronología Page Animations
export function initCronoPageAnimations(): void {
  if (prefersReducedMotion()) {
    gsap.set('[data-crono-hero-item], [data-crono-event], [data-crono-year-title], [data-crono-footer-item]', {
      opacity: 1,
      clearProps: 'all',
    });
    return;
  }

  initCronoHeroAnimations();
  initCronoYearAnimations();
  initCronoFooterAnimations();
}

function initCronoHeroAnimations(): void {
  const hero = document.querySelector('[data-crono-hero]');
  if (!hero) return;

  // Background text parallax
  const bgText = hero.querySelector('[data-crono-hero-bg]');
  if (bgText) {
    gsap.to(bgText, {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // Hero items stagger animation
  const items = hero.querySelectorAll('[data-crono-hero-item]');
  if (items.length) {
    gsap.from(items, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      force3D: true,
    });
  }
}

function initCronoYearAnimations(): void {
  const sections = document.querySelectorAll('[data-crono-year]');

  sections.forEach((section) => {
    // Year title animation
    const yearTitle = section.querySelector('[data-crono-year-title]');
    if (yearTitle) {
      gsap.from(yearTitle, {
        x: -50,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      });
    }

    // Events fade in with stagger
    const events = section.querySelectorAll('[data-crono-event]');
    if (events.length) {
      gsap.from(events, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
        },
      });
    }
  });
}

function initCronoFooterAnimations(): void {
  const footer = document.querySelector('[data-crono-footer]');
  if (!footer) return;

  const items = footer.querySelectorAll('[data-crono-footer-item]');
  if (items.length) {
    gsap.from(items, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footer,
        start: 'top 85%',
        once: true,
      },
    });
  }
}

// Imputados Page Animations
export function initImputadosPageAnimations(): void {
  if (prefersReducedMotion()) {
    gsap.set('[data-imputados-hero-item], [data-imputados-card], [data-imputados-section-title], [data-imputados-footer-item]', {
      opacity: 1,
      clearProps: 'all',
    });
    return;
  }

  initImputadosHeroAnimations();
  initImputadosSectionAnimations();
  initImputadosFooterAnimations();
}

function initImputadosHeroAnimations(): void {
  const hero = document.querySelector('[data-imputados-hero]');
  if (!hero) return;

  const items = hero.querySelectorAll('[data-imputados-hero-item]');
  if (items.length) {
    gsap.from(items, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      force3D: true,
    });
  }

  // Animate stat numbers
  const statNumbers = hero.querySelectorAll('[data-imputados-stat-number]');
  statNumbers.forEach((numEl) => {
    const element = numEl as HTMLElement;
    const text = element.textContent || '0';
    const numericMatch = text.match(/[\d.,]+/);
    if (!numericMatch) return;

    const originalText = text;
    const numericStr = numericMatch[0].replace(/\./g, '').replace(',', '.');
    const endValue = parseFloat(numericStr);
    const prefix = text.slice(0, text.indexOf(numericMatch[0]));
    const suffix = text.slice(text.indexOf(numericMatch[0]) + numericMatch[0].length);

    gsap.fromTo(
      element,
      { textContent: prefix + '0' + suffix },
      {
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.5,
        onUpdate: function () {
          const progress = this.progress();
          const current = Math.floor(endValue * progress);
          element.textContent = prefix + current.toString() + suffix;
        },
        onComplete: function () {
          element.textContent = originalText;
        },
      }
    );
  });
}

function initImputadosSectionAnimations(): void {
  const sections = document.querySelectorAll('[data-imputados-section]');

  sections.forEach((section) => {
    // Section title animation
    const title = section.querySelector('[data-imputados-section-title]');
    if (title) {
      gsap.from(title, {
        x: -30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      });
    }

    // Cards scale in with stagger
    const cards = section.querySelectorAll('[data-imputados-card]');
    if (cards.length) {
      gsap.from(cards, {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.2)',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
        },
      });
    }
  });
}

function initImputadosFooterAnimations(): void {
  const footer = document.querySelector('[data-imputados-footer]');
  if (!footer) return;

  const items = footer.querySelectorAll('[data-imputados-footer-item]');
  if (items.length) {
    gsap.from(items, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footer,
        start: 'top 85%',
        once: true,
      },
    });
  }
}

// Documentos Page Animations
export function initDocumentosPageAnimations(): void {
  if (prefersReducedMotion()) {
    gsap.set('[data-documentos-hero-item], [data-documentos-card], [data-documentos-section-title], [data-documentos-footer-item]', {
      opacity: 1,
      clearProps: 'all',
    });
    return;
  }

  initDocumentosHeroAnimations();
  initDocumentosSectionAnimations();
  initDocumentosFooterAnimations();
}

function initDocumentosHeroAnimations(): void {
  const hero = document.querySelector('[data-documentos-hero]');
  if (!hero) return;

  // Header fade down
  const header = document.querySelector('header');
  if (header) {
    gsap.from(header, {
      y: -30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      force3D: true,
    });
  }

  // Title slide from left
  const title = hero.querySelector('[data-documentos-title]');
  if (title) {
    gsap.from(title, {
      x: -100,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      force3D: true,
    });
  }

  // Other items fade up with stagger
  const items = hero.querySelectorAll('[data-documentos-hero-item]');
  if (items.length) {
    gsap.from(items, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      delay: 0.2,
      ease: 'power3.out',
      force3D: true,
    });
  }
}

function initDocumentosSectionAnimations(): void {
  const sections = document.querySelectorAll('[data-documentos-section]');

  sections.forEach((section) => {
    // Section title animation
    const title = section.querySelector('[data-documentos-section-title]');
    if (title) {
      gsap.from(title, {
        x: -30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      });
    }

    // Cards scale in with stagger
    const cards = section.querySelectorAll('[data-documentos-card]');
    if (cards.length) {
      gsap.from(cards, {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.2)',
        force3D: true,
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
        },
      });
    }

    // Disclaimer items animation
    const disclaimerItems = section.querySelectorAll('[data-documentos-hero-item]');
    if (disclaimerItems.length) {
      gsap.from(disclaimerItems, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      });
    }
  });
}

function initDocumentosFooterAnimations(): void {
  const footer = document.querySelector('[data-documentos-footer]');
  if (!footer) return;

  const items = footer.querySelectorAll('[data-documentos-footer-item]');
  if (items.length) {
    gsap.from(items, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footer,
        start: 'top 85%',
        once: true,
      },
    });
  }
}

// Fuente Detail Page Animations
export function initFuenteDetailPageAnimations(): void {
  if (prefersReducedMotion()) {
    gsap.set('[data-fuente-hero-item], [data-fuente-title], [data-fuente-desc-content], [data-fuente-stat-card], [data-fuente-section-title], [data-fuente-doc-row], [data-fuente-caso-card], [data-fuente-footer-item]', {
      opacity: 1,
      clearProps: 'all',
    });
    return;
  }

  initFuenteHeroAnimations();
  initFuenteSectionAnimations();
  initFuenteFooterAnimations();
}

function initFuenteHeroAnimations(): void {
  const hero = document.querySelector('[data-fuente-hero]');
  if (!hero) return;

  // Header fade down
  const header = document.querySelector('header');
  if (header) {
    gsap.from(header, {
      y: -30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      force3D: true,
    });
  }

  // Title slide from left
  const title = hero.querySelector('[data-fuente-title]');
  if (title) {
    gsap.from(title, {
      x: -80,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      force3D: true,
    });
  }

  // Hero items fade up with stagger
  const items = hero.querySelectorAll('[data-fuente-hero-item]');
  if (items.length) {
    gsap.from(items, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      delay: 0.2,
      ease: 'power2.out',
      force3D: true,
    });
  }
}

function initFuenteSectionAnimations(): void {
  const sections = document.querySelectorAll('[data-fuente-section]');

  sections.forEach((section) => {
    // Section title animation
    const title = section.querySelector('[data-fuente-section-title]');
    if (title) {
      gsap.from(title, {
        x: -30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      });
    }

    // Description content animation
    const descContent = section.querySelector('[data-fuente-desc-content]');
    if (descContent) {
      gsap.from(descContent, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      });
    }

    // Stat cards scale in with stagger
    const statCards = section.querySelectorAll('[data-fuente-stat-card]');
    if (statCards.length) {
      gsap.from(statCards, {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.2)',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
        },
      });
    }

    // Document rows slide in with stagger
    const docRows = section.querySelectorAll('[data-fuente-doc-row]');
    if (docRows.length) {
      gsap.from(docRows, {
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
        },
      });
    }

    // Casos description
    const casosDesc = section.querySelector('[data-fuente-casos-desc]');
    if (casosDesc) {
      gsap.from(casosDesc, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      });
    }

    // Caso cards scale in with stagger
    const casoCards = section.querySelectorAll('[data-fuente-caso-card]');
    if (casoCards.length) {
      gsap.from(casoCards, {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: 'back.out(1.2)',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
          once: true,
        },
      });
    }
  });
}

function initFuenteFooterAnimations(): void {
  const footer = document.querySelector('[data-fuente-footer]');
  if (!footer) return;

  const items = footer.querySelectorAll('[data-fuente-footer-item]');
  if (items.length) {
    gsap.from(items, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footer,
        start: 'top 85%',
        once: true,
      },
    });
  }
}
