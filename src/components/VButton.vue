<template>
    <div>
        <button :class="css.baseCss">
            <slot></slot>
        </button>

    </div>
</template>

<script>
import Base from './base';

export default {
    extends: Base,
    data () {
        return {
            tag: 'button'
        };
    }
};
</script>

<style lang="scss" scoped>

</style>
