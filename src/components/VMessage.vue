<template>
  <div v-if="innerShow" :class="[css.wrapper, css.bgCss]">
    <div :class="css.baseCss">
      <slot>
        {{ message }}
      </slot>
    </div>
    <div @click="hide" :class="css.closeButtonCss">x</div>
  </div>
</template>

<script>
import Base from './base';

export default {
  extends: Base,
  setup() {},
  emits: ['update:show'],
  computed: {
    bgCss() {
      if (this.disabled) {
        return this.css.disabledBgCss;
      }

      return this.css.bgCss;
    },
  },
  mounted() {
    this.innerShow = this.show;
  },
  watch:{
    show(newValue, oldValue) {
      this.innerShow = newValue;
    }
  },
  methods: {
    hide() {
      this.innerShow = false;
      this.$emit('update:show', this.innerShow);
    }
  },
  data() {
    return {
      tag: 'message',
      innerShow: false, 
      css: {
        wrapper: 'flex w-full relative py-3',
        baseCss: 'flex-1 text-center',
        bgCss: 'bg-white',
        buttonCss: 'self-end px-3 font-bold hover:text-gray-600 cursor-pointer',
        variant: {
          default: {
            wrapper: 'flex w-full py-3 relative rounded-lg ',
            baseCss: 'flex-1 text-center font-regular relative mb-4 block w-full text-base leading-5  opacity-100',
            bgCss: 'bg-blue-500 text-white',
            closeButtonCss: 'absolute top-1 right-1 self-end px-3 font-bold hover:text-gray-600 cursor-pointer',
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
