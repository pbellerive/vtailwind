<template>
    <div v-if="show" :class="css.wrapper">
        <div class="flex flex-col relative ">
            <div>
                <v-message :variant="messageVariant" :show="showMessage" :message="message">
                </v-message>
            </div>
            <div :class="css.closeButtonCss">
            <v-button variant="close" @click="show =false">
                x
            </v-button>
            </div>
            <slot></slot>
        </div>

    </div>
</template>

<script>
import Base from './base';
import VButton from './VButton';
import VMessage from '../ui/VMessage';

export default {
    extends: Base,
    setup() {
        return {
        };
    },
    components: {
        'v-button': VButton,
        'v-message': VMessage
    },
    data () {
        return {
            show: false,
            tag: 'modal',
            css: {
                wrapper: 'fixed w-full min-h-full bg-gray-100 z-50 top-0 left-0 bg-opacity-50 p-6',
                closeButtonCss: 'flex-1 flex absolute -top-2 -right-2',
                bgCss: '',
                disabledBgCss: '',
                variant: {
                    default: {
                        wrapper: 'fixed w-full min-h-full bg-gray-100 z-50 top-0 left-0 bg-opacity-50 p-6',
                        closeButtonCss: 'flex-1 flex absolute -top-2 -right-2',
                        bgCss: '',
                        disabledBgCss: '',
                    },
                    danger: {
                        bgCss: 'bg-red-600 hover:bg-red-700 text-white'
                    },

                }
            }
        };
    },
    methods: {
        open() {
            this.show = true;
        },
        close() {
            this.show = false;
        }
    },
    props: {
      message: {
        type: Number,
        default: ''
      },
      showMessage: {
        type: Boolean,
        default: false,
      },
      messageVariant: {
        type: String
      }
    },

};
</script>

<style lang="scss" scoped>

</style>
