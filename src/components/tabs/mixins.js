const mixin = {
    computed: {
        isSelected() {
            return this.name == this.store.currentTabName;
        }
    }
};

export default mixin;
