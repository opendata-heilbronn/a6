(function (skrollr, app) {
    'use strict';

    var init = function () {
        var $window = $(window);
        var $panes = $('.pane');
        var $body = $('body');

        //FadeIn all sections
        setTimeout(function () {

            // Resize sections
            adjustWindow();

            // Fade in sections
            $body.removeClass('loading').addClass('loaded');

        }, 800);

        function adjustWindow() {
            // Init Skrollr
            var s = skrollr.init({
                forceHeight: false
            });

            // Resize our slides
            $panes.each(function (index, pane) {
                $(pane).height(3500);
            });

            // Refresh Skrollr after resizing our sections
            s.refresh($('.pane'));
        }
    };

    app.parallax = {
        'init': init
    };
})
(skrollr, app);