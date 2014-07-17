(function (IScroll, app) {
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

    var activatePaneScrolling = function () {
        var currentPaneId = null, cardScroll = null;

        paneScroll = new IScroll('.panes', {
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: '.pane',
            snapSpeed: 200,
            keyBindings: true,
            eventPassthrough: true
        });

        paneScroll.on('scrollEnd', function () {
            if (!Modernizr.touch) {
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
        if (paneScroll) paneScroll.goToPage(page, 0, 300);
    };

    var scrollToNext = function () {
        paneScroll.next();
    };

    var scrollToPrev = function () {
        paneScroll.prev();
    };

    app.scroll = {
        'init': activatePaneScrolling,
        'scrollTo': scrollTo,
        'scrollToNext': scrollToNext,
        'scrollToPrev': scrollToPrev
    };
})
(IScroll, app);