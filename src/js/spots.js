(function (d3, app) {
    'use strict';

    var scrolling = {
        buildCardScroll: function (selector) {
            var $element = $(selector);
            var activateCard = function (index) {
                $element.find('.card').removeClass('active');
                $element.find('.card-list').children().eq(index).addClass('active');
            };
            var cardScroll = new IScroll(selector, {
                scrollX: false,
                scrollY: true,
                momentum: false,
                snap: 'li',
                scrollbar: true,
                snapSpeed: 400,
                keyBindings: true,
                indicators: {
                    el: '.indicator'
                }
            });
            cardScroll.on('scrollEnd', function () {
                activateCard(this.currentPage.pageY);
            });
            activateCard(0);
            return cardScroll;
        },
        activatePaneScrolling: function () {
            var currentPaneId = 'spot-steinsfurt';
            var cardScroll = scrolling.buildCardScroll('#' + currentPaneId);
            var paneScroll = new IScroll('.panes', {
                scrollX: true,
                scrollY: false,
                momentum: false,
                snap: true,
                snapSpeed: 400,
                keyBindings: true
            });
            paneScroll.on('scrollEnd', function () {
                var paneId = $('.panes').find('.cards').eq(this.currentPage.pageX).attr('id');
                if (paneId !== currentPaneId) {
                    currentPaneId = paneId;
                    cardScroll.scrollTo(0, 0, 0);
                    cardScroll.destroy();
                    cardScroll = scrolling.buildCardScroll('#' + currentPaneId);
                }
            });

            document.addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, false);
        }
    };

    var steinsfurtPieChart = {
        data: [
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
        ],
        build: function () {
            var width = 280,
                height = 280,
                radius = Math.min(width, height) / 2;

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

            var svg = d3.select("#steinsfurt-pie-chart").append("svg")
                .attr("viewbox", "0 0 " + width + " " + height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            var g = svg.selectAll(".arc")
                .data(pie(this.data))
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

        }
    };

    var init = function () {
        steinsfurtPieChart.build();
        scrolling.activatePaneScrolling();
    };

    app.spots = {
        'init': init
    };
})
(d3, app);