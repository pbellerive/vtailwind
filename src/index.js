const install = function(app, options) {
    app.config.globalProperties.$vUiSettings = options;
};

const plugin = {
    install
};

export default plugin;
