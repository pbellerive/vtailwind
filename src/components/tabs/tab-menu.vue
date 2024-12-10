<template>
  <li :class="{'border-b-2 border-b-green-fg-500': isSelected}" @click="onTabClick">
    <button >{{label}}</button>
  </li>
</template>

<script>
import mixin from './mixins';

export default {
    mixins: [mixin],
    props: {
        label: {
            type: String,
            default: 'New Tab'
        },
        name: {
            type: String,
            default: undefined,
            required: true
        }
    },
    setup () {
        const store = useStore();

        return {
            store
        };
    },
    methods: {
        onTabClick() {
            this.$parent.currentTabName = this.name;
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
