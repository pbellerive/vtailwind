<template>
  <div :class="[css.wrapper]">
    <div :class="[css.buttonWrapper, css.baseCss, disabledCss]">
      <div @click="onClickShowOptions" :class="css.placeholderWrapper">
        <span class="mr-2">
          {{ computedPlaceholder }}
        </span>
      </div>
      <div @click="onClickShowOptions" class="flex flex-1 justify-end cursor-pointer">
        <!-- font-awesome -->
        <div :class="css.arrowCss">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" class="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
          </svg>
        </div>
      </div>
    </div>
    <label :class="css.label">
      {{ label }}
    </label>
    <div v-if="showOptions" :class="css.optionsWrapper">
      <slot name="options-search">
        <div v-if="searchable" class="px-2 mt-2">
          <v-input v-model="query" :variant="searchInputVariant" />
        </div>
      </slot>
      <slot name="options-slot">
        <ul class="overflow-y-scroll" :class="css.optionsList">
          <li @click="onClick()">
            <span :class="css.optionLabel">
              {{ placeholder }}
            </span>
          </li>
          <li v-for="option in filteredOptions" @mouseover="hoverOption(option)" :key="option[valueOptionAttribute]" @click="onClick(option)" class="cursor-pointer" :class="[isSelectedCss(option)]">
            <div :class="[css.optionLabel, preselectOption.id == option.id ? css.highlighted : '']">
              <span>
                {{ option[textOptionAttribute] }}
              </span>
            </div>
          </li>
          <li v-if="showMore && isAnyPageLeft">
            <div class="flex justify-center">
              <v-button variant="link" @click="filterOptions(true)" class="">{{ $t('showMore') }}</v-button>
            </div>
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>

<script>
import VButton from './VButton';
import VInput from './VInput';
import { reactive } from 'vue';
import VBase from './base.js';

