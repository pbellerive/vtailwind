const mixin = {
    computed: {
        isSelected() {
            if (this.name === this.store.currentTabName) {
                return true;
            }
            return false;
        }
    }
};

export default mixin;
