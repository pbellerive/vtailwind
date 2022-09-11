<template>
     <div v-if="isSelected">
        <slot>{{name}}</slot>
    </div>
</template>

<script>
import mixin from './mixins';

export default {
    setup () {

        return {
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