import { defineComponent, h } from 'vue';
import Base from './base.js';

const VInput = defineComponent({
    extends: Base,
    data () {
        return {
            tag: 'input',
            css: {
                baseCss: 'border-2 border-blue-200 rounded'
            }
        };
    },
    props: ['modelValue'],
    emits: ['update:modelValue'],
    render () {
        return h(
            'Input', // tag name
            {
                class: this.css.baseCss,
                value: this.modelValue,
                onInput: $event => this.$emit('update:modelValue', $event.target.value)

            } // props/attributes
            // this.$slots.default() // array of children
        );
    }
});

export default VInput;
