(function (d3, $, app) {
    'use strict';

    var arrows = [0, 24, 48];

    var containerSelector = '.th-arrow';
    var build = function () {
        var width = Modernizr.touch ? 104 : 185,
            height = Modernizr.touch ? 185 : 104,
            aspect = width / height,
            $container = $(containerSelector),
            container = d3.select(containerSelector);

        var svg = container.append("svg")
            .attr("viewBox", "0 0 " + width + " " + height)
            .attr("width", "100px")
            .attr("preserveAspectRatio", "xMinYMin");

        var group = svg.append("g");
        if (Modernizr.touch) {
            group.attr("transform", "rotate(270, 90, 92)");
        }

        var arrowLines = group.selectAll('polyline')
            .data(arrows)
            .enter().append('polyline')
            .attr('fill', 'none')
            .attr('stroke-width', 0)
            .attr('stroke-linecap', 'round')
            .attr('stroke-miterlimit', 10)
            .attr('points', function (d) {
                var y1 = d + 5;
                return '90,' + y1 + ' 90,' + y1 + ' 90,' + y1;
            });

        container.append("p").append("em").text(Modernizr.touch ? "nach rechts wischen (swipen)" : "weiterscrollen")

        var activated = false;
        var onActivation = function () {
            if (activated) {
                return true;
            }
            arrowLines.transition().duration(600)
                .attr('points', function (d) {
                    var y1 = d + 5, y2 = 52 + d;
                    return '180,' + y1 + ' 90,' + y2 + ' 5,' + y1;
                })
                .attr('stroke-width', 6);
            activated = true;
        };

        var onResize = function () {
            var targetWidth = Math.min(Modernizr.touch ? 80 : 200, $container.innerWidth());
            svg
                .attr("width", targetWidth)
                .attr("height", Math.round(targetWidth / aspect));
        };

        $container.closest('.card').on('active', onActivation).on("resize", onResize);
        $(window).on("resize", onResize);
        onResize();
    };

    app.charts.thArrows = {
        'init': build
    };
})
(d3, jQuery, app);