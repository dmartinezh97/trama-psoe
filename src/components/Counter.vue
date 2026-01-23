<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  label?: string;
}>();

const count = ref(0);

function increment() {
  count.value++;
}

function decrement() {
  count.value--;
}
</script>

<template>
  <div class="inline-flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
    <span v-if="label" class="text-sm font-medium text-gray-700">{{ label }}:</span>
    <div class="flex items-center gap-2">
      <button
        @click="decrement"
        class="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        -
      </button>
      <span class="min-w-[3rem] text-center text-lg font-semibold text-gray-900">
        {{ count }}
      </span>
      <button
        @click="increment"
        class="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        +
      </button>
    </div>
  </div>
</template>
