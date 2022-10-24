<template>
    <div v-if="show" :class="css.wrapper" >
        <div :class="[css.innerModal, css.bgCss]" class="-translate-y-1/2">
            <div>
              <div>
                <slot name="title">
                  <h1 :class="css.title">
                    {{title}}
                  </h1>
                </slot>
              </div>
              <div>
                <slot name="message">
                  {{message}}
                </slot>
              </div>
            </div>
            <div :class="css.closeButtonCss">
              <v-button variant="close" @click="show =false">
                  x
              </v-button>
            </div>
            <slot name="footer">
              <div :class="css.footer" class="align-bottom">
                <div class="w-full">
                  <v-button @click="onOkClickButton" variant="primaryFlat">{{yesLabel}}</v-button>
                </div>
                <div>
                  <v-button @click="onCancelClickButton" variant="dangerFlat">{{noLabel}}</v-button>
                </div>
              </div>
            </slot>
        </div>
    </div>
</template>

<script>
import Base from './base';
import VButton from './VButton';
import VMessage from './VMessage';

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
                wrapper: 'fixed min-h-full bg-gray-300 z-50 top-0 left-0 bg-opacity-25',
                closeButtonCss: 'flex-1 flex absolute -top-2 -right-2',
                bgCss: '',
                disabledBgCss: '',
                variant: {
                    default: {
                        wrapper: 'fixed flex justify-center w-full min-h-full bg-gray-300 z-50 top-0 left-0 bg-opacity-50',
                        innerModal: 'absolute top-1/2 transform -translate-y-1/2 mt-5 self-start',
                        closeButtonCss: 'flex-1 flex absolute -top-2 -right-2',
                        bgCss: 'bg-white',
                        disabledBgCss: '',
                        title: 'font-bold my-5',
                        footer: 'mt-3 md:mt-5 grid grid-cols-2'
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
        },
        onOkClickButton() {
          this.close();
          this.$emit('click-Ok-button');
        },
        onCancelClickButton() {
          this.close();
          this.$emit('click-cancel-button');
        }
    },
    props: {
      message: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: 'my title'
      },
      messageVariant: {
        type: String
      },
      yesLabel: {
        type: String,
        default: 'OK'
      },
      noLabel: {
        type: String,
        default: 'CANCEL'
      }
    },

};
</script>

<style lang="scss" scoped>

</style>
