<template>
  <div :class="css.wrapper">
    <label
      v-if="label"
      :class="css.label">
      {{ label }}
    </label>
    <div class="flex gap-0">
      <div
        v-if="prepend"
        class="prependButton">
        <v-button variant="prepend">
          {{ prependValue }}
        </v-button>
      </div>
      <input
        :type="type"
        :value="modelValue"
        :required="required"
        :placeholder="placeholder"
        :class="[css.baseCss, prepend ? css.preprendInput : '']"
        :disabled="disabled"
        :data-testId="dataTestId"
        @input="onInput"
        @focus="isFocus = true"
        @focusout="isFocus = false" />
    </div>
    <div
      v-if="['danger', 'filled_danger'].includes(variant) && shortErrorMessage"
      :class="[css.shortError]"
      class="">
      <div>
        {{ shortErrorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
  import VBase from './base';
  import VButton from './VButton.vue';

  export default {
    components: {
      'v-button': VButton
    },
    extends: VBase,
    props: {
      prepend: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: undefined
      },
      prependValue: {
        type: String,
        default: undefined
      },
      modelValue: {
        type: [String, Number]
      },
      prependText: {
        type: String,
        default: undefined
      },
      required: {
        type: Boolean,
        default: false
      },
      shortErrorMessage: {
        type: String,
        default: undefined
      },
      placeholder: {
        type: String,
        default: undefined
      },
      type: {
        type: String
      }
    },
    emits: ['update:modelValue'],
    setup() {
      return {};
    },
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
              baseCss:
                'peer w-full rounded-[7px] border border-gray-200  bg-transparent px-3 py-1 font-sans text-sm font-normal text-blue-gray-700  transition-all focus:border-2 focus:border-blue-300 focus:outline-0 disabled:border-1 disabled:bg-gray-50',
              label: '',
              prependButton: 'mr-0 pr-0',
              preprendInput: 'ml-0 rounded-l-none'
            },
            success: {
              wrapper: 'relative h-14 w-full min-w-[200px]',
              // baseCss: 'border border-red-500 rounded rounded-sm px-4 py-1 focus:outline-none focus:ring-1 focus:ring-red-500 w-full max-w-full text-red-500',
              baseCss:
                'peer w-full rounded-[7px] border border-green-200  bg-transparent px-3 py-1.5 font-sans text-sm font-normal text-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-200 placeholder-shown:border-t-green-200 focus:border-2 focus:border-blue-300 focus:outline-0 disabled:border-1 disabled:bg-gray-50',
              label: ''
            },
            danger: {
              wrapper: 'relative h-14 w-full min-w-[200px]',
              // baseCss: 'border border-red-500 rounded rounded-sm px-4 py-1 focus:outline-none focus:ring-1 focus:ring-red-500 w-full max-w-full text-red-500',
              baseCss:
                'peer w-full rounded-[7px] border border-red-200  bg-transparent px-3 py-1.5 font-sans text-sm font-normal text-red-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-red-200 placeholder-shown:border-t-red-200 focus:border-2 focus:border-blue-300 focus:outline-0 disabled:border-1 disabled:bg-gray-50',
              label: '',
              shortError: 'text-red-500 font-normal text-xs text-left ml-1'
            },
            filled: {
              wrapper: 'relative h-14 w-full min-w-[200px]',
              baseCss:
                'peer w-full border-b-2 border-blue-gray-500 bg-gray-200 pt-4 pb-1.5 px-3  font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-300 focus:outline-0 disabled:border-1 disabled:bg-gray-50-50',
              label: '',
              prepend: 'border border-gray-200 bg-zinc-200 text-zinc-400 pl-5 pr-2 font-bold'
            },
            filled_danger: {
              wrapper: 'relative h-14 w-full min-w-[200px]',
              baseCss:
                'peer w-full border-b-2 border-red-600 bg-gray-200 pt-4 pb-1.5 px-3  font-sans text-sm font-normal text-red-700 outline outline-0 transition-all placeholder-shown:border-red-200 focus:border-blue-300 focus:outline-0 disabled:border-1 disabled:bg-gray-50',
              label: '',
              prepend: 'border border-gray-200 bg-zinc-200 text-zinc-400 pl-5 pr-2 font-bold',
              shortError: 'bg-transparent text-red-500 font-normal text-xs text-left ml-1'
            },
            filled_success: {
              wrapper: 'relative h-14 w-full min-w-[200px]',
              baseCss:
                'peer w-full border-b-2 border-green-200 bg-gray-200 pt-4 pb-1.5 px-3  font-sans text-sm font-normal text-green-700 outline outline-0 transition-all placeholder-shown:border-green-200 focus:border-blue-300 focus:outline-0 disabled:border-1 disabled:bg-gray-50',
              label: '',
              prepend: 'border border-green-200 bg-zinc-200 text-zinc-400 pl-5 pr-2 font-bold'
            },
            title: {
              baseCss:
                'border-none rounded rounded-sm px-4 py-1 focus:outline-none focus:ring-1 focus:ring-blue-fb-300 w-full max-w-full text-gray-600 font-bold text-lg md:text-2xl'
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
