(function (d3, app) {
    'use strict';

    var paneScroll;

    var buildCardScroll = function (selector) {
        return new IScroll(selector, {
            scrollX: false,
            scrollY: true,
            momentum: true,
            scrollbar: true,
            keyBindings: true
        });
    };

    var spotNav = {
        paneMaps: ['a6_europa_map.png', 'spot/karte_steinsfurt.svg', 'spot/karte_fuerfeld.svg', 'spot/karte_neckartalbruecke.svg', 'spot/karte_weinsberg.svg', 'spot/karte_hohenlohe.svg', 'spot/karte_hohenlohe.svg'],
        update: function (paneNumber) {
            $('#spot-nav').toggle(paneNumber > 0);
            if (paneNumber > 0) {
                var map = this.paneMaps[(paneNumber - 1)];
                $('.spot-nav-map').attr('src', 'img/' + map);
            }
        }
    };

    var activatePaneScrolling = function () {
        var currentPaneId = null, cardScroll = null, desktop = $('.desktop').length;

        paneScroll = new IScroll('.panes', {
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: true,
            snapSpeed: 200,
            keyBindings: true,
            eventPassthrough: true
        });

        paneScroll.on('scrollEnd', function () {
            if (desktop > 0) {
                spotNav.update(this.currentPage.pageX);
                return true;
            }
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

    var scrollTo = function (page) {
        paneScroll.goToPage(page, 0, 300);
    };

    app.scroll = {
        'init': activatePaneScrolling,
        'scrollTo': scrollTo
    };
})
(d3, app);