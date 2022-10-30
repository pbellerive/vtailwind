<template>
  <div v-if="show" :class="[css.wrapper, css.bgCss]">
    <div :class="css.baseCss">
      <slot>
        {{ message }}
      </slot>
    </div>
    <div @click="show = false" :class="css.buttonCss">x</div>
  </div>
</template>

<script>
import Base from './base';

export default {
  extends: Base,
  setup() {},
  computed: {
    bgCss() {
      if (this.disabled) {
        return this.css.disabledBgCss;
      }

      return this.css.bgCss;
    },
  },
  data() {
    return {
      tag: 'message',
      css: {
        wrapper: 'flex w-full py-3',
        baseCss: 'flex-1 text-center',
        bgCss: 'bg-white',
        buttonCss: 'self-end px-3 font-bold hover:text-gray-600 cursor-pointer',
        variant: {
          default: {
            wrapper: 'flex w-full py-3',
            baseCss: 'flex-1 text-center',
            bgCss: 'bg-white',
            buttonCss: 'self-end px-3 font-bold hover:text-gray-600 cursor-pointer',
          },
          danger: {
            bgCss: 'bg-red-50 text-red-900',
          },
          info: {
            bgCss: 'bg-gray-200 text-gray-900',
          },

          success: {
            bgCss: 'bg-green-fg-500 text-white',
          },
          warning: {
            bgCss: 'bg-yellow-fy-300 text-gray-900',
          },
        },
      },
    };
  },
  props: {
    message: {
      type: String,
      default: '',
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped></style>
