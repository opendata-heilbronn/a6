(function (d3, $, app) {
    'use strict';

    var data = [
        {
            label: 'Neckarsulm',
            vehicles: [
                {
                    label: 'Kfz',
                    value: 96827
                },
                {
                    label: 'Lkw',
                    value: 18798
                }
            ]
        },
        {
            label: 'Durchschnitt',
            vehicles: [
                {
                    label: 'Kfz',
                    value: 33052
                },
                {
                    label: 'Lkw',
                    value: 4095
                }
            ]
        }
    ];
    var vehicleTypes = ['Kfz', 'Lkw'];

    var containerSelector = '#chart-overview-trucks';
    var build = function () {
        var margin = {top: 10, right: 10, bottom: 20, left: 60},
            width = 300,
            height = 250,
            innerWidth = width - margin.left - margin.right,
            innerHeight = height - margin.top - margin.bottom,
            aspect = width / height,
            $container = $(containerSelector);

        var x0 = d3.scale.ordinal()
            .rangeRoundBands([0, innerWidth], .1);

        var x1 = d3.scale.ordinal();

        var y = d3.scale.linear()
            .range([innerHeight, 0]);

        var color = d3.scale.ordinal()
            .range(["#F1BC2B", "#C85F42"]);

        var xAxis = d3.svg.axis()
            .scale(x0)
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

        x0.domain(data.map(function (d) {
            return d.label;
        }));
        x1.domain(vehicleTypes).rangeRoundBands([0, x0.rangeBand()]);
        y.domain([0, d3.max(data, function (d) {
            return d3.max(d.vehicles, function (d) {
                return d.value;
            });
        })]);

        containerGroup.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + innerHeight + ")")
            .call(xAxis);

        containerGroup.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        var reference = containerGroup.selectAll(".reference")
            .data(data)
            .enter().append("g")
            .attr("class", "reference")
            .attr("transform", function (d) {
                return "translate(" + x0(d.label) + ",0)";
            });

        var bars = reference.selectAll("rect")
            .data(function (d) {
                return d.vehicles;
            })
            .enter().append("rect")
            .attr("width", x1.rangeBand())
            .attr("x", function (d) {
                return x1(d.label);
            })
            .attr("y", function () {
                return y(0);
            })
            .attr("height", 0)
            .style("fill", function (d) {
                return color(d.label);
            });

        var legend = containerGroup.selectAll(".legend")
            .data(vehicleTypes)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) {
                return "translate(0," + i * 20 + ")";
            });

        legend.append("rect")
            .attr("x", innerWidth - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);

        legend.append("text")
            .attr("x", innerWidth - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function (d) {
                return d;
            });

        var activated = false;
        var onActivation = function () {
            if (activated) {
                return true;
            }
            bars.transition().duration(600)
                .attr("y", function (d) {
                    return y(d.value);
                })
                .attr("height", function (d) {
                    return innerHeight - y(d.value);
                });
            activated = true;
        };

        var onResize = function () {
            var targetWidth = $container.innerWidth();
            svg.attr("height", Math.round(targetWidth / aspect));
        };

        $container.closest('.card').on('active', onActivation).on("resize", onResize);
        $(window).on("resize", onResize);
        onResize();
    };

    app.charts.overviewTrucks = {
        'init': build
    };
})
(d3, jQuery, app);