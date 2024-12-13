<template>
  <div v-if="show" :class="[css.bgCss, css.wrapper]">
    <div :class="css.closeButtonCss">
      <button variant="close" @click="show = false"> x </button>
    </div>
    <div class="flex flex-col gap-3 divide-y divide-gray-500">
      <slot/>
    </div>
  </div>
</template>

<script>
import Base from './base';

export default {
  extends: Base,
  data() {
    return {
      show: false,
      tag: 'modal',
      css: {
        wrapper: 'absolute z-50 top-9 right-0 px-3 rounded-sm',
        closeButtonCss: 'flex justify-end top-2',
        bgCss: 'bg-slate-700 text-white',
        disabledBgCss: '',
        variant: {
          danger: {
            bgCss: 'bg-red-600 hover:bg-red-700 text-white'
          }
        }
      }
    };
  },
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
