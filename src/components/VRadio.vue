<template>
    <div class="flex items-center" :class="wrapperLeftCss">
        <input v-model="innerValue" type="radio" ref="radio" :value="value" :checked="checked" @change="onChange" :class="[css.baseCss]" :disabled="disabled"/>
        <span :class="labelPositionCss">{{label}}</span>
    </div>
</template>

<script>
import VBase from './base.js';

export default {
    extends: VBase,
    setup () {
        return {};
    },
    data () {
        return {
            tag: 'radio',
            css: {
                baseCss: 'border-2 border-gray-200 rounded px-2 focus:outline-none focus:ring-2 focus:ring-blue-300',
                labelRightCss: 'ml-2',
                labelLeftCss: 'mr-2',
                wrapperLabelLeft: 'flex-row-reverse',
                variant: {

                }
            },
            innerValue: undefined
        };
    },
    watch: {
        modelValue (newValue) {
            this.innerValue = this.modelValue;
        }
    },
    computed: {
        wrapperLeftCss () {
            if (this.labelPosition === 'left') {
                return this.css.wrapperLabelLeft;
            }
            return '';
        },
        labelPositionCss () {
            let css = this.css.labelRightCss;

            if (this.labelPosition === 'left') {
                css = this.css.labelLeftCss;
            }

            return css;
        }
    },
    methods: {
        onChange ($event) {
            this.$emit('update:modelValue', this.value);
        }
    },
    props: {
        labelPosition: {
            type: String,
            default: 'right'
        },
        checked: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: ''
        },
        modelValue: {
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        value: {
            type: [String, Number, Boolean, Array, Object],
            default: false
        }
    },
    emits: ['update:modelValue']
};
</script>

<style lang="scss" scoped>

</style>
