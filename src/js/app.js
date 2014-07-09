var app = {
    charts: {}
};
(function (app) {
    'use strict';

    app.init = function () {
        app.scroll.init();
        Object.keys(app.charts).forEach(function (chartId) {
            app.charts[chartId].init();
        })
    };
})(app);