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
        var cardScroll = new IScroll('#test-spot', {
            scrollX: false,
            scrollY: true,
            momentum: false,
            snap: 'li',
            scrollbar: true,
            snapSpeed: 400,
            keyBindings: true
        });
        cardScroll.on('scrollEnd', function () {
            $('#test-spot').find('.card').removeClass('active');
            $('#test-spot').find('.card-list').children().eq(this.currentPage.pageY).addClass('active');
        });
        document.addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, false);
    };

    app.spots = {
        'init': init
    };
})(d3, app);