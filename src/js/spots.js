(function (d3, app) {
    'use strict';

    var buildCardScroll = function (selector) {
        var $element = $(selector);
        var activateCard = function (index) {
            $element.find('.card').removeClass('active');
            $element.find('.card-list').children().eq(index).addClass('active');
        };
        var cardScroll = new IScroll(selector, {
            scrollX: false,
            scrollY: true,
            momentum: false,
            snap: 'li',
            scrollbar: true,
            snapSpeed: 400,
            keyBindings: true,
            indicators: {
                el: '.indicator'
            }
        });
        cardScroll.on('scrollEnd', function () {
            activateCard(this.currentPage.pageY);
        });
        activateCard(0);
        return cardScroll;
    };

    var init = function () {
        var currentPaneId = 'spot-steinsfurt';
        var cardScroll = buildCardScroll('#' + currentPaneId);
        var paneScroll = new IScroll('.panes', {
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: true,
            snapSpeed: 400,
            keyBindings: true
        });
        paneScroll.on('scrollEnd', function () {
            var paneId = $('.panes').find('.cards').eq(this.currentPage.pageX).attr('id');
            if (paneId !== currentPaneId) {
                currentPaneId = paneId;
                cardScroll.scrollTo(0, 0, 0);
                cardScroll.destroy;
                cardScroll = buildCardScroll('#' + currentPaneId);
            }
        });

        document.addEventListener('touchmove', function (e) {
            e
            e.preventDefault();
        }, false);
    };

    app.spots = {
        'init': init
    };
})(d3, app);