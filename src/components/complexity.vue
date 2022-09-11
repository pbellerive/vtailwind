<template>
    <div class="w-6 h-6 rounded-full self-center" :class="complexityColors[complexity]"></div>
</template>

<script>
export default {
    setup () {

        const complexityColors = {
            0: 'bg-yellow-500',
            1: 'bg-yellow-400',
            2: 'bg-orange-300',
            3: 'bg-orange-500',
            4: 'bg-red-300',
            5: 'bg-red-500',
        };
        return {
            complexityColors
        }
    },
    props: {
        complexity: {
            type: Number,
            default: 0
        }
    }
}
</script>

<style lang="scss" scoped>

</style>