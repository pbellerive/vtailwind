<template>
    <div :class="css.wrapper">
        <router-link v-if="to" :to="to" :class="[css.baseCss, css.bgCss]" :disabled="disabled" >
            <span class="text-center">
                <slot></slot>
            </span>
        </router-link>
        <button v-else :class="[css.baseCss, bgCss]" :disabled="disabled">
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
                wrapper: 'inline-block',
                baseCss: 'p-2 md:p-3 border-2 rounded rounded-sm',
                bgCss: 'bg-white',
                disabledBgCss: 'bg-gray-200',
                variant: {
                    default: {
                        wrapper: 'inline-block',
                        // baseCss: 'p-2 md:p-3 border-2 rounded rounded-sm text-black',
                        baseCss: 'middle none center rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-black shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
                        bgCss: 'bg-white',
                        disabledBgCss: 'bg-gray-200',
                    },
                    primary: {
                        baseCss: 'middle none center rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-black shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
                        bgCss: 'bg-blue-600 hover:bg-blue-700 text-white'
                    },
                    secondary: {
                        baseCss: 'middle none center rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-black shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
                        bgCss: 'bg-blue-100 hover:bg-blue-200 text-gray-900'
                    },
                    danger: {
                        baseCss: 'middle none center rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-black shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
                        bgCss: 'bg-red-600 hover:bg-red-700 text-black'
                    },
                    warning: {
                        baseCss: 'middle none center rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-black shadow-md shadow-yellow-500/20 transition-all hover:shadow-lg hover:shadow-yellow-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
                        bgCss: 'bg-yellow-300 hover:bg-yellow-400 text-gray-900'
                    },
                    success: {
                        baseCss: 'middle none center rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-black shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
                        bgCss: 'bg-green-fg-500 hover:bg-green-fg-600 text-black'
                    },
                    dangerFlat: {
                      wrapper: 'inline ',
                      baseCss: 'w-full p-2 md:p-3 rounded-none text-black',
                      bgCss: 'bg-red-600 hover:bg-red-700 text-black',
                    },
                    info: {
                        bgCss: 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                    },
                   
                    primaryFlat: {
                      wrapper: 'inline w-full',
                      baseCss: 'w-full p-2 md:p-3 rounded-none text-black',
                      bgCss: 'bg-blue-600 hover:bg-blue-700 text-black'
                    },
                    link: {
                        baseCss: 'border-none hover:text-blue-500 text-center'
                    },
                    editor: {
                        wrapper:'',
                        baseCss: 'border border-gray-50 text-gray-600'
                    },
                    close: {
                        wrapper:'',
                        baseCss: 'border border-red-50 text-white bg-red-700 px-3 py-2 rounded-sm'
                    },
                    closeRounded: {
                        baseCss: 'w-8 h-8 border border-red-50 text-white bg-red-700 rounded-full'
                    },
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
