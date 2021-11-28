<template>
    <div class="relative inline-block" :class="[css.wrapper]">
        <div :class="css.buttonWrapper">
            <div class="w-full text-left">
                <span class="mr-2">
                {{computedPlaceholder}}
                </span>
            </div>
            <div @click="showOptions = !showOptions" class="flex justify-end cursor-pointer">
                <!-- font-awesome -->
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" class="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>
            </div>
        </div>
        <div v-if="showOptions" :class="css.optionsWrapper">
            <slot name="options-search">
                <div v-if="searchable" class="px-2 mt-2">
                    <v-input v-model="query"/>
                </div>
            </slot>
            <slot name="options-slot">
                <ul>
                    <li @click="onClick(undefined)">
                       <span :class="css.optionLabel">
                        {{placeholder}}
                       </span>

                    </li>
                    <li v-for="option in getFilteredOptions()" :key="option.value" @click="onClick(option)" class="cursor-pointer" :class="[isSelectedCss(option)]">
                        <span :class="css.optionLabel">
                            {{option.text}}
                        </span>
                    </li>
                </ul>
            </slot>
        </div>
    </div>
</template>

<script>
import VInput from './VInput';
import { reactive } from 'vue';

export default {
    components: {
        'v-input': VInput
    },
    computed: {
        computedPlaceholder() {
            let modelType = typeof this.modelValue;
            if (Array.isArray(this.modelValue)) {
                modelType = 'array';
            }

            if (modelType === 'object' && this.modelValue.text) {
                return this.modelValue.text;
            }

            if (modelType === 'array') {
                let labels = '';
                for (let i = 0; i < this.modelValue.length; i++) {
                    labels += this.modelValue + '-';
                }
                return labels;
            }

            if (modelType in ['string', 'number'] && this.modelValue) {
                return this.modelValue;
            }

            return this.placeholder;
        }
    },
    data() {
        return {
            css: {
                wrapper: 'relative border border-gray-300 rounded w-48',
                buttonWrapper: 'flex flex-row items-center px-2 w-full',
                optionsWrapper: 'absolute z-20 border border-gray-300 w-full text-left bg-white',
                optionLabel: 'px-2',
                selectedOptions: 'bg-blue-300'
            },
            showOptions: false,
            query: ''
        };
    },
    $emits: ['update:modelValue'],
    methods: {
        closeOptions() {
            this.showOptions = false;
        },
        isSelectedCss(option) {
            if (this.modelValue.value && this.modelValue.value === option.value) {
                return this.css.selectedOptions;
            }

            return '';
        },
        onClick(option) {
            this.query = '';
            this.closeOptions();
            this.$emit('update:modelValue', option);
        },
        openOptions() {
            this.showOptions = true;
        },
        getFilteredOptions() {
            if (this.fetchMethod) {
                return this.fetch();
            }

            return this.filterOptions();
        },
        filterOptions() {
            if (this.query.trim() === '') {
                return this.options;
            }

            return this.options.filter(option => {
                return option.text.includes(this.query) || this.query.trim() === '';
            });
        },
        fetch() {
            return this.fetchMethod(this.query);
        }
    },
    props: {
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
        fetchMethod: {
            type: Function,
            default: undefined
        }

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
