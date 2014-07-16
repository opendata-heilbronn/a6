(function (d3, $, app) {
    'use strict';

    var dataSets = {
        'a6': [
            {
                label: 'PKW',
                value: 96827
            },
            {
                label: 'LKW',
                value: 18798
            }
        ],
        'sinsheim': [
            {
                label: 'PKW',
                value: 151
            },
            {
                label: 'LKW',
                value: 107
            }
        ]
    };

    var containerSelector = '#chart-steinsfurt-truck-accidents';
    var data = [
        {
            label: 'PKW',
            value: 50
        },
        {
            label: 'LKW',
            value: 50
        }
    ], update = null;
    var build = function () {
        var width = 300,
            height = 300,
            aspect = width / height,
            radius = Math.min(width, height) / 2,
            $container = $(containerSelector);

        var color = d3.scale.ordinal()
            .range(["#F1BC2B", "#C85F42"]);

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

        var key = function (d) {
            return d.data.label;
        };

        var g = containerGroup.selectAll(".arc")
            .data(pie(data), key)
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .each(function (d) {
                this._current = d;
            })
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

        function arcTween(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function (t) {
                return arc(i(t));
            };
        }

        update = function (data) {
            g.data(pie(data), key);
            g.select("path").transition().duration(600).attrTween("d", arcTween).style("fill", function (d) {
                return color(d.data.value);
            });
            g.select("text").transition().duration(600).attr("transform", function (d) {
                return "translate(" + arc.centroid(d) + ")";
            });
        };

        var activated = false;
        var onActivation = function () {
            if (activated) {
                return true;
            }
            update(dataSets['a6']);
            activated = true;
        };

        var onResize = function () {
            var targetWidth = $container.width();
            svg.attr("height", Math.round(targetWidth / aspect));
        };
        $container.closest('.card').on('resize', onResize).on('active', onActivation);
        $(window).on("resize", onResize);
        onResize();
    };

    var show = function (dataSetId, button) {
        update(dataSets[dataSetId]);
        $(button).siblings().removeClass('active');
        $(button).addClass('active');
    };

    app.charts.steinsfurtTruckAccidents = {
        'init': build,
        'show': show
    };
})
(d3, jQuery, app);