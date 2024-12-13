<script>
// import { reactive } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    defaultTabName: {
      type: String,
      default: ''
    }
  },
  setup() {
    const store = useStore();

    return {
      store
    };
  },
  data() {
    return {
      // currentTabName: ''
    };
  },
  mounted() {
    this.store.currentTabName = this.defaultTabName;
  }
};
</script>

<template>
  <div>
    <div class="border-b-green-fg-500 mt-5 border-b-2">
      <ul class="ml-10 flex justify-start gap-3 text-gray-400 md:gap-8">
        <slot name="header"/>
      </ul>
    </div>
    <slot name="content"/>
  </div>
</template>

<style lang="scss" scoped></style>
