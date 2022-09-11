<template>
  <div :class="[css.wrapper]">
    <div :class="css.buttonWrapper">
      <div @click="onClickShowOptions"  :class="css.placeholderWrapper">
        <span class="mr-2">
          {{computedPlaceholder}}
        </span>
      </div>
      <div @click="onClickShowOptions" class="flex flex-1 justify-end cursor-pointer">
        <!-- font-awesome -->
        <div :class="css.arrowCss">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" class="w-4" role="img"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path fill="currentColor"
              d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z">
            </path>
          </svg>
        </div>
      </div>
    </div>
    <div v-if="showOptions" :class="css.optionsWrapper">
      <slot name="options-search">
        <div v-if="searchable" class="px-2 mt-2">
          <v-input v-model="query" />
        </div>
      </slot>
      <slot name="options-slot">
        <ul class="overflow-y-scroll max-h-20">
          <li @click="onClick(undefined)">
            <span :class="css.optionLabel">
              {{placeholder}}
            </span>
          </li>
          <li v-for="option in filteredOptions" :key="option[valueOptionAttribute]" @click="onClick(option)"
            class="cursor-pointer" :class="[isSelectedCss(option)]">
            <span :class="css.optionLabel">
              {{option[textOptionAttribute]}}
            </span>
          </li>
          <li v-if="showMore && isAnyPageLeft">
            <div class="flex justify-center">
              <v-button variant="link" @click="filterOptions" class="">{{$t('showMore')}}</v-button>
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
    mounted () {
        this.filterOptions();
    },
    components: {
        'v-button': VButton,
        'v-input': VInput
    },
    computed: {
        isAnyPageLeft() {
            return  !this.meta.last_page || (this.meta.current_page < this.meta.last_page);
        },
        computedPlaceholder() {
            let modelType = typeof this.modelValue;
            if (Array.isArray(this.modelValue)) {
                modelType = 'array';
            }

            if (modelType === 'object' && this.modelValue[this.textOptionAttribute]) {
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
                const placeholderObject = _.find(this.filteredOptions, (obj) => {
                    return obj[this.valueOptionAttribute] === this.modelValue;
                })
                if (placeholderObject) {
                    return placeholderObject[this.textOptionAttribute];
                }

                return '';
            }

            return this.placeholder;
        }
    },
    watch: {
      modelValue(newValue, oldValue) {
          this.$emit('changed', newValue);
      }
    },
    data() {
        return {
            tag: 'rselect',
            css: {
                wrapper: 'relative inline-block',
                arrowCss: 'bg-blue-fb-300 rounded px-2 py-1',
                buttonWrapper: 'flex flex-row items-center border border-gray-300 rounded',
                optionsWrapper: 'absolute z-20 border border-gray-300 w-full text-left bg-white text-gray-800',
                optionLabel: 'px-2 hover:bg-blue-300 text-gray-800',
                placeholderWrapper: 'px-2 text-left',
                selectedOptions: 'bg-blue-300',
                variant: {
                    default: {
                        wrapper: 'relative',
                        arrowCss: 'bg-blue-fb-300 rounded px-2 py-1',
                        buttonWrapper: 'flex flex-row items-center border border-gray-300 rounded',
                        optionsWrapper: 'absolute z-20 border border-gray-300 w-full text-left bg-white text-gray-800',
                        optionLabel: 'px-2 hover:bg-blue-300 text-gray-800',
                        placeholderWrapper: 'px-2 text-left cursor-pointer',
                        selectedOptions: 'bg-blue-300',
                    }
                }
            },
            showOptions: false,
            query: '',
            filteredOptions: [],
            meta: {
                current_page: 0
            }
        };
    },
    emits: ['changed'],
    methods: {
        closeOptions() {
            this.showOptions = false;
        },
        isSelectedCss(option) {
            if (this.modelValue && this.modelValue[this.valueOptionAttribute] && this.modelValue[this.valueOptionAttribute]  === option[this.valueOptionAttribute] ) {
                return this.css.selectedOptions;
            }

            return '';
        },
        onClick(option) {
            this.query = '';
            this.closeOptions();
            const valueToEmit = this.valueOptionAttribute === 'object' ? option : option[this.valueOptionAttribute];
            this.$emit('update:modelValue', valueToEmit);
        },
        onClickShowOptions() {
            this.showOptions = !this.showOptions && !this.disabled;
        },
        openOptions() {
            this.showOptions = true;
        },
        async filterOptions() {
            /**
             * current_page: 1
                from: 1
                last_page: 2
                links: (4) [{…}, {…}, {…}, {…}]
                path: "http://px.test/api/projects"
                per_page: 15
                to: 15
                total: 21
             */
            if (this.fetchMethod && this.isAnyPageLeft) {
                let { data, meta } = await this.getFilterPromise();
                this.filteredOptions = this.filteredOptions.concat(data);
                this.meta = meta;

                return;
            }

            this.filteredOptions = this.queryFilter();
        },
        queryFilter() {
            if (this.query.trim() === '') {
                return this.options;
            }

            return this.options.filter(option => {
                return option[this.textOptionAttribute].includes(this.query) || this.query.trim() === '';
            });
        },
        reset() {
            this.meta = {
                current_page: 0
            }

            this.filteredOptions = [];
            this.filterOptions();
        },
        getFilterPromise() {
            const page = this.meta.current_page + 1;
            return Promise.resolve(this.fetchMethod(page, this.query));
        }
    },
    props: {
        fetchMethod: {
            type: Function,
            default: undefined
        },
        modelValue: {
            type: [Array, String, Object, Number],
            default: undefined
        },
        options: {
            type: Array,
            default: function() {
                return [];
            }
        },
        placeholder: {
            type: String,
            default: 'Select option'
        },
        searchable: {
            type: Boolean,
            default: false
        },
        showMore: {
            type: Boolean,
            default: false
        },
        textOptionAttribute: {
            type: String,
            default: 'text'
        },
        valueOptionAttribute: {
            type: String,
            default: 'value'
        },

    },
    setup (props) {
        const innerOptions = reactive(props.options);

        return {
            innerOptions
        };
    }
};
</script>

<style lang="scss" scoped>
</style>