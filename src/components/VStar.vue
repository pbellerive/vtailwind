<template>
  <div class="flex flex-row gap-2">
    <div v-for="index in max" :key="index">
      <font-awesome-icon icon="fa-solid fa-pepper-hot" :class="color(index)" class="cursor-pointer" @click="onStarClick(index)" />
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
        return 'text-orange-500';
      } else if (index == this.max) {
        return 'text-red-500';
      }

      return 'text-green-fg-500';
    },
    onStarClick(starValue) {
      this.$emit('update:modelValue', starValue);
    },
  },
  props: {
    modeValue: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 5,
    },
  },
};
</script>

<style lang="scss" scoped></style>
