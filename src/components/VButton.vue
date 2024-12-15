<template>
  <div :class="css.wrapper">
    <router-link
      v-if="to"
      :to="to"
      :class="[css.baseCss, css.bgCss, css.label]"
      :disabled="disabled">
      <span class="text-center">
        <slot />
      </span>
    </router-link>
    <button
      v-else
      :class="[css.baseCss, css.bgCss, css.label]"
      :disabled="disabled">
      <span class="text-center">
        <slot />
      </span>
    </button>
  </div>
</template>

<script>
  import Base from './base';

  export default {
    extends: Base,
    props: {
      to: {
        type: String,
        default: undefined
      }
    },
    data() {
      return {
        tag: 'button',
        css: {
          wrapper: 'inline-block',
          baseCss: 'p-2 md:p-2 border-2 rounded rounded-sm',
          bgCss: 'bg-white',
          disabledBgCss: 'bg-gray-200',
          variant: {
            default: {
              wrapper: 'inline-block',
              baseCss:
                'middle none center rounded-lg py-2 px-6 font-sans shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
              bgCss: 'bg-white',
              disabledBgCss: 'bg-gray-200',
              label: 'text-xs font-bold uppercase'
            },
            elevatedPrimary: {
              wrapper: 'inline-block',
              baseCss:
                'middle none center rounded-full py-2 px-6 font-sans shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
              bgCss: 'bg-green-500 text-white',
              disabledBgCss: 'bg-gray-200',
              label: 'text-xs font-bold uppercase'
            },
            elevatedSecondary: {
              baseCss:
                'middle none center rounded-full py-2 px-6 font-sans shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
              bgCss: 'bg-blue-500 text-white',
              disabledBgCss: 'bg-gray-200',
              label: 'text-xs font-bold uppercase'
            },
            elevatedTertiary: {
              baseCss:
                'middle none center rounded-full py-2 px-6 font-sans shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
              bgCss: 'bg-gray-500 text-black',
              disabledBgCss: 'bg-gray-200',
              label: 'text-xs font-bold uppercase'
            },
            elevatedDanger: {
              baseCss:
                'middle none center rounded-full py-2 px-6 font-sans shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
              bgCss: 'bg-red-500 text-white',
              disabledBgCss: 'bg-gray-200',
              label: 'text-xs font-bold uppercase'
            },
            primary: {
              baseCss:
                'middle none center rounded-lg py-2 px-6 font-sans shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
              bgCss: 'bg-green-600 hover:bg-green-700 text-white',
              label: 'text-xs font-bold uppercase'
            },
            secondary: {
              baseCss:
                'middle none center rounded-lg py-2 px-6 font-sans shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
              bgCss: 'bg-blue-100 hover:bg-blue-200 text-gray-900',
              label: 'text-xs font-bold uppercase'
            },
            tertiary: {
              baseCss:
                'middle none center rounded-lg py-2 px-6 font-sans shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
              bgCss: 'bg-gray-500 text-black',
              label: 'text-xs font-bold uppercase'
            },
            danger: {
              baseCss:
                'middle none center rounded-lg py-2 px-6 font-sans shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
              bgCss: 'bg-red-600 hover:bg-red-700 text-black',
              label: 'text-xs font-bold uppercase'
            },
            dangerFlat: {
              wrapper: 'inline ',
              baseCss: 'w-full p-2 md:p-3 rounded-none text-black',
              bgCss: 'bg-red-600 hover:bg-red-700 text-black'
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
              baseCss: 'border-none hover:text-blue-500 text-center',
              bgCss: 'bg-transparent'
            },
            editor: {
              wrapper: '',
              baseCss: 'border border-gray-50 text-gray-600',
              bgCss: 'bg-transparent'
            },
            close: {
              wrapper: '',
              baseCss: 'border border-red-50 px-3 py-2 rounded-sm',
              bgCss: 'text-white bg-red-700'
            },
            closeRounded: {
              wrapper: 'flex place-items-center',
              baseCss: 'w-8 h-8 border border-red-700 rounded-full',
              bgCss: 'text-white bg-red-700 hover:bg-red-500'
            },
            prepend: {
              wrapper: 'inline-block',
              baseCss:
                'middle none center rounded-lg py-2 px-6 mr-0 font-sans disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
              bgCss: 'bg-gray-200 rounded-r-none',
              disabledBgCss: 'bg-gray-200',
              label: 'text-xs font-bold uppercase'
            }
          }
        }
      };
    },
    computed: {
      bgCss() {
        if (this.disabled) {
          return this.css.disabledBgCss;
        }

        return this.css.bgCss;
      }
    }
  };
</script>

<style lang="scss" scoped></style>
