<template>
    <div class="max-w-4xl mx-auto grid justify-items-center">
        <img class="self-center" alt="Vue logo" src="./assets/logo.png">
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
  margin-top: 60px;
}
</style>
