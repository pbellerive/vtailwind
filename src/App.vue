<script>
import Demo from './components/demo.vue';
import 'tailwindcss/tailwind.css';

export default {
  name: 'App',
  components: {
    Demo
  }
};
</script>

<template>
  <div class="mx-auto mt-8 grid max-w-4xl justify-items-center">
    <img
      class="w-32 self-center"
      alt="Vue logo"
      src="./assets/logo.png"
    />
  </div>
  <Demo />
</template>
