<template>
  <span
    :class="wrapper"
    @click="onClickToggle">
    <input type="hidden" />
    <span :class="buttonClass" />
    <span :class="checkClass" />
    <span :class="checkClass" />
  </span>
</template>

<script>
  import Base from './base';

  export default {
    name: 'VToggle',
    extends: Base,
    props: {
      modelValue: {
        type: Boolean,
        default: false
      }
    },
    emits: ['update:modelValue'],
    setup(_props) {
      return {};
    },
    data() {
      return {
        checked: false,
        tag: 'toggle',
        css: {
          wrapper:
            'bg-gray-100 rounded-full border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200',
          wrapperChecked:
            'bg-blue-500 rounded-full border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200',
          button:
            'inline-block absolute transform translate-x-0 transition ease-in-out duration-200 h-5 w-5 rounded-full bg-red shadow flex items-center justify-center text-gray-400 text-xs',
          uncheckedPlaceholder:
            'inline-block rounded-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs',
          checkedPlaceholder:
            'inline-block rounded-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs',
          buttonChecked:
            'inline-block absolute transform translate-x-full transition ease-in-out duration-200 h-5 w-5 rounded-full bg-white shadow flex items-center justify-center text-blue-500 text-xs',
          variant: {
            default: {
              wrapper:
                'bg-gray-100 rounded-full border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200',
              wrapperChecked:
                'bg-blue-500 rounded-full border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200',
              button:
                'inline-block absolute transform translate-x-0 transition ease-in-out duration-200 h-5 w-5 rounded-full bg-red shadow flex items-center justify-center text-gray-400 text-xs',
              uncheckedPlaceholder:
                'inline-block rounded-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs',
              checkedPlaceholder:
                'inline-block rounded-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs',
              buttonChecked:
                'inline-block absolute transform translate-x-full transition ease-in-out duration-200 h-5 w-5 rounded-full bg-white shadow flex items-center justify-center text-blue-500 text-xs'
            }
          }
        }
      };
    },
    computed: {
      checkClass() {
        if (this.checked) {
          return this.css.checkedPlaceholder;
        }

        return this.css.uncheckedPlaceholder;
      },
      buttonClass() {
        if (this.checked) {
          return this.css.buttonChecked;
        }

        return this.css.button;
      },
      wrapper() {
        if (this.checked) {
          return this.css.wrapperChecked;
        }

        return this.css.wrapper;
      }
    },
    watch: {
      modelValue(_newValue, _oldValue) {
        this.checked = this.modelValue;
      }
    },
    created() {
      this.checked = this.modelValue;
    },
    methods: {
      onClickToggle() {
        this.checked = !this.checked;
      }
    }
  };
</script>

<style lang="scss" scoped></style>
