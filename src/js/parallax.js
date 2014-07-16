(function (skrollr, app) {
    'use strict';

    var init = function () {
        setTimeout(function () {
            var s = skrollr.init({
                forceHeight: false
            });
        }, 100);
    };

    app.parallax = {
        'init': init
    };
})
(skrollr, app);