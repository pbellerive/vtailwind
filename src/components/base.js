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
    props: ['modelValue'],
    emits: ['update:modelValue'],
    created () {
        if (this.$vUiSettings[this.tag]) {
            this.css = this.$vUiSettings[this.tag].css;
        }
    }
});

export default Base;
