<template>
    <div :class="css.wrapper">
        <div v-if="label" :class="css.label">
            <span>
                {{label}}
            </span>
        </div>
        <select :value="modelValue" @change="onChange" :class="[css.baseCss]" :disabled="disabled">
            <option v-if="placeholder" value="undefined" :class="css.placeholderCss">
                <span>
                    {{placeholder}}
                </span>
            </option>
            <option v-for="option in options" :class="optionClass(option[valueOptionAttribute])" :key="option.value"
                :value="option[valueOptionAttribute]">
                <span>
                    {{option[textOptionAttribute]}}
                </span>
            </option>
        </select>
    </div>
</template>

<script>
import VBase from './base';

export default {
    extends: VBase,
    data () {
        return {
            tag: 'select',
            css: {
                wrapper: '',
                baseCss: 'bg-white text-black border border-gray-200 rounded rounded-sm px-4 py-1 focus:outline-none focus:ring-1 focus:ring-blue-fb-300 w-full max-w-full text-gray-500',
                placeholderCss: 'text-gray-300',
                optionCss: 'text-gray-900 bg-white',
                selectedCss: "text-blue-fb-300",
                variant: {
                    default: {
                        wrapper: '',
                        baseCss: 'bg-white border border-gray-200 rounded rounded-sm px-4 py-1 focus:outline-none focus:ring-1 focus:ring-blue-fb-300 w-full max-w-full text-gray-500',
                        placeholderCss: 'text-gray-300',
                        optionCss: 'text-gray-900 bg-white',
                        selectedCss: "text-blue-fb-300",
                    },
                    success: {
                        baseCss: 'bg-green-fg-50 border border-green-fg-500 rounded rounded-sm px-4 py-1 focus:outline-none focus:ring-1 focus:ring-green-fg-500 w-full max-w-full font-robotoBold font-bold text-green-fg-500',
                        label: 'text-left text-red-500 font-bold',
                    },
                    primary: {
                        baseCss: 'bg-blue-fb-50 border border-blue-fb-500 rounded rounded-sm px-4 py-1 focus:outline-none focus:ring-1 focus:ring-blue-fb-500 w-full max-w-full font-robotoBold font-bold text-blue-fb-500',
                        label: 'text-left text-red-500 font-bold',
                    },
                    danger: {
                        baseCss: 'bg-red-50 border border-red-500 rounded rounded-sm px-4 py-1 focus:outline-none focus:ring-1 focus:ring-red-500 w-full max-w-full text-red-500',
                        label: 'text-left text-red-500 font-bold',
                        error: 'text-left text-red-500 font-bold',
                        shortError: 'bg-red-500 text-white font-bold text-center ml-1 md:ml-3 rounded rounded-md px-3',
                        shortErrorArrow: 'border-transparent   w-0 h-0 border-t-[10px] border-b-[10px] border border-r-[10px] border-r-red-500 absolute -left-2 top-1/2 -translate-y-1/2'
                    }
                }
            }
        };
    },
    setup () {
        return {

        };
    },
    $emit: ['update:modelValue'],
    methods: {
        /// pas de v-model ceci n<est pas reactif
        optionClass(value) {
            if (this.isSelected(value)) {
                return  this.css.selectedCss
            }

            return this.css.optionCss;
        },
        isSelected(value) {
            return value == this.modelValue;
        },
        onChange (evt) {
            this.$emit('update:modelValue', evt.target.value);
        }
    },
    props: {
        label: {
            type: String,
            default: undefined
        },
        modelValue: {
            type: [String, Number]
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
            default () {
                return [];
            }
        },
        placeholder: {
            type: String,
            default: undefined
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
