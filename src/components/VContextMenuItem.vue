<template>
    <div @click="close" :class="[css.bgCss, css.wrapper]">
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Base from './base';
import VButton from './VButton';

export default {
    extends: Base,
    components: {
        'v-button': VButton,
    },
    data() {
        return {
            show: false,
            tag: 'modal',
            css: {
                wrapper: 'py-3',
                bgCss: 'bg-slate-700 text-white',
                disabledBgCss: '',
                variant: {
                    danger: {
                        bgCss: 'bg-red-600 hover:bg-red-700 text-white'
                    },

                }
            }
        };
    },
    methods: {
        close() {
            if (this.autoClose) {
                this.$parent.close();
            }
        }
    },
    props: {
        autoClose: {
            type: Boolean,
            default: true
        },
    },

};
</script>

<style lang="scss" scoped>
</style>
