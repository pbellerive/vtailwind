<template>
  <div>
    <div class="inline-flex items-center">
      <label
        :class="[css.pointerCss, css.labelCss]"
        for="checkbox"
        data-ripple-dark="true">
        <input
          id="checkbox"
          v-model="internalValue"
          type="checkbox"
          :class="[css.baseCss, css.bgCss, css.borderCss]"
          :value="trueValue"
          :true-value="trueValue"
          :false-value="falseValue"
          :required="required"
          :disabled="disabled" />
        <div :class="[css.checkCss]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="1">
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd" />
          </svg>
        </div>
      </label>
    </div>
  </div>
</template>

<script>
  import Base from './base';

  export default {
    extends: Base,
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      modelValue: {
        type: [Number, String, Boolean, Array],
        default: false
      },
      required: {
        type: Boolean,
        default: false
      },
      trueValue: {
        type: [Boolean, String, Number],
        default: true
      },
      falseValue: {
        type: [Boolean, String, Number],
        default: false
      }
    },
    emits: ['update:modelValue'],
    data() {
      return {
        newValue: this.modelValue,
        tag: 'checkbox',
        css: {
          baseCss: '',
          bottomLabelCss: 'flex text-sm pb-1 cursor-pointer w-fit pt-1',
          bottomLabelColorCss: 'text-gray-400',
          variant: {
            default: {
              // baseCss: 'h-4 w-4 rounded-none border transition duration-200 relative z-0 col-start-1 row-start-1 ',
              baseCss:
                'before:content[""] peer relative h-5 w-5 appearance-none rounded-md transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 before:transition-opacity',
              bgCss:
                'before:bg-blue-gray-500 checked:bg-slate-700 checked:before:bg-slate-500 hover:before:opacity-10',
              borderCss: 'border border-blue-gray-200 checked:border-slate-500 before:rounded-full',
              pointerCss: 'cursor-pointer',
              labelCss: 'relative flex items-center rounded-full p-3',
              checkCss:
                'pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100'
              // textCss: 'z-10 relative text-center text-md text-gray-500 pl-2.5 select-none',
            },
            danger: {
              baseCss:
                'before:content[""] peer relative h-5 w-5 appearance-none rounded-md transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 before:transition-opacity',
              bgCss:
                'before:bg-blue-gray-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10',
              borderCss: 'border border-blue-gray-200 checked:border-red-500 before:rounded-full',
              pointerCss: 'cursor-pointer',
              labelCss: 'relative flex items-center rounded-full p-3',
              checkCss:
                'pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100'
            }
          }
        }
      };
    },
    computed: {
      internalValue: {
        get() {
          return this.newValue;
        },
        set(value) {
          this.newValue = value;
          this.$emit('update:modelValue', this.newValue);
        }
      }
    },
    watch: {
      modelValue(newValue) {
        this.newValue = newValue;
      }
    },
    created() {
      this.newValue = this.modelValue;
    },
    methods: {}
  };
</script>

<style lang="scss" scoped></style>
