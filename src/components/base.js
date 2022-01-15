import { defineComponent } from 'vue';

const Base = defineComponent({
    data () {
        return {
            tag: '',
            css: {
                // baseCss: 'border-2 border-blue-200 rounded'
            },
            innerCss: {}
        };
    },
    props: {
        modelValue: {},
        variant: {},
        disabled: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue'],
    methods: {
        getCssVariant() {
            if (this.variant && this.css[this.variant]) {
                return this.css[this.variant];
            }

            return this.css;
        }
    },
    created () {
        if (this.$vUiSettings && this.$vUiSettings[this.tag]) {
            this.css = this.$vUiSettings[this.tag].css;
        }

        this.innerCss = this.getCssVariant();
    }
});

export default Base;
