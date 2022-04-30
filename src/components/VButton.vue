<template>
    <div :class="css.wrapper">
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

            return this.css.bgCss;
        }
    },
    data () {
        return {
            tag: 'button',
            css: {
                wrapper: '',
                baseCss: 'px-2 py-1 border-2 rounded border-gray-300 hover:border-blue-300',
                bgCss: 'bg-white',
                disabledBgCss: 'bg-gray-200',
                variant: {
                    danger: {
                        // wrapper: '',
                        // baseCss: 'px-2 py-1 border-2 rounded border-gray-300 hover:border-blue-300',
                        bgCss: 'bg-red-500'
                        // disabledBgCss: 'bg-gray-200',
                    },
                    primary: {
                        bgCss: 'bg-blue-500'
                    },
                    warning: {
                        bgCss: 'bg-yellow-500'
                    }
                }
            }
        };
    }
};
</script>

<style lang="scss" scoped>

</style>
