import { defineComponent, h } from 'vue';
import Base from './base.js';

const VInput = defineComponent({
    extends: Base,
    data () {
        return {
            tag: 'input',
            css: {
                baseCss: 'border-2 border-gray-200 rounded px-2 focus:outline-none focus:ring-2 focus:ring-blue-300 max-w-full'
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
                class: this.css.baseCss,
                value: this.modelValue,
                type: this.type,
                onInput: $event => this.$emit('update:modelValue', $event.target.value)

            }
        );
    }
});

export default VInput;
