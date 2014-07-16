(function (d3, $, app) {
    'use strict';

    var data = [
        {
            year: '1970',
            values: [8494, 9754, 945]
        },
        {
            year: '1980',
            values: [5124, 7113, 804]
        },
        {
            year: '1990',
            values: [2205, 4765, 936]
        },
        {
            year: '2000',
            values: [1829, 4767, 907]
        },
        {
            year: '2012',
            values: [1062, 2151, 387]
        }
    ];
    var streetTypes = ['Innerorts', 'Außerorts (ohne BAB)', 'Autobahn'];

    var containerSelector = '#chart-deaths';
    var build = function () {
        var margin = {top: 10, right: 10, bottom: 20, left: 60},
            width = 300,
            height = 250,
            innerWidth = width - margin.left - margin.right,
            innerHeight = height - margin.top - margin.bottom,
            aspect = width / height,
            $container = $(containerSelector);

        var barData = [];
        data.forEach(function (entry) {
            var sum = 0;
            entry.values.forEach(function (value, index) {
                barData.push({
                    'year': entry.year,
                    'value': value,
                    'start': sum,
                    'streetTypeIndex': index
                });
                sum += value;
            })
        });

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
            return d.year;
        }));
        y.domain([0, d3.max(barData, function (d) {
            return d.value + d.start;
        })]);

        containerGroup.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + innerHeight + ")")
            .call(xAxis);

        containerGroup.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        var colors = ['#D76043', '#E4842C', '#D5C210'];

        var bars = containerGroup.selectAll(".bar")
            .data(barData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.year);
            })
            .attr("width", x.rangeBand())
            .attr("y", function () {
                return y(0);
            })
            .attr("height", 0)
            .style("fill", function (d) {
                return colors[d.streetTypeIndex];
            });

        var legend = containerGroup.selectAll(".legend")
            .data(streetTypes)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) {
                return "translate(0," + i * 20 + ")";
            });

        legend.append("rect")
            .attr("x", innerWidth - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function (d, i) {
                return colors[i];
            });

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
                    return y(d.value + d.start);
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

    app.charts.deaths = {
        'init': build
    };
})
(d3, jQuery, app);