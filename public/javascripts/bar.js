/*jslint vars: false */
/*global d3: true, exports: true, require, window: true, document: true, module */

var DV = (function () {
    "use strict";

    var svg,
        scale,
        size = 500,
        config,
        portrait = {
            rectWidth: 20,
            rectHeight: function (d, i) {
                return scale(d);
            },
            rectX: function (d, i) {
                return i * 20;
            },
            rectY: function (d, i) {
                return 500 - scale(d);
            },
            textX: function (d, i) {
                return (i * 20) + 10;
            },
            textY: function (d, i) {
                return 500;
            },
            textDX: 3,
            textDY: ".35em",
            textTAnchor: "",
            textTransform: function (d, i) {
                var x = (i * 20) + 10,
                    y = 500;
                return "rotate(-90 " + x + " " + y + ")";
            }
        },
        landscape = {
            rectHeight: 20,
            rectWidth: function (d, i) {
                return scale(d);
            },
            rectY: function (d, i) {
                return i * 20;
            },
            rectX: 0,
            textY: function (d, i) {
                return (i * 20) + 10;
            },
            textX: function (d, i) {
                return scale(d);
            },
            textDX: -3,
            textDY: ".35em",
            textTAnchor: "end",
            textTransform: ""
        },

        render = function (data) {
            svg.selectAll("rect")
                .data(data)
                .enter().append("svg:rect")
                .attr("x", config.rectX)
                .attr("y", config.rectY)
                .attr("width", config.rectWidth)
                .attr("height", config.rectHeight);

            svg.selectAll("text")
                .data(data)
                .enter().append("svg:text")
                .attr("x", config.textX)
                .attr("y", config.textY)
                .attr("dx", config.textDX)
                .attr("dy", config.textDY)
                .attr("text-anchor", config.textTAnchor)
                .attr("transform", config.textTransform)
                .text(String);
        },

        init = function (container, labels, values, options) {
            var i,
                width = 20 * values.length,
                height = size;

            if (options.landscape) {
                config = landscape;
                height = 20 * values.length;
                width = size;
            } else {
                config = portrait;
            }

            svg = d3.select(container).append("svg:svg")
                .attr("class", "chart bar")
                .attr("width", width)
                .attr("height", height);

            scale = d3.scale.linear()
                .domain([0, d3.max(values)])
                .range([0, size]);

            render(values);
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
