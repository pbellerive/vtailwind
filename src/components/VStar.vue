<template>
  <div class="flex flex-row gap-2">
    <div v-for="index in max" :key="index">
      <font-awesome-icon :icon="iconCss" :class="color(index)" class="cursor-pointer" @click="onStarClick(index)" />
    </div>
  </div>
</template>

<script>
import Base from './base';

export default {
  extends: Base,
  setup() {
    return {};
  },
  data() {
    return {
      css: {
        variant: {
          default: {},
        },
      },
    };
  },
  methods: {
    color(index) {
      if (index > this.modelValue) return 'text-gray-300';

      const middle = Math.ceil(this.max / 2);

      if (index >= middle && index < this.max) {
        return this.colorMiddle;
      } else if (index == this.max) {
        return this.colorEnd;
      }

      return this.colorStart;
    },
    onStarClick(starValue) {
      this.$emit('update:modelValue', starValue);
    },
  },
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 5,
    },
    iconCss: {
      type: String,
      default: 'fa-solid fa-pepper-hot',
    },
    colorStart: {
      type: String,
      default: 'text-green-fg-500',
    },
    colorMiddle: {
      type: String,
      default: 'text-orange-500',
    },
    colorEnd: {
      type: String,
      default: 'text-red-500',
    },
  },
};
</script>

<style lang="scss" scoped></style>
