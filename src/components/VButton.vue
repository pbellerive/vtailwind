<template>
    <div :class="css.wrapper">
        <router-link v-if="to" :to="to" :class="[css.baseCss, css.bgCss]" :disabled="disabled" >
            <span class="text-center">
                <slot></slot>
            </span>
        </router-link>
        <button v-else :class="[css.baseCss, css.bgCss]" :disabled="disabled">
            <span class="text-center">
                <slot></slot>
            </span>
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
                wrapper: 'inline',
                baseCss: 'p-2 md:p-3 border-2 rounded rounded-sm',
                bgCss: 'bg-white',
                disabledBgCss: 'bg-gray-200',
                variant: {
                    default: {
                        wrapper: 'inline',
                        baseCss: 'p-2 md:p-3 border-2 rounded rounded-sm',
                        bgCss: 'bg-white',
                        disabledBgCss: 'bg-gray-200',
                    },
                    danger: {
                        bgCss: 'bg-red-600 hover:bg-red-700 text-white'
                    },
                    info: {
                        bgCss: 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                    },
                    primary: {
                        bgCss: 'bg-blue-fb-600 hover:bg-blue-fb-700 text-white'
                    },
                    secondary: {
                        bgCss: 'bg-blue-fb-100 hover:bg-blue-fb-200 text-gray-900'
                    },
                    success: {
                        bgCss: 'bg-green-fg-500 hover:bg-green-fg-600 text-white'
                    },
                    warning: {
                        bgCss: 'bg-yellow-fy-300 hover:bg-yellow-fy-400 text-gray-900'
                    },
                    link: {
                        baseCss: 'border-none hover:text-blue-fb-500 text-center'
                    },
                    editor: {
                        wrapper:'',
                        baseCss: 'border border-gray-50 text-gray-600'
                    },
                    close: {
                        wrapper:'',
                        baseCss: 'border border-red-50 text-white bg-red-900 px-3 py-2 rounded-sm'
                    }
                }
            }
        };
    },
    props: {
        to: {
            type: String,
            default: undefined
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
