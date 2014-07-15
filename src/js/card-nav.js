(function (d3, app) {
    'use strict';

    var CardSwitcher = function (container) {
        var currentCard = 1;
        var cards = $(container).find('.spot-text').length;
        var switchToCurrentCard = function () {
            $(container).find('.spot-text').hide();
            $(container).find('.spot-text').eq((currentCard - 1)).show().trigger('active').triggerHandler('resize');
            $(container).find('.spot-card-nav-current').text('Card ' + currentCard + ' / ' + cards);
        };
        $(container).find('.spot-card-nav-to-left').on('click', function () {
            currentCard = Math.max(1, (currentCard - 1));
            switchToCurrentCard();
        });
        $(container).find('.spot-card-nav-to-right').on('click', function () {
            currentCard = Math.min(cards, (currentCard + 1));
            switchToCurrentCard();
        });
    };

    var init = function () {
        $('.pane-content').each(function (index, element) {
            new CardSwitcher(element);
        });
    };

    app.cardNav = {
        'init': init
    };
})
(d3, app);