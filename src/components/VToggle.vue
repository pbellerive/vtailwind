<template>
    <span @click="checked = !checked" :class="wrapper">
        <input type="hidden" />
        <span :class="buttonClass"></span>
        <span :class="checkClass"></span>
        <span :class="checkClass"></span>
    </span>
</template>

<script>
import Base from './base';

export default {
    extends: Base,
    props: ['modelValue'],
    emits: ['update:modelValue'],
    computed: {
        checkClass () {
            if (this.checked) {
                return this.css.checkedPlaceholder;
            }

            return this.css.uncheckedPlaceholder;
        },
        buttonClass () {
            if (this.checked) {
                return this.css.buttonChecked;
            }

            return this.css.button;
        },
        wrapper () {
            if (this.checked) {
                return this.css.wrapperChecked;
            }

            return this.css.wrapper;
        }
    },
    watch: {
        checked (newValue, oldValue) {
            this.$emit('update:modelValue', this.checked);
        }
    },
    data () {
        return {
            checked: false,
            tag: 'toggle',
            css: {
                wrapper: 'bg-gray-100 rounded-full border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200',
                wrapperChecked: 'bg-blue-500 rounded-full border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200',
                button: 'inline-block absolute transform translate-x-0 transition ease-in-out duration-200 h-5 w-5 rounded-full bg-red shadow flex items-center justify-center text-gray-400 text-xs',
                uncheckedPlaceholder: 'inline-block rounded-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs',
                checkedPlaceholder: 'inline-block rounded-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs',
                buttonChecked: 'inline-block absolute transform translate-x-full transition ease-in-out duration-200 h-5 w-5 rounded-full bg-white shadow flex items-center justify-center text-blue-500 text-xs'
            }
        };
    },
    created () {
        this.checked = this.modelValue;
    },
    setup (props) {
        return {};
    }
};
</script>

<style lang="scss" scoped>

</style>
