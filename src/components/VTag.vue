<template>
  <div :class="css.wrapper">
    <div v-if="iconClass">
      <font-awesome-icon :icon="iconClass" />
    </div>
    <div>
      <span class="text-xs">
        {{ label }}
      </span>
    </div>
  </div>
</template>

<script>
import VBase from './base';

export default {
  extends: VBase,
  props: {
    iconClass: {
      type: String,
      default: undefined
    },
    label: {
      type: String,
      default: undefined
    }
  },
  emits: ['update:modelValue'],
  setup() {
    return {};
  },
  data() {
    return {
      isFocus: false,
      tag: 'text-area',
      css: {
        baseCss: '',
        wrapper: 'flex gap-2 text-xs items-center rounded rounded-md border px-3 py-1',
        variant: {
          default: {
            baseCss: '',
            wrapper: 'flex gap-2 text-xs items-center rounded rounded-md border px-3 py-1'
          }
        }
      }
    };
  },
  computed: {
    withPrepend() {
      return typeof this.prependText !== 'undefined' && this.prependText.trim().length > 0;
    }
  },
  methods: {
    onInput(evt) {
      this.$emit('update:modelValue', evt.target.value);
    }
  }
};
</script>

<style lang="scss" scoped></style>
