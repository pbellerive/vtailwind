<template>
  <div :class="[{ hidden: !isVisible }, css.wrapper, css.bgCss]">
    <div class="pb-2 text-sm">
      <span>
        {{ title }}
      </span>
      <span class="float-right hover:cursor-pointer">
        <svg
          class="fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="22"
          height="22"
          @click="hide()"
        >
          <path
            class="heroicon-ui"
            d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"
          />
        </svg>
      </span>
    </div>
    <div
      :class="css.textCss"
      v-html="text"
    />
  </div>
</template>

<script>
import VBase from './base';

export default {
  extends: VBase,
  data() {
    return {
      tag: 'notification',
      css: {
        wrapper:
          'border-l-4 shadow-lg rounded-lg text-left text-black bg-white m-8 p-4 notification-box fixed top-0 right-0',
        bgCss: '',
        textCss: 'text-left text-black text-sm',
        variant: {
          danger: {
            bgCss: 'bg-red-100 border-red-500',
            textCss: 'text-left text-sm text-red-700 '
          },
          success: {
            bgCss: 'bg-green-50 border-green-500 ',
            textCss: 'text-left text-sm text-green-700 '
          },
          warning: {
            bgCss: 'bg-yellow-50 border-yellow-500',
            textCss: 'text-left text-sm text-yellow-700'
          }
        }
      },
      isVisible: false,
      title: 'default',
      text: 'texte'
    };
  },
  methods: {
    show(options = {}) {
      this.title = options.title;
      this.text = options.text;

      this.isVisible = true;
      setTimeout(() => {
        this.hide();
      }, 3000);
    },
    hide() {
      this.isVisible = false;
    }
  }
};
</script>

<style lang="css" scoped>
  .notification-box {
    width: 20rem;
    animation: popX 0.5s;
    animation-direction: normal;
  }

  @keyframes popX {
    0% {
      transform: translateX(200px);
    }
    100% {
      transform: translateX(0px);
    }
  }
</style>
