(function (d3, $, app) {
    'use strict';

    var data = [
        {
            label: '2011',
            value: 281337
        },
        {
            label: '2012',
            value: 287931
        },
        {
            label: '2013',
            value: 292553
        },
        {
            label: '2014',
            value: 297171
        }
    ];

    var containerSelector = '#chart-registered-cars';
    var build = function () {
        var margin = {top: 10, right: 10, bottom: 20, left: 70},
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
            .tickFormat(d3.format(",.0f"))
            .ticks([5]);

        var svg = d3.select(containerSelector).append("svg")
            .attr("viewBox", "0 0 " + width + " " + height)
            .attr("width", "100%")
            .attr("preserveAspectRatio", "xMinYMin");

        var containerGroup = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        x.domain(data.map(function (d) {
            return d.label;
        }));

        var maxValue = d3.max(data, function (d) {
            return d.value;
        });
        y.domain([0, maxValue]);

        var color = d3.scale.linear()
            .domain([d3.min(data, function (d) {
                return d.value;
            }), maxValue])
            .range(["#F1BC2B", "#C85F42"]);

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
            .attr("y", function () {
                return y(0);
            })
            .attr("height", 0)
            .style("fill", function (d) {
                return color(d.value);
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
        $container.closest('.card').on('active', onActivation);

        var onResize = function () {
            var targetWidth = $container.width();
            svg.attr("height", Math.round(targetWidth / aspect));
        };
        $(window).on("resize", onResize);
        onResize();
    };

    app.charts.registeredCars = {
        'init': build
    };
})
(d3, jQuery, app);