/*jslint vars: false */
/*global d3: true, exports: true, require, window: true, document: true */

var DV = (function () {
    "use strict";

    var svg,
        x,

        render = function (data) {
            svg.selectAll("rect")
                .data(data)
                .enter().append("svg:rect")
                .attr("y", function (d, i) { return i * 20; })
                .attr("width", x)
                .attr("height", 20);
        },

        init = function (container, data, options) {
            svg = d3.select(container).append("svg:svg")
                .attr("class", "chart bar")
                .attr("width", 420)
                .attr("height", 20 * data.length);

            x = d3.scale.linear()
                .domain([0, d3.max(data)])
                .range([0, 420]);

            render(data);
        },

        node = function (data, options) {
            init(document.body, data, options);
        };

    // Public functions
    return {
        chart: init,
        node: node
    };
}());

if (exports === undefined) {
    // Browser
    exports = {};
} else {
    // Node
    var window,
        document,
        d3;
}

exports.chart = function (data, options) {
    "use strict";

    var jsdom = require("jsdom").jsdom;
    document = jsdom("<html><head></head><body></body></html>");
    d3 = require("d3")(document);
    DV.node(data, options);
    console.log(document.body.innerHTML);
};
