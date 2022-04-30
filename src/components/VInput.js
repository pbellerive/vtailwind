import { defineComponent, h } from 'vue';
import Base from './base.js';

const VInput = defineComponent({
    extends: Base,
    data () {
        return {
            tag: 'input',
            css: {
                baseCss: 'border-2 border-gray-200 rounded px-2 focus:outline-none focus:ring-2 focus:ring-blue-300 max-w-full',
                bgCss: 'bg-blue-200',
                variant: {
                    danger: {
                        baseCss: 'border-2 border-red-200 rounded px-2 focus:outline-none focus:ring-2 focus:ring-red-300 max-w-full',
                        bgCss: 'bg-red-100'
                    }
                }
            }
        };
    },
    props: {
        modelValue: {
            default: ''
        },
        type: {
            default: 'text'
        }
    },
    emits: ['update:modelValue'],
    render () {
        return h(
            'Input',
            {
                class: this.css.baseCss + ' ' + this.css.bgCss,
                value: this.modelValue,
                disabled: this.disabled,
                type: this.type,
                onInput: $event => this.$emit('update:modelValue', $event.target.value)
            }
        );
    }
});

export default VInput;
