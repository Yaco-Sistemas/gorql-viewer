/*jslint vars: false */
/*global d3: true, exports: true, require, window: true, document: true, module */

var DV = (function () {
    "use strict";

    var svg,
        positions = {},
        labelScale,

        getSectorColor = function (i) {
            return "color" + i;
        },

        render = function (labels, pie) {
            var radius = d3.min([positions.centerX, positions.centerY]),
                arc = d3.svg.arc()
                    .startAngle(function (d) { return d.startAngle; })
                    .endAngle(function (d) { return d.endAngle; })
                    .innerRadius(0)
                    .outerRadius(radius);

            // Paint the pie
            svg.selectAll("path.sector")
                .data(pie, function (d) { return d.data; })
                .enter().append("path")
                .attr("d", arc)
                .attr("class", function (d, i) { return "sector " + getSectorColor(i); })
                .attr("transform", "translate(" + positions.centerX + ", " + positions.centerY + ")");

            // Paint the labels
            svg.selectAll("rect.label")
                .data(pie, function (d) { return d.data; })
                .enter().append("svg:rect")
                .attr("class", function (d, i) { return "label " + getSectorColor(i); })
                .attr("x", positions.labels + 10)
                .attr("y", function (d, i) { return Math.floor(labelScale(i)); })
                .attr("width", 15)
                .attr("height", 15);

            svg.selectAll("text.label")
                .data(labels)
                .enter().append("svg:text")
                .attr("class", "label")
                .attr("x", positions.labels + 10)
                .attr("dx", 20)
                .attr("dy", 10)
                .attr("y", function (d, i) { return Math.floor(labelScale(i)); })
                .text(String);
        },

        init = function (container, labels, values, options) {
            var pie;

            if (values.length <= 0) {
                return;
            }

            values = d3.merge(values); // pie charts doesn't support series

            pie = d3.layout.pie()(values);

            positions.labels = parseInt(options.sizeX, 10) - parseInt(options.sizeLabel, 10);
            positions.centerX = (parseInt(options.sizeX, 10) - parseInt(options.sizeLabel, 10)) / 2;
            positions.centerY = parseInt(options.sizeY, 10) / 2;

            labelScale = d3.scale.linear()
                .domain([0, values.length - 1])
                .range([20, parseInt(options.sizeY, 10) - 20]);

            // Create the svg root node
            svg = d3.select(container).append("svg:svg")
                .attr("class", "chart pie")
                .attr("width", parseInt(options.sizeX, 10)) // original sizes
                .attr("height", parseInt(options.sizeY, 10));

            render(labels, pie);
        },

        node = function (data, options) {
            init(document.body, data.labels, data.values, options);
        };

    // Public functions
    return {
        chart: init,
        node: node
    };
}());

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
    require("./d3.layout")(d3);
    DV.node(data, options);
    return document.body.innerHTML;
};
