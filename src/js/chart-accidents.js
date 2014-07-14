(function (d3, $, app) {
    'use strict';

    var build = function (containerSelector, data) {
        var margin = {top: 10, right: 10, bottom: 30, left: 30},
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
            .ticks(d3.time.months, 6)
            .tickFormat(d3.time.format("%b %y"));

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks([5]);

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

        var maxValue = d3.max(data, function (d) {
            return d.value;
        });
        x.domain(d3.extent(data, function (d) {
            return d.date;
        }));
        y.domain([0, maxValue]);
        var color = d3.scale.linear()
            .domain([0, maxValue])
            .range(["#7C8FDB", "#06458F"]);

        var barWidth = innerWidth / data.length;
        var bars = containerGroup.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.date);
            })
            .attr("width", barWidth)
            .attr("y", function () {
                return y(0);
            })
            .attr("height", 0)
            .attr("style", function (d) {
                return "fill: " + color(d.value);
            });

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

    app.charts.accidents = {
        'init': function () {
        },
        'build': build
    };
})
(d3, jQuery, app);