(function (d3, app) {
    'use strict';

    var paneScroll;

    var buildCardScroll = function (selector) {
        var $cards = $(selector).find('.card-list').find('.card');
        var cardOffsets = [];
        $cards.each(function (index, card) {
            var height = $(card).height();
            cardOffsets.push($(card).offset().top * -1 - (height / 2));
        });

        var cardScroll = new IScroll(selector, {
            scrollX: false,
            scrollY: true,
            momentum: true,
            scrollbar: false,
            keyBindings: true,
            snap: '.card',
            probeType: '2',
            tap: true
        });

        var activeCard = 0;

        var setActiveCard = function (currentCard, triggerEvent) {
            if (activeCard !== currentCard) {
                if (activeCard > 1) {
                    $cards.eq(activeCard).removeClass('active');
                }
                $cards.eq(currentCard).addClass('active');
                activeCard = currentCard;
            }
            if (currentCard > 0 && triggerEvent) {
                $cards.eq(currentCard).triggerHandler('active');
            }
        };

        cardScroll.on('scroll', function () {
            var currentCard = 0, y = this.y;
            $.each(cardOffsets, function (index, offset) {
                if (y > offset) {
                    currentCard = index;
                    return false;
                }
            });
            setActiveCard(currentCard);
        });
        cardScroll.on('scrollEnd', function () {
            setActiveCard(this.currentPage.pageY, true);
        });
        $cards.on('tap', function () {
            cardScroll.goToPage(0, $(this).index(), 300);
        });

        return cardScroll;
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
        if (desktop > 0) {
            $('.pane').each(function () {
                $(this).find('.cardgroup:gt(0)').hide();
            });
        }

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
                $('.panes').find('.pane').eq(this.currentPage.pageX).find('.cardgroup').eq(0).find('.card').each(function () {
                    $(this).triggerHandler('active');
                });
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