<template>
  <div v-if="isLoading" :class="css.wrapper">
    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-notch" :class="css.textIcon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path
        fill="currentColor"
        d="M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z"
      ></path>
    </svg>
  </div>
</template>

<script>
import VBase from './base';

export default {
  extends: VBase,
  setup() {
    return {};
  },
  computed: {
    // isLoading() {
    //     return this.store.isLoading;
    // }
  },
  data() {
    return {
      tag: 'loading',
      css: {
        wrapper: 'fixed top-0 left-0 flex z-50 w-screen h-screen text-center bg-gray-50 opacity-50 items-center justify-center',
        textIcon: 'text-green-500 w-16 animate-spin',
        variant: {
          default: {
            wrapper: 'fixed top-0 left-0 flex z-50 w-screen h-screen text-center bg-gray-50 opacity-50 items-center justify-center',
            textIcon: 'text-green-500 w-16 animate-spin',
          },
          danger: {
            textIcon: 'text-red-500 w-16 animate-spin',
          },
        },
      },
    };
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped></style>
