import { defineComponent } from 'vue';

const Base = defineComponent({
  data() {
    return {
      tag: '',
      css: {
        // baseCss: 'border-2 border-blue-200 rounded'
        variant: {
          default: {},
        },
      },
    };
  },
  props: {
    modelValue: {},
    variant: {
      type: String,
      default: 'default',
    },
    dataTestId: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    getCssVariant() {
      if (this.variant && this.css.variant && this.css.variant[this.variant]) {
        return this.css.variant[this.variant];
      }
      return this.css.variant.default || this.css;
    },
    loadVariant() {
      if (this.$vUiSettings && this.$vUiSettings[this.tag]) {
        this.css.variant = {
          ...this.css.variant,
          ...this.$vUiSettings[this.tag].css.variant,
        };
      }

      // // this.innerCss = this.getCssVariant();
      // if (this.variant !== 'base' && this.variant.trim() !== '') {
      const variant = this.getCssVariant();

      for (const i in variant) {
        this.css[i] = variant[i];
      }
      // }
    },
  },
  created() {
    this.loadVariant();
  },
  watch: {
    variant() {
      this.loadVariant();
    },
  },
});

export default Base;
