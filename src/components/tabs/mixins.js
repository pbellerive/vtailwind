const mixin = {
  computed: {
    isSelected() {
      return this.tab === this.selectedTab;
    }
  }
};

export default mixin;
