(function (d3, $, app) {
    'use strict';

    var data = [
        {
            label: '2013',
            value: 2939
        },
        {
            label: '2014',
            value: 3851
        }
    ];

    var containerSelector = '#chart-fuerfeld-traffic';
    var build = function () {
        var margin = {top: 10, right: 10, bottom: 20, left: 50},
            width = 300,
            height = 250,
            innerWidth = width - margin.left - margin.right,
            innerHeight = height - margin.top - margin.bottom,
            aspect = width / height,
            $container = $(containerSelector);

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, innerWidth], .1);

        var y = d3.scale.linear()
            .range([innerHeight, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickFormat(d3.format(",.0f"));

        var svg = d3.select(containerSelector).append("svg")
            .attr("viewBox", "0 0 " + width + " " + height)
            .attr("width", "100%")
            .attr("preserveAspectRatio", "xMinYMin");

        var containerGroup = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(data.map(function (d) {
            return d.label;
        }));
        y.domain([0, d3.max(data, function (d) {
            return d.value;
        })]);

        var colors = {
            2013: '#fdae61',
            2014: '#f46d43'
        };

        containerGroup.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + innerHeight + ")")
            .call(xAxis);

        containerGroup.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        var bars = containerGroup.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.label);
            })
            .attr("width", x.rangeBand())
            .attr("y", function (d) {
                return y(0);
            })
            .attr("height", 0)
            .attr("style", function (d) {
                return 'fill:' + colors[d.label];
            });

        var activated = false;
        var onActivation = function () {
            if (activated) {
                return true;
            }
            bars.transition()
                .attr("y", function (d) {
                    return y(d.value);
                })
                .attr("height", function (d) {
                    return innerHeight - y(d.value);
                });
            activated = true;
        };

        var onResize = function () {
            var targetWidth = $container.width();
            svg.attr("height", Math.round(targetWidth / aspect));
        };
        $(window).on("resize", onResize);
        $container.closest('.card').on('active', onActivation);
        onResize();
    };

    app.charts.fuerfeldTraffic = {
        'init': build
    };
})
(d3, jQuery, app);