(function (d3, app) {
    'use strict';

    var init = function () {
        d3.select('.intro-start-button').on('click', function () {
            d3.select('#intro').classed('move-up', true);
        });
    };

    app.intro = {
        'init': init
    };
})(d3, app);