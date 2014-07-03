(function (d3, app) {
    'use strict';

    var init = function () {
        new IScroll('.fullscreen-content', {
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: true,
            snapSpeed: 400,
            keyBindings: true
        });
        document.addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, false);
    };

    app.spots = {
        'init': init
    };
})(d3, app);