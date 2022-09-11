<template>
   <li @click="onTabClick" :class="{'border-b-2 border-b-green-fg-500': isSelected}">
        <button >{{label}}</button>
    </li>
</template>

<script>
import mixin from './mixins';

export default {
    setup () {
        const store = useStore();

        return {
            store
        }
    },
    methods: {
        onTabClick() {
            this.$parent.currentTabName = this.name;
        }
    },
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
        },
    },
}
</script>

<style lang="scss" scoped>

</style>