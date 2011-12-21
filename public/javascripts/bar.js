/*jslint vars: false */
/*global d3: true, exports: true, require, window: true, document: true, module */

var DV = (function () {
    "use strict";

    var svg,
        elems,
        scale = {
            x: null,
            y: null
        },
        size = {
            x: null,
            y: null
        },
        config,
        portrait = {
            rectWidth: function () {
                return size.x / elems;
            },
            rectHeight: function (d, i) {
                return scale.y(d);
            },
            rectX: function (d, i) {
                return scale.x(i);
            },
            rectY: function (d, i) {
                return size.y - portrait.rectHeight(d, i);
            },
            textX: function (d, i) {
                return portrait.rectX(d, i) + (portrait.rectWidth() / 2);
            },
            textY: function (d, i) {
                return size.y - portrait.rectHeight(d, i);
            },
            textDX: -10,
            textDY: ".35em",
            textTAnchor: "end",
            textTransform: function (d, i) {
                var x = portrait.textX(d, i),
                    y = portrait.textY(d, i);
                return "rotate(-90 " + x + " " + y + ")";
            },
            lineTicks: function () {
                return scale.y.ticks(10);
            },
            lineX1: function () {
                return 0;
            },
            lineX2: function () {
                return size.x;
            },
            lineY1: function () {
                return function (i) {
                    return size.y - scale.y(i);
                };
            },
            lineY2: function () {
                return portrait.lineY1();
            },
            lineDX: 0,
            lineDY: -3,
            labelX: function (d, i) {
                return portrait.textX(d, i);
            },
            labelY: function (d, i) {
                return size.y + size.offset;
            },
            labelTransform: function (d, i) {
                var x = portrait.labelX(d, i),
                    y = portrait.labelY(d, i);
                return "rotate(-90 " + x + " " + y + ")";
            },
            labelDX: 0
        },
        landscape = {
            rectHeight: function () {
                return size.y / elems;
            },
            rectWidth: function (d, i) {
                return scale.x(d);
            },
            rectY: function (d, i) {
                return scale.y(i);
            },
            rectX: 0,
            textY: function (d, i) {
                return landscape.rectY(d, i) + (landscape.rectHeight() / 2);
            },
            textX: function (d, i) {
                return landscape.rectWidth(d, i);
            },
            textDX: -10,
            textDY: ".35em",
            textTAnchor: "end",
            textTransform: "",
            lineTicks: function () {
                return scale.x.ticks(10);
            },
            lineX1: function () {
                return scale.x;
            },
            lineX2: function () {
                return scale.x;
            },
            lineY1: function () {
                return 0;
            },
            lineY2: function () {
                return size.y;
            },
            lineDX: 5,
            lineDY: 10,
            labelX: function (d, i) {
                return -1 * size.offset;
            },
            labelY: function (d, i) {
                return landscape.textY(d, i);
            },
            labelTransform: "",
            labelDX: 0
        },

        render = function (labels, data) {
            // Paint aux lines that help measuring
            svg.selectAll("line")
                .data(config.lineTicks())
                .enter().append("svg:line")
                .attr("x1", config.lineX1())
                .attr("x2", config.lineX2())
                .attr("y1", config.lineY1())
                .attr("y2", config.lineY2());

            // Paint the name of the helping lines
            svg.selectAll("text.rule")
                .data(config.lineTicks())
                .enter().append("svg:text")
                .attr("class", "rule")
                .attr("x", config.lineX1())
                .attr("y", config.lineY1())
                .attr("dx", config.lineDX)
                .attr("dy", config.lineDY)
                .attr("text-anchor", "start")
                .text(String);

            // Paint the bars
            svg.selectAll("rect")
                .data(data)
                .enter().append("svg:rect")
                .attr("x", config.rectX)
                .attr("y", config.rectY)
                .attr("width", config.rectWidth)
                .attr("height", config.rectHeight);

            // Paint the values on the bars
            svg.selectAll("text.value")
                .data(data)
                .enter().append("svg:text")
                .attr("class", "value")
                .attr("x", config.textX)
                .attr("y", config.textY)
                .attr("dx", config.textDX)
                .attr("dy", config.textDY)
                .attr("text-anchor", config.textTAnchor)
                .attr("transform", config.textTransform)
                .text(String);

            // Paint labels
            svg.selectAll("text.label")
                .data(labels)
                .enter().append("svg:text")
                .attr("class", "label")
                .attr("x", config.labelX)
                .attr("y", config.labelY)
                .attr("dx", config.labelDX)
                .attr("dy", config.textDY)
                .attr("text-anchor", "start")
                .attr("transform", config.labelTransform)
                .text(String);
        },

        init = function (container, labels, values, options) {
            var i,
                width,
                height,
                transform;

            elems = values.length;

            size.x = options.sizeX;
            size.y = options.sizeY;
            size.offset = options.sizeLabel;

            // Create dynamically the scales
            if (options.landscape) {
                config = landscape;
                size.x -= size.offset;
                scale.x = d3.scale.linear()
                    .domain([0, d3.max(values)])
                    .range([0, size.x]);
                scale.y = d3.scale.linear()
                    .domain([0, values.length])
                    .range([0, size.y]);
                transform = "translate(" + size.offset + ", 0)";
            } else {
                config = portrait;
                size.y -= size.offset;
                scale.x = d3.scale.linear()
                    .domain([0, values.length])
                    .range([0, size.x]);
                scale.y = d3.scale.linear()
                    .domain([0, d3.max(values)])
                    .range([0, size.y]);
                transform = "";
            }

            // Create the svg root node
            svg = d3.select(container).append("svg:svg")
                .attr("class", "chart bar")
                .attr("width", options.sizeX) // original sizes
                .attr("height", options.sizeY)
                .append("svg:g")
                .attr("transform", transform);

            render(labels, values);
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
