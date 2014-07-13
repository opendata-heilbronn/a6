(function (d3, $, app) {
    'use strict';

    var data = [
        {
            "date": "2011-01",
            "value": 2
        },
        {
            "date": "2011-02",
            "value": 6
        },
        {
            "date": "2011-03",
            "value": 2
        },
        {
            "date": "2011-04",
            "value": 5
        },
        {
            "date": "2011-05",
            "value": 5
        },
        {
            "date": "2011-06",
            "value": 4
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
            "value": 6
        },
        {
            "date": "2011-10",
            "value": 5
        },
        {
            "date": "2011-11",
            "value": 4
        },
        {
            "date": "2011-12",
            "value": 5
        },
        {
            "date": "2012-01",
            "value": 1
        },
        {
            "date": "2012-03",
            "value": 6
        },
        {
            "date": "2012-04",
            "value": 4
        },
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
        }
    ];

    var containerSelector = '#chart-neckartalbruecke-accidents';
    var build = function () {
        var margin = {top: 10, right: 10, bottom: 20, left: 40},
            width = 300,
            height = 300,
            innerWidth = width - margin.left - margin.right,
            innerHeight = height - margin.top - margin.bottom,
            aspect = width / height,
            $container = $(containerSelector);

        var parseDate = d3.time.format("%Y-%m").parse;

        var x = d3.time.scale()
            .range([0, innerWidth]);

        var y = d3.scale.linear()
            .range([innerHeight, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .ticks(d3.time.years);

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks([5]);

        var area = d3.svg.area()
            .x(function (d) {
                return x(d.date);
            })
            .y0(innerHeight)
            .y1(function (d) {
                return y(d.value);
            })
            .interpolate('basis');

        var svg = d3.select(containerSelector).append("svg")
            .attr("viewBox", "0 0 " + width + " " + height)
            .attr("width", "100%")
            .attr("preserveAspectRatio", "xMinYMin");

        var containerGroup = svg
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        data.forEach(function (d) {
            d.date = parseDate(d.date);
        });

        x.domain(d3.extent(data, function (d) {
            return d.date;
        }));
        y.domain([0, d3.max(data, function (d) {
            return d.value;
        })]);

        var areaPath = containerGroup.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("d", area)
            .attr("transform", "translate(0, 230) scale(0, 0)");

        containerGroup.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + innerHeight + ")")
            .call(xAxis);

        containerGroup.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Unfälle");

        var activated = false;
        var onActivation = function () {
            if (activated) {
                return true;
            }
            areaPath.transition()
                .duration(300)
                .attr("transform", "translate(0, 0) scale(1, 1)");
            activated = true;
        };
        $container.closest('.card').on('active', onActivation);

        var onResize = function () {
            var targetWidth = $container.width();
            svg.attr("height", Math.round(targetWidth / aspect));
        };
        $(window).on("resize", onResize);
        onResize();
    };

    app.charts.neckartalbrueckeAccidents = {
        'init': build
    };
})
(d3, jQuery, app);