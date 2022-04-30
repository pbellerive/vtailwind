import { defineComponent } from 'vue';

const Base = defineComponent({
    data () {
        return {
            tag: '',
            css: {
                // baseCss: 'border-2 border-blue-200 rounded'
            }
        };
    },
    props: {
        modelValue: {},
        variant: {
            type: String,
            default: 'base'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue'],
    methods: {
        getCssVariant() {
            if (this.variant && this.css.variant && this.css.variant[this.variant]) {
                return this.css.variant[this.variant];
            }

            return this.css;
        }
    },
    created () {
        if (this.$vUiSettings && this.$vUiSettings[this.tag]) {
            this.css = this.$vUiSettings[this.tag].css;
        }

        // // this.innerCss = this.getCssVariant();
        debugger;
        if (this.variant !== 'base' && this.variant.trim() !== '') {
            const variant = this.getCssVariant();
            for (const i in variant) {
                this.css[i] = variant[i];
            }
        }
    }
});

export default Base;
