<template>
  <div :class="[css.wrapper]">
    <router-link v-if="to" :to="to" :class="[css.baseCss, css.bgCss]" :disabled="disabled">
      <span>icon</span>
      <span class="text-center">
        <slot></slot>
      </span>
    </router-link>
    <button v-else :class="[css.baseCss, css.bgCss]" :disabled="disabled" class="flex-none">
      <span v-if="iconClass" :class="[iconClass, css.iconCss]"></span>
      <span :class="css.label">
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
    bgCss() {
      if (this.disabled) {
        return this.css.disabledBgCss;
      }

      return this.css.bgCss;
    },
  },
  data() {
    return {
      tag: 'button',
      //flex select-none items-center gap-3 rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
      //shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
      css: {
        wrapper: '',
        baseCss: '',
        bgCss: 'bg-white',
        disabledBgCss: 'bg-gray-200',
        variant: {
          default: {
            wrapper: 'h-10',
            baseCss:
              'flex select-none items-center gap-3 rounded-lg py-3 px-3 text-center align-middle shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
            bgCss: 'bg-pink-200 ',
            label: 'text-center text-gray-500 font-sans text-xs font-bold uppercase',
            disabledBgCss: 'bg-gray-500',
            iconCss: 'pr-4',
          },
          danger: {
            wrapper: 'h-10',
            baseCss:
              'flex select-none items-center gap-3 rounded-lg py-3 px-6 text-center align-middle shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
            bgCss: 'bg-red-500 ',
            label: 'text-center text-gray-500 font-sans text-xs font-bold uppercase',
            disabledBgCss: 'bg-gray-200',
          },
          dangerFlat: {
            wrapper: 'h-10',
            baseCss:
              'flex select-none items-center gap-3 py-3 px-6 text-center align-middle shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
            bgCss: 'bg-red-500 ',
            label: 'text-gray-500 font-sans text-xs font-bold uppercase',
            disabledBgCss: 'bg-gray-200',
          },
          dangerRounded: {
            wrapper: 'h-10',
            baseCss:
              'flex select-none items-center rounded-full gap-3 py-3 px-6 text-center align-middle shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
            bgCss: 'bg-red-500 ',
            label: 'text-gray-500 font-sans text-xs font-bold uppercase',
            disabledBgCss: 'bg-gray-200',
          },
          info: {
            wrapper: 'h-10',
            baseCss:
              'flex select-none items-center gap-3 rounded-lg py-3 px-6 text-center align-middle shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
            bgCss: 'bg-gray-200 ',
            label: 'text-gray-500 font-sans text-xs font-bold uppercase',
            disabledBgCss: 'bg-gray-200',
          },
          infoFlat: {
            wrapper: 'h-10',
            baseCss:
              'flex select-none items-center gap-3 py-3 px-6 text-center align-middle shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
            bgCss: 'bg-gray-200 ',
            label: 'text-gray-500 font-sans text-xs font-bold uppercase',
            disabledBgCss: 'bg-gray-200',
          },
          infoRounded: {
            wrapper: 'h-10',
            baseCss:
              'flex select-none items-center rounded-full gap-3 py-3 px-6 text-center align-middle shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
            bgCss: 'bg-gray-200 ',
            label: 'text-gray-500 font-sans text-xs font-bold uppercase',
            disabledBgCss: 'bg-gray-200',
          },
          primary: {
            wrapper: 'h-10',
            baseCss:
              'flex select-none items-center gap-3 rounded-lg py-3 px-6 text-center align-middle shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
            bgCss: 'bg-slate-900 ',
            label: 'text-gray-500 font-sans text-xs font-bold uppercase',
            disabledBgCss: 'bg-gray-200',
          },
          primaryFlat: {
            wrapper: 'h-10',
            baseCss:
              'flex select-none items-center gap-3 py-3 px-6 text-center align-middle shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
            bgCss: 'bg-slate-200 ',
            label: 'text-gray-500 font-sans text-xs font-bold uppercase',
            disabledBgCss: 'bg-gray-200',
          },
          primaryRounded: {
            wrapper: 'h-10',
            baseCss:
              'flex select-none items-center rounded-full gap-3 py-3 px-6 text-center align-middle shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
            bgCss: 'bg-slate-200 ',
            label: 'text-gray-500 font-sans text-xs font-bold uppercase',
            disabledBgCss: 'bg-gray-200',
          },
          secondary: {
            bgCss: 'bg-blue-100 hover:bg-blue-200 text-gray-900',
          },
          success: {
            bgCss: 'bg-green-fg-500 hover:bg-green-fg-600 text-black',
          },
          warning: {
            wrapper: 'h-10',
            baseCss:
              'flex select-none items-center gap-3 rounded-lg py-3 px-6 text-center align-middle shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
            bgCss: 'bg-yellow-200 ',
            label: 'text-gray-500 font-sans text-xs font-bold uppercase',
            disabledBgCss: 'bg-gray-200',
          },
          warningFlat: {
            wrapper: 'h-10',
            baseCss:
              'flex select-none items-center gap-3 py-3 px-6 text-center align-middle shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
            bgCss: 'bg-yellow-200 ',
            label: 'text-gray-500 font-sans text-xs font-bold uppercase',
            disabledBgCss: 'bg-gray-200',
          },
          warningRounded: {
            wrapper: 'h-10',
            baseCss:
              'flex select-none items-center rounded-full gap-3 py-3 px-6 text-center align-middle shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
            bgCss: 'bg-yellow-200 ',
            label: 'text-gray-500 font-sans text-xs font-bold uppercase',
            disabledBgCss: 'bg-gray-200',
          },
          link: {
            baseCss: 'border-none hover:text-blue-500 text-center',
          },
          editor: {
            wrapper: '',
            baseCss: 'border border-gray-50 text-gray-600',
          },
          close: {
            wrapper: '',
            baseCss: 'border border-red-50 text-white bg-red-700 px-3 py-2 rounded-sm',
          },
          closeRounded: {
            baseCss: 'w-8 h-8 border border-red-50 text-white bg-red-700 rounded-full',
          },
        },
      },
    };
  },
  props: {
    iconClass: {
      type: String,
      default: undefined,
    },
    to: {
      type: String,
      default: undefined,
    },
  },
};
</script>

<style lang="scss" scoped></style>
