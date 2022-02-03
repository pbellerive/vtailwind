<template>
    <div>
        <button :class="[css.baseCss, bgCss]" :disabled="disabled">
            <slot></slot>
        </button>

    </div>
</template>

<script>
import Base from './base';

export default {
    extends: Base,
    computed: {
        bgCss () {
            if (this.disabled) {
                return this.css.disabledBgCss;
            }

            if (this.variant === 'base' || this.variant.trim() === '') {
                return this.css.bgCss;
            }

            return this.css.variant[this.variant];
        }
    },
    data () {
        return {
            tag: 'button',
            css: {
                baseCss: 'px-2 py-1 border-2 rounded border-gray-300 hover:border-blue-300',
                bgCss: 'bg-white',
                disabledBgCss: 'bg-gray-200',
                variant: {
                    danger: 'bg-red-500',
                    primary: 'bg-blue-500',
                    warning: 'bg-yellow-500'
                }
            }
        };
    },
    props: {
        variant: {
            type: String,
            default: 'base'
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
