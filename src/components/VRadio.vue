<script>
import VBase from './base.js';

export default {
    extends: VBase,
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
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue'],
    setup() {
        const _radio = ref(null);
        return {
            _radio
        };
    },
    data() {
        return {
            tag: 'radio',
            css: {
                baseCss: 'border-2 border-gray-200 rounded px-2 focus:outline-none focus:ring-2 focus:ring-blue-300',
                labelRightCss: 'ml-2',
                labelLeftCss: 'mr-2',
                wrapperLabelLeft: 'flex-row-reverse',
                variant: {}
            },
            innerValue: undefined
        };
    },
    computed: {
        isChecked() {
            return this.value === this.modelValue;
        },
        wrapperLeftCss() {
            if (this.labelPosition === 'left') {
                return this.css.wrapperLabelLeft;
            }
            return '';
        },
        labelPositionCss() {
            let css = this.css.labelRightCss;

            if (this.labelPosition === 'left') {
                css = this.css.labelLeftCss;
            }

            return css;
        }
    },
    watch: {
        modelValue: (_newValue, _oldValue) => {
            this.innerValue = this.modelValue;
        }
    },
    mounted() {
        this.innerValue = this.modelValue;
    },
    methods: {
        onChange: (_event) => {
            this.$emit('update:modelValue', this.value);
        }
    }
};
</script>

<template>
  <div class="flex items-center" :class="wrapperLeftCss">
    <input
      ref="_radio"
      v-model="innerValue"
      type="radio"
      :value="value"
      :checked="isChecked"
      :class="[css.baseCss]"
      :disabled="disabled"
      @change="onChange" />
    <span :class="labelPositionCss">{{ label }}</span>
  </div>
</template>
