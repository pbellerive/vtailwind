<template>
  <div>
    <div class="inline-flex items-center">
      <label :class="[css.pointerCss, css.labelCss]" for="checkbox" data-ripple-dark="true">
        <input type="checkbox" :class="[css.baseCss, css.bgCss, css.borderCss]" id="checkbox" v-model="value" />
        <div :class="[css.checkCss]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
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
  data() {
    return {
      tag: 'checkbox',
      value: true,
      css: {
        baseCss: '',
        bottomLabelCss: 'flex text-sm pb-1 cursor-pointer w-fit pt-1',
        bottomLabelColorCss: 'text-gray-400',
        activeCss: 'active:ring',
        // focusCss: 'focus:outline-0 focus:ring-1',
        // disabledColorCss: 'pointer-events-none border-gray-200',
        // disabledIconCss: 'invisible pointer-events-none z-1 col-start-1 row-start-1',
        // textCss: 'z-10 relative text-center text-lg text-gray-500 pl-2.5 select-none',
        // disabledPointerCss: 'pointer-events-none',
        // pointerCss: 'cursor-pointer',
        variant: {
          default: {
            // baseCss: 'h-4 w-4 rounded-none border transition duration-200 relative z-0 col-start-1 row-start-1 ',
            baseCss:
              "before:content[''] peer relative h-5 w-5 appearance-none rounded-md transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 before:transition-opacity",
            bgCss: 'before:bg-blue-gray-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10',
            borderCss: 'border border-blue-gray-200 checked:border-pink-500 before:rounded-full',
            pointerCss: 'cursor-pointer',
            labelCss: 'relative flex items-center rounded-full p-3',
            checkCss: 'pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100',
            // textCss: 'z-10 relative text-center text-md text-gray-500 pl-2.5 select-none',
          },
          danger: {
            baseCss: 'appearance-none h-4 w-4 rounded-none border transition duration-200 relative z-0 col-start-1 row-start-1 border-red-100 ',
            iconColorCss: 'text-red-100',
            hoverCss: 'hover:border-red-300 hover:shadow',
            textCss: 'z-10 relative text-center text-md pl-2.5 select-none text-red-900 ',
            focusCss: 'outline-none focus:border-red-100 focus:shadow-inner',
            bottomLabelColorCss: 'text-red-200',
          },
        },
        variantColor: {
          blue: {
            colorCss: 'border-gray-500 bg-white ring-blue-600 hover:border-blue-50',
            hoverCss: 'hover:border-blue-50 cursor-pointer hover:ring-blue-50 checked:hover:bg-blue-50',
            checkedCss: 'checked:bg-blue-600 checked:text-blue-600 checked:ring-0 checked:border-blue-600',
          },
          red: {
            colorCss: 'border-gray-500 bg-white ring-red-600 hover:border-red-50',
            hoverCss: 'hover:border-lightred-300 cursor-pointer hover:lightred-300 checked:hover:bg-lightred-300',
            checkedCss: 'checked:bg-lightred-300 checked:text-lightred-300 checked:ring-0 checked:border-lightred-300',
          },
          green: {
            colorCss: 'border-gray-500 bg-white ring-green-600 hover:border-green-50',
            hoverCss: 'hover:border-green-400 cursor-pointer hover:ring-green-400 checked:hover:bg-green-400',
            checkedCss: 'checked:bg-green-400 checked:text-green-400 checked:ring-0 checked:border-green-400',
          },
        },
      },
    };
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    // checked: {
    //   type: Boolean,
    // },
    modelValue: {
      type: [Number, String, Boolean, Array],
    },
    bgColor: {
      type: String,
      default: 'blue',
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggle(e) {
      if (e.target.tagName !== 'SPAN') {
        this.$emit('update:modelValue', !this.modelValue);
      }
    },
  },
  computed: {
    colorVariantCss() {
      if (this.disabled) {
        return this.css.disabledColorCss;
      }
      return this.css.variantColor[this.bgColor].colorCss + ' ' + this.css.variantColor[this.bgColor].hoverCss + ' ' + this.css.variantColor[this.bgColor].checkedCss;
    },
    iconCss() {
      if (this.disabled) {
        return this.css.disabledIconCss;
      }
      return this.css.iconCss;
    },
    hoverCss() {
      if (this.disabled) {
        return '';
      }
      return this.css.hoverCss;
    },
    activeCss() {
      if (this.disabled) {
        return '';
      }
      return this.css.activeCss;
    },
    textPointerCss() {
      if (this.disabled) {
        return this.css.disabledPointerCss;
      }
      return this.css.pointerCss;
    },
  },
};
</script>

<style lang="scss" scoped></style>
