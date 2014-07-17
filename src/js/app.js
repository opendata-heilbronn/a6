var app = {
    charts: {}
};
(function (app, d3) {
    'use strict';

    var germanFormatters = d3.locale({
        "decimal": ",",
        "thousands": ".",
        "grouping": [3],
        "currency": ["€", ""],
        "dateTime": "%a %b %e %X %Y",
        "date": "%d.%m.%Y",
        "time": "%H:%M:%S",
        "periods": ["AM", "PM"],
        "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        "shortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    });
    d3.format = germanFormatters.numberFormat;

    app.init = function () {
        if (!Modernizr.touch) {
            $('#slide-0').height($(window).innerHeight());
            $('.explain-slide').on('click', function () {
                $('#slide-0').addClass('off');
            });
            $('html, body, .fullscreen, .fullscreen-content, .pane-scroller, .pane').removeClass('touch').addClass('notouch');
            app.parallax.init();
        } else {
            app.scroll.init();
        }
        Object.keys(app.charts).forEach(function (chartId) {
            app.charts[chartId].init();
        })
    };
})(app, d3);