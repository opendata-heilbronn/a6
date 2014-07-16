(function (d3, app) {
    'use strict';

    var CardSwitcher = function (container) {
        var currentCard = 1;
        var cards = $(container).find('.cardgroup').length;
        var switchToCurrentCard = function () {
            $(container).find('.cardgroup').hide();
            var currentCardgroup = $(container).find('.cardgroup').eq((currentCard - 1));
            currentCardgroup.show();
            currentCardgroup.find('.card').each(function () {
                $(this).triggerHandler('resize');
                $(this).triggerHandler('active');
            });
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
        $('.spot-card-nav').show();
        $('.card-list').each(function (index, element) {
            new CardSwitcher(element);
        });
    };

    app.cardNav = {
        'init': init
    };
})
(d3, app);