<template>
    <select :value="modelValue" @change="onChange" :class="[css.selectCss]" :disabled="disabled">
        <option v-if="placeholder" value="undefined"  :class="css.placeholderCss">
            <span>
                {{placeholder}}
            </span>
        </option>
        <option v-for="option in options" :class="css.optionCss" :key="option.value" :value="option[valueOptionAttribute]">
            <span>
                {{option[textOptionAttribute]}}
            </span>
        </option>
    </select>
</template>

<script>
import VBase from './base';

export default {
    extends: VBase,
    data () {
        return {
            tag: 'select',
            css: {
                selectCss: 'text-gray-500 px-3 py-1 bg-white border-2 border-gray-200 rounded focus:border-blue-300',
                placeholderCss: 'text-gray-300',
                optionCss: 'text-gray-500'
            }
        };
    },
    setup () {
        return {

        };
    },
    $emit: ['update:modelValue'],
    methods: {
        onChange (evt) {
            this.$emit('update:modelValue', evt.target.value);
        }
    },
    props: {
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
