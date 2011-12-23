/*jslint vars: false */
/*global d3: true, exports: true, require, window: true, document: true, module */

var DV = (function () {
    "use strict";

    var svg,
        center = {
            x: 0,
            y: 0
        },
        scale, // for opacity only

        render = function (labels, pie) {
            var radius = d3.min([center.x, center.y]),
                arc = d3.svg.arc()
                    .startAngle(function (d) { return d.startAngle; })
                    .endAngle(function (d) { return d.endAngle; })
                    .innerRadius(0)
                    .outerRadius(radius);

            // Paint the pie
            svg.selectAll("path")
                .data(pie, function (d) { return d.data; })
                .enter().append("path")
                .attr("d", arc)
                .attr("class", "arc")
                .style("opacity", function (d) { return scale(d.data); })
                .attr("transform", "translate(" + center.x + ", " + center.y + ")");

            // Paint the labels
            // TODO
        },

        init = function (container, labels, values, options) {
            var pie;

            if (values.length <= 0) {
                return;
            }

            values = d3.merge(values); // pie charts doesn't support series

            pie = d3.layout.pie()(values);

            center.x = parseInt(options.sizeX, 10) / 2;
            center.y = parseInt(options.sizeY, 10) / 2;

            scale = d3.scale.sqrt()
                .domain([0, d3.max(values)])
                .range([0.25, 1]);

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
