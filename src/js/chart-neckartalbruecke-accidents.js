(function (d3, $, app) {
    'use strict';

    var data = [
        {
            "date": "2012-05",
            "value": 1
        },
        {
            "date": "2012-06",
            "value": 1
        },
        {
            "date": "2012-07",
            "value": 5
        },
        {
            "date": "2012-08",
            "value": 1
        },
        {
            "date": "2012-09",
            "value": 3
        },
        {
            "date": "2012-10",
            "value": 4
        },
        {
            "date": "2012-11",
            "value": 4
        },
        {
            "date": "2012-12",
            "value": 3
        },
        {
            "date": "2013-01",
            "value": 2
        },
        {
            "date": "2013-02",
            "value": 2
        },
        {
            "date": "2013-03",
            "value": 4
        },
        {
            "date": "2013-04",
            "value": 5
        },
        {
            "date": "2013-05",
            "value": 3
        },
        {
            "date": "2013-06",
            "value": 1
        },
        {
            "date": "2013-07",
            "value": 5
        },
        {
            "date": "2013-08",
            "value": 5
        },
        {
            "date": "2013-09",
            "value": 1
        },
        {
            "date": "2013-10",
            "value": 6
        },
        {
            "date": "2013-11",
            "value": 4
        },
        {
            "date": "2013-12",
            "value": 3
        },
        {
            "date": "2014-01",
            "value": 5
        },
        {
            "date": "2014-02",
            "value": 9
        },
        {
            "date": "2014-03",
            "value": 3
        },
        {
            "date": "2014-04",
            "value": 8
        }
    ];

    var containerSelector = '#chart-neckartalbruecke-accidents';
    var build = function () {
        app.charts.accidents.build(containerSelector, data);
    };

    app.charts.neckartalbrueckeAccidents = {
        'init': build
    };
})
(d3, jQuery, app);