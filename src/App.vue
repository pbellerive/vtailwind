<template>
    <div class="max-w-4xl mx-auto grid justify-items-center mt-8">
        <img class="self-center w-32" alt="Vue logo" src="./assets/logo.png">
    </div>
  <Demo />
</template>

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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
