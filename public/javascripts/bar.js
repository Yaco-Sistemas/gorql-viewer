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

            svg.selectAll("text")
                .data(data)
                .enter().append("svg:text")
                .attr("x", x)
                .attr("y", function (d, i) { return (i * 20) + 10; })
                .attr("dx", -3) // padding-right
                .attr("dy", ".35em") // vertical-align: middle
                .attr("text-anchor", "end") // text-align: right
                .text(String);
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
