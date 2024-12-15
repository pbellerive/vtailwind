<template>
  <div :class="css.wrapper">
    <select
      :value="modelValue"
      :class="[css.baseCss]"
      :disabled="disabled"
      @change="onChange">
      <option
        v-if="placeholder"
        value="undefined"
        :class="css.placeholderCss">
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :class="optionClass(option[valueOptionAttribute])"
        :value="option[valueOptionAttribute]">
        {{ option[textOptionAttribute] }}
      </option>
    </select>
    <div
      v-if="label"
      :class="css.label">
      <label>
        {{ label }}
      </label>
    </div>
  </div>
</template>

<script>
  import VBase from './base';

  export default {
    extends: VBase,
    props: {
      label: {
        type: String,
        default: undefined
      },
      modelValue: {
        type: [String, Number],
        default: undefined
      },
      valueOptionAttribute: {
        type: String,
        default: 'value'
      },
      textOptionAttribute: {
        type: String,
        default: 'text'
      },
      options: {
        type: Array,
        default() {
          return [];
        }
      },
      placeholder: {
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
        tag: 'select',
        css: {
          wrapper: '',
          baseCss: '',
          placeholderCss: '',
          optionCss: '',
          selectedCss: '',
          variant: {
            default: {
              wrapper: 'relative h-10',
              baseCss:
                'peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50',
              placeholderCss: 'text-gray-300',
              optionCss: 'text-gray-900 bg-white',
              selectedCss: 'text-blue-300',
              label:
                "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
            },
            primary: {
              wrapper: 'relative h-10',
              baseCss:
                'peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50',
              placeholderCss: 'text-gray-300',
              optionCss: 'text-gray-900 bg-white',
              selectedCss: 'text-blue-300',
              label:
                "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
            },
            success: {
              wrapper: 'relative h-10',
              baseCss:
                'peer h-full w-full rounded-[7px] border border-green-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-200 placeholder-shown:border-t-green-200 empty:!bg-red-500 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-green-50',
              optionCss: 'text-gray-900 bg-white',
              selectedCss: 'text-blue-300',
              label:
                "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-green-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-green-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-green-500"
            },
            danger: {
              wrapper: 'relative h-10',
              baseCss:
                'peer h-full w-full rounded-[7px] border border-red-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-red-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-red-200 placeholder-shown:border-t-red-200 empty:!bg-red-500 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-red-50',
              optionCss: 'text-gray-900 bg-white',
              selectedCss: 'text-blue-300',
              label:
                "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-red-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-red-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-red-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-red-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-red-500"
            }
          }
        }
      };
    },
    methods: {
      /// pas de v-model ceci n<est pas reactif
      optionClass(value) {
        if (this.isSelected(value)) {
          return this.css.selectedCss;
        }

        return this.css.optionCss;
      },
      isSelected(value) {
        if (this.modelValue === undefined) {
          return value === undefined;
        }
        return value === this.modelValue;
      },
      onChange(evt) {
        this.$emit('update:modelValue', evt.target.value);
      }
    }
  };
</script>

<style lang="scss" scoped></style>
