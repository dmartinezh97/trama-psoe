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
