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
            $('.explain-slide, .intro-box').on('click', function () {
                $('#slide-0').addClass('off');
            });
            $('html, body, .fullscreen, .fullscreen-content, .pane-scroller, .pane').removeClass('touch').addClass('notouch');
            app.parallax.init();
        } else {
            app.scroll.init();
        }
        Object.keys(app.charts).forEach(function (chartId) {
            app.charts[chartId].init();
        });

        $('#a6-accident-map').modal({
            show: false
        });
        var setupDidRun = false;
        $('.btn-toggle-accident-map').on('click', function () {
            if (!setupDidRun) {
                $('#a6-accident-map .modal-body').html("<iframe class='cartodbmap' src='http://vanessawormer.cartodb.com/viz/045e7644-0ce1-11e4-af53-0e73339ffa50/embed_map?title=true&description=true&search=false&shareable=true&cartodb_logo=true&layer_selector=true&legends=true&scrollwheel=true&fullscreen=true&sublayer_options=1%7C1%7C1%7C1&sql=&sw_lat=49.070717120839156&sw_lon=8.771896362304688&ne_lat=49.34212527586522&ne_lon=9.605484008789062'></iframe>");
                setupDidRun = true;
            }
            $('#a6-accident-map').modal('show');
        });
    };
})(app, d3);