<template>
  <div :class="[css.bgCss, css.wrapper]" @click="close">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Base from './base';
import VButton from './VButton.vue';

export default {
    components: {
        'v-button': VButton
    },
    extends: Base,
    props: {
        autoClose: {
            type: Boolean,
            default: true
        }
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
                    }
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
    }
};
</script>

<style lang="scss" scoped></style>
