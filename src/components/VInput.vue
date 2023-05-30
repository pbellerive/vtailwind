<template>
  <div :class="css.wrapper">
    <div v-if="label" :class="css.label">
      <span>
        {{ label }}
      </span>
    </div>
    <div v-if="variant == 'danger' && errorMessage" :class="css.error">
      <span>
        {{ errorMessage }}
      </span>
    </div>
    <div class="flex">
      <div v-if="withPrepend" :class="[css.prepend, { 'bg-blue-fb-300 border-2 border-blue-fb-300 ring-blue-fb-300': isFocus }]" class="flex items-center">
        <span>{{ prependText }}</span>
      </div>
      <div class="flex-1">
        <input :type="type" :value="modelValue" :required="required" :placeholder="placeholder" :class="[css.baseCss]" @input="onInput" :disabled="disabled" @focus="isFocus = true" @focusout="isFocus = false" />
      </div>
      <div v-if="variant == 'danger' && shortErrorMessage" :class="[css.shortError]" class="relative grid items-center flex-grow-0">
        <div>
          {{ shortErrorMessage }}
        </div>
        <div :class="css.shortErrorArrow"></div>
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
        baseCss: 'border border-gray-200 rounded rounded-sm px-4 py-1 focus:outline-none focus:ring-1 focus:ring-blue-fb-300 w-full max-w-full text-gray-500',
        label: 'text-left text-gray-700 font-bold text-sm',
        prepend: 'border border-gray-200 bg-zinc-200 text-zinc-400 pl-5 pr-2 font-bold',
        wrapper: 'grid justify-left text-sm',
        variant: {
          default: {
            // baseCss: 'border border-gray-200 rounded rounded-sm px-4 py-1 focus:outline-none focus:ring-1 focus:ring-blue-fb-300 w-full max-w-full text-gray-500',
            baseCss:
              'peer h-full w-full rounded-[7px] border border-red-200  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50',
            label: 'text-left text-gray-700 font-bold text-sm',
            prepend: 'border border-gray-200 bg-zinc-200 text-zinc-400 pl-5 pr-2 font-bold',
            // baseCss: 'border border-red-500 rounded rounded-sm px-4 py-1 focus:outline-none focus:ring-1 focus:ring-red-500 w-full max-w-full text-red-500',
            baseCss:
              'peer h-full w-full rounded-[7px] border border-red-500  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-red-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-red-200 placeholder-shown:border-t-red-200 focus:border-2 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-red-50',
            label: 'text-left text-red-500 font-bold',
            error: 'text-left text-red-500 font-bold',
            shortError: 'bg-red-500 text-white font-bold text-center ml-1 md:ml-3 rounded rounded-md px-3',
            shortErrorArrow: 'border-transparent   w-0 h-0 border-t-[10px] border-b-[10px] border border-r-[10px] border-r-red-500 absolute -left-2 top-1/2 -translate-y-1/2',
          },
          success: {
            // baseCss: 'border border-red-500 rounded rounded-sm px-4 py-1 focus:outline-none focus:ring-1 focus:ring-red-500 w-full max-w-full text-red-500',
            baseCss:
              'peer h-full w-full rounded-[7px] border border-green-500  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-200 placeholder-shown:border-t-green-200 focus:border-2 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-green-50',
            label: 'text-left text-green-500 font-bold',
            error: 'text-left text-green-500 font-bold',
            shortError: 'bg-green-500 text-white font-bold text-center ml-1 md:ml-3 rounded rounded-md px-3',
            shortErrorArrow: 'border-transparent   w-0 h-0 border-t-[10px] border-b-[10px] border border-r-[10px] border-r-green-500 absolute -left-2 top-1/2 -translate-y-1/2',
          },
          oneliner: {
            baseCss:
              'peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50',
            label: 'text-left text-gray-700 font-bold text-sm',
            prepend: 'border border-gray-200 bg-zinc-200 text-zinc-400 pl-5 pr-2 font-bold',
            wrapper: 'grid justify-left text-sm',
          },
          oneliner_danger: {
            baseCss:
              'peer h-full w-full border-b border-red-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-red-700 outline outline-0 transition-all placeholder-shown:border-red-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-red-50',
            label: 'text-left text-gray-700 font-bold text-sm',
            prepend: 'border border-gray-200 bg-zinc-200 text-zinc-400 pl-5 pr-2 font-bold',
            wrapper: 'grid justify-left text-sm',
          },
          oneliner_success: {
            baseCss:
              'peer h-full w-full border-b border-green-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-green-700 outline outline-0 transition-all placeholder-shown:border-green-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-green-50',
            label: 'text-left text-green-700 font-bold text-sm',
            prepend: 'border border-green-200 bg-zinc-200 text-zinc-400 pl-5 pr-2 font-bold',
            wrapper: 'grid justify-left text-sm',
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
    errorMessage: {
      type: String,
      default: undefined,
    },
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
