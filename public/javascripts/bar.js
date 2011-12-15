/*jslint vars: false, browser: true */
/*global d3 */

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
        };

    // Public functions
    return {
        chart: init
    };
}());
