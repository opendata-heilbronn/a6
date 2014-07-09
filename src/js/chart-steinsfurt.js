(function (d3, $, app) {
    'use strict';

    var data = [
        {
            label: 'PKW',
            value: 75
        },
        {
            label: 'LKW',
            value: 9
        },
        {
            label: 'PKW und LKW',
            value: 38
        }
    ];

    var containerSelector = '#steinsfurt-pie-chart';
    var build = function () {
        var width = 300,
            height = 300,
            aspect = width / height,
            radius = Math.min(width, height) / 2,
            $container = $(containerSelector);

        var color = d3.scale.ordinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        var arc = d3.svg.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function (d) {
                return d.value;
            });

        var svg = d3.select(containerSelector).append("svg")
            .attr("viewBox", "0 0 " + width + " " + height)
            .attr("width", "100%")
            .attr("preserveAspectRatio", "xMinYMin");

        var containerGroup = svg
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var g = containerGroup.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function (d) {
                return color(d.data.value);
            });

        g.append("text")
            .attr("transform", function (d) {
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .text(function (d) {
                return d.data.label;
            });

        var onResize = function () {
            var targetWidth = $container.width();
            svg.attr("height", targetWidth / aspect);
        };
        $(window).on("resize", onResize);
        onResize();
    };

    app.charts.steinsfurt = {
        'init': build
    };
})
(d3, jQuery, app);