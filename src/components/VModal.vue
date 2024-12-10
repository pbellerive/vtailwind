<template>
  <div
    v-if="show"
    :class="css.wrapper"
    class="z-40"
    @click="onCancelClickButton">
    <div :class="[css.innerModal, css.bgCss]" class="z-50" @click.stop="">
      <div>
        <div v-if="showTitle" class="max-w-xs md:max-w-lg">
          <slot name="title">
            <p :class="css.title">
              {{ title }}
            </p>
          </slot>
        </div>
        <div :class="css.message">
          <slot name="message">
            <span>
              {{ message }}
            </span>
          </slot>
        </div>
      </div>
      <div :class="css.closeButtonDiv">
        <div :class="css.closeButtonCss">
          <v-button variant="closeRounded" @click="show = false"> x </v-button>
        </div>
      </div>
      <slot v-if="showFooter" name="footer">
        <div :class="css.footer">
          <div>
            <v-button variant="elevatedPrimary" @click="onOkClickButton">{{ yesLabel }}</v-button>
          </div>
          <div>
            <v-button variant="elevatedDanger" @click="onCancelClickButton">{{ noLabel }}</v-button>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import Base from './base';
import VButton from './VButton.vue';
import VMessage from './VMessage.vue';

export default {
    components: {
        'v-button': VButton,
        'v-message': VMessage
    },
    extends: Base,
    props: {
        message: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: 'my titlemy titlemy titlemy titlemy titlemy titlemy title'
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
        },
        yesButtonVariant: {
            type: String,
            default: 'primaryFlat'
        },
        noButtonVariant: {
            type: String,
            default: 'dangerFlat'
        },
        closeButtonVariant: {
            type: String,
            default: 'closeRounded'
        },
        showFooter: {
            type: Boolean,
            default: true
        },
        showTitle: {
            type: Boolean,
            default: true
        }
    },
    emits: ['click-Ok-button', 'click-cancel-button'],
    setup() {
        return {};
    },
    data() {
        return {
            show: false,
            tag: 'modal',
            css: {
                wrapper: '',
                closeButtonCss: '',
                bgCss: '',
                disabledBgCss: '',
                variant: {
                    default: {
                        bgCss: 'bg-white',
                        closeButtonDiv: 'flex-1 flex absolute -top-2 -right-2',
                        closeButtonCss: '',
                        footer: 'flex shrink-0 flex-wrap items-center justify-end p-4 text-blue-gray-500 gap-1',
                        innerModal: 'relative m-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl',
                        message: 'relative border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 p-4 font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased',
                        title: 'flex shrink-0 items-center p-4 font-sans text-2xl font-semibold leading-snug text-blue-gray-900 antialiased',
                        wrapper: 'fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300'
                    },
                    danger: {
                        bgCss: 'bg-red-600 hover:bg-red-700 text-white'
                    }
                }
            }
        };
    },
    methods: {
        open() {
            this.show = true;
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        },
        close() {
            this.show = false;
        },
        onOkClickButton() {
            this.close();
            this.$emit('click-Ok-button');
            this.resolve({ isOk: true, isCancel: false });
        },
        onCancelClickButton() {
            this.close();
            this.$emit('click-cancel-button');
            this.resolve({ isOk: false, isCancel: true });
        }
    }
};
</script>

<style lang="scss" scoped></style>
