(function (d3, app) {
    'use strict';

    var buildCardScroll = function (selector) {
        return new IScroll(selector, {
            scrollX: false,
            scrollY: true,
            momentum: true,
            scrollbar: true,
            keyBindings: true
        });
    };

    var activatePaneScrolling = function () {
        var currentPaneId = null, cardScroll = null;

        var paneScroll = new IScroll('.panes', {
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: true,
            snapSpeed: 200,
            keyBindings: true
        });

        paneScroll.on('scrollEnd', function () {
            var paneId = $('.panes').find('.cards').eq(this.currentPage.pageX).attr('id');
            if (paneId !== currentPaneId) {
                if (cardScroll !== null) {
                    cardScroll.scrollTo(0, 0, 0);
                    cardScroll.destroy();
                    cardScroll = null;
                }
                currentPaneId = paneId;
                if (paneId !== "welcome-screen") {
                    cardScroll = buildCardScroll('#' + currentPaneId);
                }
            }
        });
    };

    app.scroll = {
        'init': activatePaneScrolling
    };
})
(d3, app);