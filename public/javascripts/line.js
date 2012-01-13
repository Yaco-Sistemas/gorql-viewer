/*jslint vars: false */
/*global d3: true, exports: true, require, window: true, document: true, module, DV: true */

if (!DV) {
    var DV = {};
}

DV.merge = function (source, destination) {
    "use strict";

    var key;

    for (key in source) {
        if (source.hasOwnProperty(key)) {
            if (!destination[key]) {
                destination[key] = source[key];
            }
        }
    }
};

DV.merge((function () {
    "use strict";

    var svg,
        nElems,
        nSeries,
        xScale,
        yScale,
        size = {},

        render = function (labels, series, area) {
            var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .ticks(nElems)
                    .tickFormat(function (d, idx) {
                        if (idx < labels.length) {
                            return labels[idx];
                        }
                        return '';
                    }),
                yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .tickFormat(d3.format(".0f")),
                serie,
                line = d3.svg.line()
                    //.interpolate("monotone")
                    .x(function (d, idx) { return xScale(idx); })
                    .y(function (d) { return Math.floor(yScale(d)); }),
                i;

            if (area) {
                area = d3.svg.area()
                    //.interpolate("monotone")
                    .x(function (d, idx) { return xScale(idx); })
                    .y0(size.y - size.offset)
                    .y1(function (d) { return Math.floor(yScale(d)); });
            }

            // Add the clip path.
            svg.append("svg:clipPath")
                .attr("id", "clip")
                .append("svg:rect")
                .attr("width", size.x)
                .attr("height", size.y - size.offset);

            // Add the x-axis.
            svg.append("svg:g")
                .attr("class", "x axis")
                .attr("transform", "translate(" + size.xpadding / 2 + "," + (size.y - size.offset) + ")")
                .call(xAxis);

            // Rotate labels in the x-axis
            svg.selectAll(".x.axis text")
                .attr("text-anchor", "start")
                .attr("transform", "rotate(-90)")
                .attr("dx", -size.offset)
                .attr("dy", -7);

            // Add the y-axis.
            svg.append("svg:g")
                .attr("class", "y axis")
                .call(yAxis);

            // Move labels in the y-axis
            svg.selectAll(".y.axis text")
                .attr("text-anchor", "start")
                .attr("dx", 9)
                .attr("dy", -3);

            // Add helping lines
            svg.selectAll(".y.axis line.tick")
                .attr("x1", 0)
                .attr("x2", size.x);

            for (i = 0; i < series.length; i += 1) {
                serie = series[i];

                // Add the line path.
                svg.append("svg:path")
                    .attr("class", "line serie" + i)
                    .attr("clip-path", "url(#clip)")
                    .attr("d", line(serie))
                    .attr("transform", "translate(" + size.xpadding / 2 + ",0)");

                if (area) {
                    // Add the area path.
                    svg.append("svg:path")
                        .attr("class", "area serie" + i)
                        .attr("clip-path", "url(#clip)")
                        .attr("d", area(serie))
                        .attr("transform", "translate(" + size.xpadding / 2 + ",0)");
                }
            }
        },

        init = function (container, labels, series, options) {
            var area = options.area === 'true';

            if (series.length <= 0 || series[0].length <= 0) {
                return;
            }

            nElems = labels.length;
            nSeries = series.length;

            size.x = parseInt(options.sizeX, 10);
            size.xpadding = size.x / (nElems + 1); // to avoid cropping labels
            size.y = parseInt(options.sizeY, 10);
            size.offset = parseInt(options.sizeLabel, 10);

            xScale = d3.scale.linear()
                .domain([0, nElems - 1])
                .range([0, size.x - size.xpadding]);

            yScale = d3.scale.linear()
                .domain([d3.max(d3.merge(series)), 0])
                .range([0, size.y - size.offset]);

            // Create the svg root node
            svg = d3.select(container).append("svg:svg")
                .attr("class", "chart line")
                .attr("width", size.x)
                .attr("height", size.y);

            render(labels, series, area);
        },

        node = function (data, options) {
            init(document.body, data.labels, data.values, options);
        },

        chart = function (container, data_container, options) {
            var data = DV.extractData(data_container, options);
            init(container, data.labels, data.series, options);
        };

    // Public functions
    return {
        line: chart,
        node: node
    };
}()), DV);

if (typeof module !== 'undefined' && module.exports) {
    // Node
    var window,
        document,
        d3;
} else {
    // Browser
    window.exports = {};
}

exports.chart = function (data, options) {
    "use strict";

    var jsdom = require("jsdom").jsdom;
    document = jsdom("<html><head></head><body></body></html>");
    window = document.createWindow();
    d3 = require("./d3")(window, document);
    DV.node(data, options);
    return document.body.innerHTML;
};
