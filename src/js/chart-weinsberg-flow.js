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

    var build = function () {
        buildOne('#chart-weinsberg-flow');
        buildOne('#chart-weinsberg-flow-hohenlohe');
    };
    var buildOne = function (containerSelector) {
        var margin = {top: 25, right: 25, bottom: 25, left: 25},
            width = 300,
            height = 300,
            innerWidth = width - margin.left - margin.right,
            innerHeight = height - margin.top - margin.bottom,
            aspect = width / height,
            center = [innerWidth / 2, innerHeight / 2],
            barMaxWidth = center[0] - 10,
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

        var maxValue = d3.max(data, function (d) {
            return d.value;
        });
        scale.domain([0, maxValue]);

        var color = d3.scale.linear()
            .domain([0, maxValue])
            .range(["#7C8FDB", "#06458F"]);

        var generateBarX = function (d, constant) {
            if (d.direction === "W") {
                return center[0] - constant;
            }
            if (d.direction === "E") {
                return center[0] + constant;
            }
            return center[0];
        };
        var generateBarY = function (d, constant) {
            if (d.direction === "N") {
                return center[1] - constant;
            }
            else if (d.direction === "S") {
                return center[1] + constant;
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

        var directionLabelList = [
            {
                label: 'Neuenstadt',
                x: width / 2,
                y: 15,
                anchor: 'middle'
            },
            {
                label: 'Schwabbach',
                x: width - 15,
                y: height / 2,
                anchor: 'middle',
                rotate: 90
            },
            {
                label: 'Pleidelsheim',
                x: width / 2,
                y: height,
                anchor: 'middle'
            },
            {
                label: 'Neckarsulm',
                x: 15,
                y: height / 2,
                anchor: 'middle',
                rotate: 270
            }
        ];

        svg.selectAll('.direction')
            .data(directionLabelList)
            .enter()
            .append("text")
            .attr("class", "direction")
            .attr("x", function (d) {
                return d.x;
            })
            .attr("y", function (d) {
                return d.y;
            })
            .attr("text-anchor", function (d) {
                return d.anchor;
            })
            .attr("transform", function (d) {
                return d.rotate ? "rotate(" + d.rotate + " " + d.x + " " + d.y + ")" : "";
            })
            .text(function (d) {
                return d.label;
            });

        var bars = containerGroup.selectAll(".bar")
            .data(data)
            .enter()
            .append("line")
            .attr("class", "bar")
            .attr("x1", function (d) {
                return generateBarX(d, 7);
            })
            .attr("y1", function (d) {
                return generateBarY(d, 7);
            })
            .attr("x2", function (d) {
                return generateBarX(d, 7);
            })
            .attr("y2", function (d) {
                return generateBarY(d, 7);
            })
            .style("stroke", function (d) {
                return color(d.value);
            });

        containerGroup.selectAll(".orientation-line")
            .data(data)
            .enter()
            .append("line")
            .attr("class", "orientation-line")
            .attr("x1", function (d) {
                return generateBarX(d, 0);
            })
            .attr("y1", function (d) {
                return generateBarY(d, 0);
            })
            .attr("x2", function (d) {
                return generateBarX(d, 7);
            })
            .attr("y2", function (d) {
                return generateBarY(d, 7);
            })
            .style("stroke", function (d) {
                return color(d.value);
            });

        var activated = false;
        var onActivation = function () {
            if (activated) {
                return true;
            }
            bars.transition().duration(600)
                .attr("x2", function (d) {
                    return generateBarX(d, scale(d.value) + 7);
                })
                .attr("y2", function (d) {
                    return generateBarY(d, scale(d.value) + 7);
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

    app.charts.weinsbergFlow = {
        'init': build
    };
})
(d3, jQuery, app);