export default {
  extends: VBase,
  setup(props) {
    const innerOptions = reactive(props.options);

    return {
      innerOptions,
    };
  },
  components: {
    'v-button': VButton,
    'v-input': VInput,
  },
  computed: {
    disabledCss() {
      if (this.disabled) {
        return this.css.disabled;
      }

      return '';
    },
    isAnyPageLeft() {
      return !this.meta.last_page || this.meta.current_page < this.meta.last_page;
    },
    computedPlaceholder() {
      let modelType = typeof this.modelValue;
      if (Array.isArray(this.modelValue)) {
        modelType = 'array';
      }

      if (modelType === 'object' && this.modelValue && this.modelValue[this.textOptionAttribute]) {
        return this.modelValue[this.textOptionAttribute];
      }

      if (modelType === 'array') {
        let labels = '';
        for (let i = 0; i < this.modelValue.length; i++) {
          labels += this.modelValue + '-';
        }
        return labels;
      }

      if (['string', 'number'].includes(modelType) && this.modelValue) {
        const placeholderObject = this.filteredOptions.find((obj) => {
          return obj[this.valueOptionAttribute] === this.modelValue;
        });
        if (placeholderObject) {
          return placeholderObject[this.textOptionAttribute];
        }

        return '';
      }

      return this.placeholder;
    },
  },
  watch: {
    modelValue(newValue, oldValue) {
      this.$emit('changed', newValue);
    },
    query(newValue, oldValue) {
      this.filterOptions();
    },
  },
  data() {
    return {
      tag: 'rselect',
      css: {
        wrapper: '',
        arrowCss: '',
        buttonWrapper: '',
        optionsWrapper: '',
        optionLabel: '',
        highlighted: '',
        placeholderWrapper: '',
        selectedOptions: '',
        variant: {
          default: {
            wrapper: 'relative h-10',
            baseCss:
              'peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50',
            placeholderCss: 'text-gray-300',
            selectedCss: 'text-blue-300',
            label:
              "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500",
            arrowCss: 'bg-blue-fb-300  px-2 py-1',
            buttonWrapper: 'flex flex-row items-center border border-gray-300 rounded',
            optionsWrapper: 'absolute z-20 border border-gray-300 w-full text-left bg-white text-gray-800',
            optionLabel: 'px-2 text-gray-800',
            highlighted: 'hover:bg-blue-300 ',
            placeholderWrapper: 'px-2 text-left cursor-pointer',
            selectedCss: 'bg-blue-300',
            disabled: 'bg-gray-300 cursor-default',
          },
          small: {
            wrapper: 'relative h-8 max-w-full ',
            baseCss:
              'peer h-full w-full rounded-[7px] bg-transparent px-1 py-1 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50',
            placeholderCss: 'text-gray-300',
            selectedCss: 'text-blue-300',
            label:
              "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500",
            arrowCss: 'bg-blue-fb-300  px-2 py-1',
            buttonWrapper: 'flex flex-row items-center border border-gray-300 rounded',
            optionsWrapper: 'absolute z-20 border border-gray-300 w-full text-left bg-white text-gray-800',
            optionLabel: 'px-2 text-gray-800',
            highlighted: 'hover:bg-blue-300 ',
            placeholderWrapper: 'px-2 text-left cursor-pointer',
            selectedCss: 'bg-blue-300',
            disabled: 'bg-gray-300 cursor-default',
          },
        },
      },
      showOptions: false,
      query: '',
      filteredOptions: [],
      meta: {
        current_page: 0,
      },
      preselectOption: -1,
    };
  },
  emits: ['changed'],
  methods: {
    hoverOption(option) {
      this.preselectOption = option;
    },
    closeOptions() {
      this.showOptions = false;
    },
    isSelectedCss(option) {
      if (this.modelValue && this.modelValue[this.valueOptionAttribute] && this.modelValue[this.valueOptionAttribute] === option[this.valueOptionAttribute]) {
        return this.css.selectedCss || this.css.selectedOptions; // selectedOptions for compatibility
      }

      return '';
    },
    onClick(option) {
      this.closeOptions();
      const valueToEmit = this.valueOptionAttribute === 'object' ? option : option[this.valueOptionAttribute];
      this.$emit('update:modelValue', valueToEmit);

      // this.query = '';
    },
    onClickShowOptions() {
      this.filterOptions();
      this.openOptions();
    },
    openOptions() {
      this.showOptions = !this.showOptions && !this.disabled;
    },
    filterOptions(nextPage = false) {
      if (this.fetchMethod) {
        if (this.meta && this.meta.current_page && nextPage) {
          //ask the next page .
          this.meta.current_page += 1;
        } else {
          this.meta.current_page = 1;
        }
        this.fetchMethod(this.query, this.meta).then((response) => {
          // this.filteredOptions = this.filteredOptions.concat(response.data);
          this.filteredOptions = response.data;
          this.meta = response.meta;
        });
        return;
      }
      this.filteredOptions = this.queryFilter();
    },
    queryFilter() {
      if (this.query.trim() === '') {
        return this.options;
      }

      return this.options.filter((option) => {
        return option[this.textOptionAttribute].includes(this.query) || this.query.trim() === '';
      });
    },
    reset() {
      this.meta = {
        current_page: 0,
      };

      this.filteredOptions = [];
      this.filterOptions();
    },
  },
  props: {
    fetchMethod: {
      type: Function,
      default: undefined,
    },
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [Array, String, Object, Number],
      default: undefined,
    },
    options: {
      type: Array,
      default: function () {
        return [];
      },
    },
    placeholder: {
      type: String,
      default: 'Select option',
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    searchInputVariant: {
      type: String,
      default: 'default',
    },
    showMore: {
      type: Boolean,
      default: false,
    },
    textOptionAttribute: {
      type: String,
      default: 'text',
    },
    valueOptionAttribute: {
      type: String,
      default: 'value',
    },
  },
};
</script>

<style lang="scss" scoped></style>
