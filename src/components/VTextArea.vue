<template>
    <div class="wrapperCss">
        <textarea :value="modelValue" :cols="cols" :rows="rows" :required="required" :class="[css.baseCss]" @input="onInput"></textarea>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tag: 'text-area',
            css: {
                baseCss: 'border border-gray-300',
                wrapperCss: ''
            }
        };
    },
    props: {
        cols: {
            type: [String, Number]
        },
        rows: {
            type: [String, Number],
            default: 5
        },
        modelValue: {
            type: String
        },
        required: {
            type: Boolean,
            default: false
        }
    },
    $emits: ['update:modelValue'],
    methods: {
        onInput(evt) {
            this.$emit('update:modelValue', evt.target.value);
        }
    },
    setup () {
        return {};
    }
};
</script>

<style lang="scss" scoped>

</style>
