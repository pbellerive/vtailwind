<template>
  <div class="wrapper">
    <textarea
      :value="modelValue"
      :cols="cols"
      :rows="rows"
      :required="required"
      :class="[css.baseCss]"
      :disabled="disabled"
      @input="onInput" />
  </div>
</template>

<script>
  import VBase from './base';

  export default {
    extends: VBase,
    props: {
      cols: {
        type: [String, Number]
      },
      rows: {
        type: [String, Number],
        default: 5
      },
      modelValue: {
        type: String
      },
      required: {
        type: Boolean,
        default: false
      }
    },
    emits: ['update:modelValue'],
    setup() {
      return {};
    },
    data() {
      return {
        tag: 'text-area',
        css: {
          baseCss: 'border border-gray-300 w-full',
          wrapper: 'w-full',
          variant: {
            default: {
              baseCss: 'border border-gray-300 w-full',
              wrapper: 'w-full'
            }
          }
        }
      };
    },
    methods: {
      onInput(evt) {
        this.$emit('update:modelValue', evt.target.value);
      }
    }
  };
</script>

<style lang="scss" scoped></style>
