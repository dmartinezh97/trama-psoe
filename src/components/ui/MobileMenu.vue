<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  locale: 'es' | 'en';
}>();

const isOpen = ref(false);
const isMounted = ref(false);

const navLinks = {
  es: [
    { text: 'Casos', href: '/es/casos' },
    { text: 'Cronología', href: '/es/cronologia' },
    { text: 'Imputados', href: '/es/imputados' },
    { text: 'Documentos', href: '/es/documentos' },
  ],
  en: [
    { text: 'Cases', href: '/en/cases' },
    { text: 'Timeline', href: '/en/timeline' },
    { text: 'Accused', href: '/en/defendants' },
    { text: 'Documents', href: '/en/documents' },
  ],
};

const links = navLinks[props.locale];

const openMenu = () => {
  isOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeMenu = () => {
  isOpen.value = false;
  document.body.style.overflow = '';
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isOpen.value) {
    closeMenu();
  }
};

onMounted(() => {
  isMounted.value = true;
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});

defineExpose({ openMenu, closeMenu, isOpen });
</script>

<template>
  <!-- Menu Button -->
  <button
    @click="openMenu"
    class="flex items-center justify-center w-10 h-10 text-black hover:text-trama-red transition-colors"
    aria-label="Abrir menú"
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>

  <!-- Overlay and Drawer - Only render after mount to avoid hydration mismatch -->
  <Teleport to="body" v-if="isMounted">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
        @click="closeMenu"
      />
    </Transition>

    <!-- Drawer Panel -->
    <Transition name="slide">
      <div
        v-if="isOpen"
        class="fixed right-0 top-0 h-full w-[280px] bg-trama-950 z-[101] flex flex-col"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-5 border-b border-trama-800">
          <a :href="`/${locale}`" class="flex items-center gap-2">
            <img src="/img/version_transparente_invertida.png" alt="La Trama PSOE" class="h-10" />
          </a>
          <button
            @click="closeMenu"
            class="flex items-center justify-center w-8 h-8 text-white hover:text-trama-red transition-colors"
            aria-label="Cerrar menú"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Navigation Links -->
        <nav class="flex-1 py-6 px-5">
          <ul class="flex flex-col gap-1">
            <li v-for="link in links" :key="link.href">
              <a
                :href="link.href"
                class="block py-3 px-4 font-secondary text-base font-semibold text-white hover:text-trama-red hover:bg-trama-900 transition-colors rounded"
                @click="closeMenu"
              >
                {{ link.text }}
              </a>
            </li>
          </ul>
        </nav>

        <!-- Footer - Language Selector -->
        <div class="p-5 border-t border-trama-800">
          <span class="font-secondary text-xs font-semibold tracking-[1px] text-trama-500 mb-3 block">
            {{ locale === 'es' ? 'IDIOMA' : 'LANGUAGE' }}
          </span>
          <div class="flex gap-2">
            <a
              :href="locale === 'es' ? '/es/' : '/es/'"
              :class="[
                'flex-1 py-2 text-center font-secondary text-sm font-bold transition-colors rounded',
                locale === 'es'
                  ? 'bg-trama-red text-white'
                  : 'bg-trama-800 text-trama-400 hover:text-white'
              ]"
            >
              ES
            </a>
            <a
              :href="locale === 'en' ? '/en/' : '/en/'"
              :class="[
                'flex-1 py-2 text-center font-secondary text-sm font-bold transition-colors rounded',
                locale === 'en'
                  ? 'bg-trama-red text-white'
                  : 'bg-trama-800 text-trama-400 hover:text-white'
              ]"
            >
              EN
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
