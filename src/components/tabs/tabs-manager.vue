<template>
  <div>
    <div class="border-b-2 border-b-green-fg-500 mt-5">
      <ul class="flex justify-start gap-3 md:gap-8 ml-10 text-gray-400">
        <slot name="header"></slot>
      </ul>

    </div>
    <slot name="content"></slot>
  </div>

</template>

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
    setup () {
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
    mounted () {
        this.store.currentTabName = this.defaultTabName;
    }
};
</script>

<style lang="scss" scoped>

</style>
