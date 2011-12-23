/*jslint vars: false */
/*global d3: true, exports: true, require, window: true, document: true, module */

var DV = (function () {
    "use strict";

    var svg,

        render = function (labels, pie) {
            var arc = d3.svg.arc()
                .startAngle(function (d) {return d.startAngle})
                .endAngle(function (d) {return d.endAngle})
                .innerRadius(0)
                .outerRadius(225);

            svg.selectAll("path")
                .data(pie, function (d) {return d.data;})
                .enter().append("path")
                .attr("d", arc)
                .attr("class", "arc")
                .attr("transform", "translate(250, 250)");
        },

        init = function (container, labels, values, options) {
            var pie;

            if (values.length <= 0) {
                return;
            }

            values = d3.merge(values); // pie charts doesn't support series

            pie = d3.layout.pie()(values);

            // Create the svg root node
            svg = d3.select(container).append("svg:svg")
                .attr("class", "chart pie")
                .attr("width", options.sizeX) // original sizes
                .attr("height", options.sizeY);

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
    DV.node(data, options);
    return document.body.innerHTML;
};
