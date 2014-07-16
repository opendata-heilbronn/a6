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
    var heavyTrafficData = [
        {
            direction: 'W',
            percent: 19.4
        },
        {
            direction: 'E',
            percent: 22.6
        },
        {
            direction: 'S',
            percent: 11.1
        },
        {
            direction: 'N',
            percent: 14.8
        }
    ];

    var build = function () {
        buildOne('#chart-weinsberg-flow');
        buildOne('#chart-weinsberg-flow-hohenlohe');
    };
    var buildOne = function (containerSelector) {
        var margin = {top: 32, right: 32, bottom: 32, left: 32},
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
                x: 15,
                y: height / 2,
                anchor: 'middle',
                rotate: 270,
                entry: data[0]
            },
            {
                x: width - 15,
                y: height / 2,
                anchor: 'middle',
                rotate: 90,
                entry: data[1]
            },
            {
                x: width / 2,
                y: height - 20,
                anchor: 'middle',
                entry: data[2]
            },
            {
                x: width / 2,
                y: 15,
                anchor: 'middle',
                entry: data[3]
            }
        ];

        var labels = svg.selectAll('.direction')
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
            });

        var formatValue = d3.format(",");

        labels.append("tspan")
            .style("font-size", function (d) {
                if (d.entry.direction === "S") return "11px";
            })
            .text(function (d) {
                return d.entry.direction !== "S" ? d.entry.label : formatValue(d.entry.value);
            });

        labels.append("tspan")
            .attr("x", function (d) {
                return d.x;
            })
            .attr("dy", "1.2em")
            .style("font-size", function (d) {
                if (d.entry.direction !== "S") return "11px";
            })
            .text(function (d) {
                return d.entry.direction !== "S" ? formatValue(d.entry.value) : d.entry.label;
            });

        svg.append("text")
            .attr("x", 0)
            .attr("y", 15)
            .style("font-size", "11px")
            .text("Kfz / 24h");

        var bars = containerGroup.selectAll(".traffic-bar")
            .data(data)
            .enter()
            .append("line")
            .attr("class", "bar traffic-bar")
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

        var heavyTrafficBars = containerGroup.selectAll(".heavy-traffic-bar")
            .data(heavyTrafficData)
            .enter()
            .append("line")
            .attr("class", "bar heavy-traffic-bar")
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
            .style("stroke", '#FF8C00');

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

        var vehicleTypes = [
            {
                label: 'LKW',
                color: '#FF8C00'
            },
            {
                label: 'Sonstige',
                color: '#044795'
            }
        ];

        var legend = svg.selectAll(".legend")
            .data(vehicleTypes)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) {
                return "translate(0," + (i * 20 + 4) + ")";
            });

        legend.append("rect")
            .attr("x", width - 13)
            .attr("width", 13)
            .attr("height", 13)
            .style("fill", function (d) {
                return d.color;
            });

        legend.append("text")
            .attr("x", width - 17)
            .attr("y", 7)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .style("font-size", "11px")
            .text(function (d) {
                return d.label;
            });

        var activated = false;
        var onActivation = function () {
            if (activated) {
                return true;
            }
            bars.transition().duration(2000).ease("easeOutCubic")
                .attr("x2", function (d) {
                    return generateBarX(d, scale(d.value) + 7);
                })
                .attr("y2", function (d) {
                    return generateBarY(d, scale(d.value) + 7);
                });
            heavyTrafficBars.transition().duration(2000).ease("easeOutCubic")
                .attr("x2", function (d, i) {
                    var dataEntry = data[i];
                    return generateBarX(d, scale(dataEntry.value * d.percent / 100) + 7);
                })
                .attr("y2", function (d, i) {
                    var dataEntry = data[i];
                    return generateBarY(d, scale(dataEntry.value * d.percent / 100) + 7);
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