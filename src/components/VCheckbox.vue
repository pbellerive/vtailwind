<template>
    <div>
        <div
            class="flex align-middle items-center w-fit mb-1"
            v-if="!!this.$slots['top']"
        >
            <div
                class="pr-2"
                v-if="!!this.$slots['tooltip']"
            >
                <slot name="tooltip"></slot>
            </div>
        </div>
        <div class="flex">
            <label class="flex" @click="toggle">
                <div class="grid grid-cols-1 place-items-center py-0.5">
                    <input type="checkbox" :checked="modelValue"
                        :disabled="disabled"
                        :class="[css.baseCss, css.activeCss, css.focusCss, colorVariantCss]">
                    <font-awesome-icon :icon="['fas', 'check']" aria-hidden="true"
                        :class="[iconCss]"/>
                </div>
                <span v-if="!!this.$slots['default']" :class="[css.textCss, textPointerCss]"><slot></slot><span v-if="required" class="text-red-300"> * </span></span>
            </label>
        </div>
        <div
            v-if="!!this.$slots['bottom']"
            :class="[css.bottomLabelCss, css.bottomLabelColorCss]"
        >
            <slot name="bottom"></slot>
        </div>
    </div>
</template>

<script>
import Base from './base';

export default {
    extends: Base,
    data() {
        return {
            tag: 'checkbox',
            css: {
                iconCss: 'relative pointer-events-none z-1 col-start-1 row-start-1 text-white',
                baseCss: 'appearance-none h-6 w-6 rounded-md border transition duration-200 relative z-0 col-start-1 row-start-1 ',
                bottomLabelCss: 'flex text-sm pb-1 cursor-pointer w-fit pt-1',
                bottomLabelColorCss: 'text-gray-400',
                activeCss: 'active:ring',
                focusCss: 'focus:outline-0 focus:ring-1',
                disabledColorCss: 'pointer-events-none border-gray-200',
                disabledIconCss: 'invisible pointer-events-none z-1 col-start-1 row-start-1',
                textCss: 'z-10 relative text-center text-lg text-gray-500 pl-2.5 select-none',
                disabledPointerCss: 'pointer-events-none',
                pointerCss: 'cursor-pointer',
                variant: {
                    default: {
                        baseCss: 'appearance-none h-4 w-4 rounded-none border transition duration-200 relative z-0 col-start-1 row-start-1 ',
                        textCss: 'z-10 relative text-center text-md text-gray-500 pl-2.5 select-none'
                    },
                    danger: {
                        baseCss: 'appearance-none h-4 w-4 rounded-none border transition duration-200 relative z-0 col-start-1 row-start-1 border-red-100 ',
                        iconColorCss: 'text-red-100',
                        hoverCss: 'hover:border-red-300 hover:shadow',
                        textCss: 'z-10 relative text-center text-md pl-2.5 select-none text-red-900 ',
                        focusCss:
                            'outline-none focus:border-red-100 focus:shadow-inner',
                        bottomLabelColorCss: 'text-red-200'
                    }
                },
                variantColor: {
                    blue: {
                        colorCss: 'border-gray-500 bg-white ring-blue-600 hover:border-blue-50',
                        hoverCss: 'hover:border-blue-50 cursor-pointer hover:ring-blue-50 checked:hover:bg-blue-50',
                        checkedCss: 'checked:bg-blue-600 checked:text-blue-600 checked:ring-0 checked:border-blue-600'
                    },
                    red: {
                        colorCss: 'border-gray-500 bg-white ring-red-600 hover:border-red-50',
                        hoverCss: 'hover:border-lightred-300 cursor-pointer hover:lightred-300 checked:hover:bg-lightred-300',
                        checkedCss: 'checked:bg-lightred-300 checked:text-lightred-300 checked:ring-0 checked:border-lightred-300'
                    },
                    green: {
                        colorCss: 'border-gray-500 bg-white ring-green-600 hover:border-green-50',
                        hoverCss: 'hover:border-green-400 cursor-pointer hover:ring-green-400 checked:hover:bg-green-400',
                        checkedCss: 'checked:bg-green-400 checked:text-green-400 checked:ring-0 checked:border-green-400'
                    }
                }
            }
        };
    },
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        checked: {
            type: Boolean
        },
        modelValue: {
            type: Boolean
        },
        bgColor: {
            type: String,
            default: 'blue'
        },
        required: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        toggle(e) {
            if (e.target.tagName !== 'SPAN') {
                this.$emit('update:modelValue', !this.modelValue);
            }
        }
    },
    computed: {
        colorVariantCss() {
            if (this.disabled) {
                return this.css.disabledColorCss;
            }
            return this.css.variantColor[this.bgColor].colorCss + ' ' + this.css.variantColor[this.bgColor].hoverCss + ' ' + this.css.variantColor[this.bgColor].checkedCss;
        },
        iconCss() {
            if (this.disabled) {
                return this.css.disabledIconCss;
            }
            return this.css.iconCss;
        },
        hoverCss() {
            if (this.disabled) {
                return '';
            }
            return this.css.hoverCss;
        },
        activeCss() {
            if (this.disabled) {
                return '';
            }
            return this.css.activeCss;
        },
        textPointerCss() {
            if (this.disabled) {
                return this.css.disabledPointerCss;
            }
            return this.css.pointerCss;
        }
    }
};
</script>

<style lang="scss" scoped>
</style>