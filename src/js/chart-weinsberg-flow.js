(function (d3, $, app) {
    'use strict';

    var data = [
        {
            label: 'Neckarsulm',
            direction: 'W',
            value: 97236
        },
        {
            label: 'Schwabbach',
            direction: 'E',
            value: 61438
        },
        {
            label: 'Pleidelsheim',
            direction: 'S',
            value: 102743
        },
        {
            label: 'Neuenstadt',
            direction: 'N',
            value: 35607
        }
    ];

    var containerSelector = '#chart-weinsberg-flow';
    var build = function () {
        var margin = {top: 10, right: 10, bottom: 10, left: 10},
            width = 300,
            height = 300,
            innerWidth = width - margin.left - margin.right,
            innerHeight = height - margin.top - margin.bottom,
            aspect = width / height,
            center = [innerWidth / 2, innerHeight / 2],
            barMaxWidth = center[0] - 15,
            $container = $(containerSelector);

        var scale = d3.scale.linear()
            .range([0, barMaxWidth]);

        var svg = d3.select(containerSelector).append("svg")
            .attr("viewBox", "0 0 " + width + " " + height)
            .attr("width", "100%")
            .attr("preserveAspectRatio", "xMinYMin");

        var containerGroup = svg
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        scale.domain([0, d3.max(data, function (d) {
            return d.value;
        })]);

        var generateBarX2 = function (d) {
            if (d.direction === "W") {
                return center[0] - scale(d.value);
            }
            if (d.direction === "E") {
                return center[0] + scale(d.value);
            }
            return center[0];
        };
        var generateBarY2 = function (d) {
            if (d.direction === "N") {
                return center[1] - scale(d.value);
            }
            else if (d.direction === "S") {
                return center[1] + scale(d.value);
            }
            return center[1];
        };

        var circleRadiusList = [(innerWidth / 2), (innerWidth / 3), 25];

        containerGroup.selectAll(".windrose")
            .data(circleRadiusList)
            .enter()
            .append("circle")
            .attr("class", "windrose")
            .attr("r", function (d) {
                return d;
            })
            .attr("cx", center[0])
            .attr("cy", center[1]);

        containerGroup.selectAll(".bar")
            .data(data)
            .enter()
            .append("line")
            .attr("class", "bar")
            .attr("x1", center[0])
            .attr("y1", center[1])
            .attr("x2", generateBarX2)
            .attr("y2", generateBarY2);

        var onResize = function () {
            var targetWidth = $container.width();
            svg.attr("height", Math.round(targetWidth / aspect));
        };
        $(window).on("resize", onResize);
        onResize();
    };

    app.charts.weinsbergFlow = {
        'init': build
    };
})
(d3, jQuery, app);