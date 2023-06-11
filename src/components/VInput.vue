<template>
  <div :class="css.wrapper">
    <input :type="type" :value="modelValue" :required="required" :placeholder="placeholder" :class="[css.baseCss]" @input="onInput" :disabled="disabled" @focus="isFocus = true" @focusout="isFocus = false" :data-testId="dataTestId" />
    <label v-if="label" :class="css.label">
      {{ label }}
    </label>
    <div v-if="['danger', 'filled_danger'].includes(variant) && shortErrorMessage" :class="[css.shortError]" class="">
      <div>
        {{ shortErrorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import VBase from './base';

export default {
  extends: VBase,
  data() {
    return {
      isFocus: false,
      tag: 'input',
      css: {
        baseCss: '',
        label: '',
        prepend: '',
        wrapper: '',
        variant: {
          default: {
            wrapper: 'relative h-14 w-full min-w-[200px]',
            // baseCss: 'border border-gray-200 rounded rounded-sm px-4 py-1 focus:outline-none focus:ring-1 focus:ring-blue-fb-300 w-full max-w-full text-gray-500',
            baseCss:
              'peer w-full rounded-[7px] border border-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-t-transparent focus:border-blue-300 focus:outline-0 disabled:border-1 disabled:bg-gray-50',
            label:
              "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-300 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-300 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-300 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-gray-500",
          },
          success: {
            wrapper: 'relative h-14 w-full min-w-[200px]',
            // baseCss: 'border border-red-500 rounded rounded-sm px-4 py-1 focus:outline-none focus:ring-1 focus:ring-red-500 w-full max-w-full text-red-500',
            baseCss:
              'peer w-full rounded-[7px] border border-green-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-200 placeholder-shown:border-t-green-200 focus:border-2 focus:border-t-transparent focus:border-blue-300 focus:outline-0 disabled:border-1 disabled:bg-gray-50',
            label:
              "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-green-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-300 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-300 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-300 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500",
          },
          danger: {
            wrapper: 'relative h-14 w-full min-w-[200px]',
            // baseCss: 'border border-red-500 rounded rounded-sm px-4 py-1 focus:outline-none focus:ring-1 focus:ring-red-500 w-full max-w-full text-red-500',
            baseCss:
              'peer w-full rounded-[7px] border border-red-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-red-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-red-200 placeholder-shown:border-t-red-200 focus:border-2 focus:border-t-transparent focus:border-blue-300 focus:outline-0 disabled:border-1 disabled:bg-gray-50',
            label:
              "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-red-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-red-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-red-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-red-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-300 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-300 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-300 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500",
            shortError: 'text-red-500 font-normal text-xs text-left ml-1',
          },
          filled: {
            wrapper: 'relative h-14 w-full min-w-[200px]',
            baseCss:
              'peer w-full border-b-2 border-blue-gray-500 bg-gray-200 pt-4 pb-1.5 px-3  font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-300 focus:outline-0 disabled:border-1 disabled:bg-gray-50-50',
            label:
              "after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500",
            prepend: 'border border-gray-200 bg-zinc-200 text-zinc-400 pl-5 pr-2 font-bold',
          },
          filled_danger: {
            wrapper: 'relative h-14 w-full min-w-[200px]',
            baseCss:
              'peer w-full border-b-2 border-red-600 bg-gray-200 pt-4 pb-1.5 px-3  font-sans text-sm font-normal text-red-700 outline outline-0 transition-all placeholder-shown:border-red-200 focus:border-blue-300 focus:outline-0 disabled:border-1 disabled:bg-gray-50',
            label:
              "after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500",
            prepend: 'border border-gray-200 bg-zinc-200 text-zinc-400 pl-5 pr-2 font-bold',
            shortError: 'bg-transparent text-red-500 font-normal text-left ml-1',
          },
          filled_success: {
            wrapper: 'relative h-14 w-full min-w-[200px]',
            baseCss:
              'peer w-full border-b-2 border-green-200 bg-gray-200 pt-4 pb-1.5 px-3  font-sans text-sm font-normal text-green-700 outline outline-0 transition-all placeholder-shown:border-green-200 focus:border-blue-300 focus:outline-0 disabled:border-1 disabled:bg-gray-50',
            label:
              "after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500",
            prepend: 'border border-green-200 bg-zinc-200 text-zinc-400 pl-5 pr-2 font-bold',
          },
          title: {
            baseCss: 'border-none rounded rounded-sm px-4 py-1 focus:outline-none focus:ring-1 focus:ring-blue-fb-300 w-full max-w-full text-gray-600 font-bold text-lg md:text-2xl',
          },
        },
      },
    };
  },
  computed: {
    withPrepend() {
      return typeof this.prependText != 'undefined' && this.prependText.trim().length > 0;
    },
  },
  props: {
    label: {
      type: String,
      default: undefined,
    },
    modelValue: {
      type: [String, Number],
    },
    prependText: {
      type: String,
      dfault: undefined,
    },
    required: {
      type: Boolean,
      default: false,
    },
    shortErrorMessage: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
    },
  },
  $emits: ['update:modelValue'],
  methods: {
    onInput(evt) {
      this.$emit('update:modelValue', evt.target.value);
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
