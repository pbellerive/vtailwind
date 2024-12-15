<template>
  <div
    :class="{ dark: isDark }"
    class="min-h-screen">
    <div class="mx-auto mt-8 grid max-w-4xl justify-items-center">
      <img
        class="w-32 self-center"
        alt="Vue logo"
        src="./assets/logo.png" />
    </div>
    <demo @dark-mode-change="updateDarkMode" />
  </div>
</template>

<script setup>
  import Demo from './components/demo.vue';
  import 'tailwindcss/tailwind.css';
  import { ref } from 'vue';

  const isDark = ref(false);

  const updateDarkMode = (value) => {
    isDark.value = value;
  };
</script>
