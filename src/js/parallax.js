(function (skrollr, app) {
    'use strict';

    var skrollrInstance;

    var initScrollObservation = function () {
        var $body = $('body');
        var chartList = [];
        $('.chart').each(function (index, chartElement) {
            chartList.push($(chartElement));
        });
        var treshold = $body.height() - 300;
        var indexDone = -1;
        $body.on('scroll', function () {
            chartList.forEach(function (chart, index) {
                if (index > indexDone && chart.offset().top < treshold) {
                    chart.closest('.card').triggerHandler('active');
                    indexDone++;
                }
            });
        });
    };

    var init = function () {
        setTimeout(function () {
            skrollrInstance = skrollr.init({
                forceHeight: false
            });
            initScrollObservation();
        }, 100);
    };

    app.parallax = {
        'init': init
    };
})
(skrollr, app);