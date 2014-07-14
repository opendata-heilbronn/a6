(function (d3, $, app) {
    'use strict';

    var data = [
        {
            "date": "2010-01",
            "value": 5
        },
        {
            "date": "2010-02",
            "value": 3
        },
        {
            "date": "2010-03",
            "value": 1
        },
        {
            "date": "2010-04",
            "value": 2
        },
        {
            "date": "2010-05",
            "value": 7
        },
        {
            "date": "2010-06",
            "value": 9
        },
        {
            "date": "2010-07",
            "value": 4
        },
        {
            "date": "2010-08",
            "value": 7
        },
        {
            "date": "2010-09",
            "value": 4
        },
        {
            "date": "2010-10",
            "value": 6
        },
        {
            "date": "2010-11",
            "value": 5
        },
        {
            "date": "2010-12",
            "value": 12
        },
        {
            "date": "2011-01",
            "value": 7
        },
        {
            "date": "2011-02",
            "value": 6
        },
        {
            "date": "2011-03",
            "value": 6
        },
        {
            "date": "2011-04",
            "value": 9
        },
        {
            "date": "2011-05",
            "value": 5
        },
        {
            "date": "2011-06",
            "value": 7
        },
        {
            "date": "2011-07",
            "value": 3
        },
        {
            "date": "2011-08",
            "value": 5
        },
        {
            "date": "2011-09",
            "value": 4
        },
        {
            "date": "2011-10",
            "value": 7
        },
        {
            "date": "2011-11",
            "value": 1
        },
        {
            "date": "2011-12",
            "value": 1
        },
        {
            "date": "2012-01",
            "value": 3
        },
        {
            "date": "2012-03",
            "value": 3
        },
        {
            "date": "2012-04",
            "value": 4
        },
        {
            "date": "2012-05",
            "value": 5
        },
        {
            "date": "2012-06",
            "value": 3
        },
        {
            "date": "2012-07",
            "value": 3
        },
        {
            "date": "2012-08",
            "value": 3
        },
        {
            "date": "2012-09",
            "value": 3
        },
        {
            "date": "2012-10",
            "value": 5
        },
        {
            "date": "2012-11",
            "value": 5
        },
        {
            "date": "2012-12",
            "value": 3
        },
        {
            "date": "2013-01",
            "value": 8
        },
        {
            "date": "2013-02",
            "value": 1
        },
        {
            "date": "2013-03",
            "value": 7
        },
        {
            "date": "2013-04",
            "value": 3
        },
        {
            "date": "2013-05",
            "value": 4
        },
        {
            "date": "2013-06",
            "value": 6
        },
        {
            "date": "2013-07",
            "value": 4
        },
        {
            "date": "2013-08",
            "value": 6
        },
        {
            "date": "2013-09",
            "value": 12
        },
        {
            "date": "2013-10",
            "value": 9
        },
        {
            "date": "2013-11",
            "value": 8
        },
        {
            "date": "2013-12",
            "value": 2
        },
        {
            "date": "2014-01",
            "value": 7
        },
        {
            "date": "2014-02",
            "value": 8
        },
        {
            "date": "2014-03",
            "value": 4
        },
        {
            "date": "2014-04",
            "value": 3
        }
    ];

    var containerSelector = '#chart-sinsheim-accidents';
    var build = function () {
        app.charts.accidents.build(containerSelector, data);
    };

    app.charts.sinsheimAccidents = {
        'init': build
    };
})
(d3, jQuery, app);