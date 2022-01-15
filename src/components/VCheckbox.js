import { defineComponent, h } from 'vue';
import Base from './base.js';

const VCheckbox = defineComponent({
    extends: Base,
    data () {
        return {
            tag: 'checkbox',
            css: {
                baseCss: 'border-2 border-gray-200 rounded px-2 focus:outline-none focus:ring-2 focus:ring-blue-300'
            }
        };
    },
    computed: {
    },
    methods: {
        isChecked () {
            const input = this.$refs.checkbox;
            return input.checked;
        },
        toggleValue () {
            let tempValue;
            if (Array.isArray(this.modelValue)) {
                tempValue = this.toggleArrayValue([...this.modelValue]);
            } else {
                tempValue = this.toggleNativeValue(this.modelValue);
            }
            return tempValue;
        },
        toggleArrayValue (tempValue) {
            const index = tempValue.indexOf(this.value);

            if (this.isChecked() && index < 0) {
                tempValue.push(this.value);
            } else if (!this.isChecked() && index >= 0) {
                tempValue.splice(index, 1);
            }

            return tempValue;
        },
        toggleNativeValue (tempValue) {
            if (this.isChecked()) {
                return this.value;
            } else {
                return undefined;
            }
        }
    },
    props: {
        modelValue: {
            default: ''
        },
        value: {
            type: [String, Number, Boolean, Array, Object],
            default: false
        },
        type: {
            default: 'text'
        },
        checked: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue'],
    render () {
        return h(
            'Input',
            {
                ref: 'checkbox',
                class: this.css.baseCss,
                value: this.value,
                checked: this.checked,
                disabled: this.disabled,
                type: 'checkbox',
                onChange: $event => {
                    const tempValue = this.toggleValue();
                    this.$emit('update:modelValue', tempValue);
                }
            }
        );
    }
});

export default VCheckbox;
