/*jslint vars: false */
/*global d3: true, exports: true, require, window: true, document: true, module, DV: true */

// Copyright 2012 Junta de Andalucia
//
// Developed by Yaco Sistemas <ablanco@yaco.es>
//
// Licensed under the EUPL, Version 1.1 or – as soon they
// will be approved by the European Commission - subsequent
// versions of the EUPL (the "Licence");
// You may not use this work except in compliance with the
// Licence.
// You may obtain a copy of the Licence at:
//
// http://joinup.ec.europa.eu/software/page/eupl
//
// Unless required by applicable law or agreed to in
// writing, software distributed under the Licence is
// distributed on an "AS IS" basis,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
// express or implied.
// See the Licence for the specific language governing
// permissions and limitations under the Licence.

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
        serieIdx,
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
                return (size.x / nElems) / nSeries;
            },
            rectHeight: function (d, i) {
                return scale.y(d);
            },
            rectX: function (d, i) {
                return scale.x(i) + portrait.serieOffset();
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
            textDY: ".35em",
            textTAnchor: "end",
            textTransform: function (d, i) {
                var x = portrait.textX(d, i),
                    y = portrait.textY(d, i);
                return "translate(0, 10) rotate(-90 " + x + " " + y + ")";
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
            labelDX: 0,
            serieOffset: function () {
                return portrait.rectWidth() * serieIdx;
            }
        },
        landscape = {
            rectHeight: function () {
                return (size.y / nElems) / nSeries;
            },
            rectWidth: function (d, i) {
                return scale.x(d);
            },
            rectY: function (d, i) {
                return scale.y(i) + landscape.serieOffset();
            },
            rectX: 0,
            textY: function (d, i) {
                return landscape.rectY(d, i) + (landscape.rectHeight() / 2);
            },
            textX: function (d, i) {
                return landscape.rectWidth(d, i);
            },
            textDY: ".35em",
            textTAnchor: "end",
            textTransform: "translate(-10, 0)",
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
            labelDX: 0,
            serieOffset: function () {
                return landscape.rectHeight() * serieIdx;
            }
        },

        render = function (labels, data) {
            var serie,
                rect,
                values;

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

            for (serieIdx = 0; serieIdx < data.length; serieIdx += 1) {
                serie = data[serieIdx];

                // Paint the bars
                svg.selectAll("rect.serie" + serieIdx)
                    .data(serie)
                    .enter().append("svg:rect")
                    .attr("class", "serie" + serieIdx)
                    .attr("x", config.rectX)
                    .attr("y", config.rectY)
                    .attr("width", config.rectWidth)
                    .attr("height", config.rectHeight);

                // Paint the values on the bars
                svg.selectAll("text.value.serie" + serieIdx)
                    .data(serie)
                    .enter().append("svg:text")
                    .attr("class", "value serie" + serieIdx)
                    .attr("x", config.textX)
                    .attr("y", config.textY)
                    .attr("dy", config.textDY)
                    .attr("text-anchor", config.textTAnchor)
                    .attr("transform", config.textTransform)
                    .text(String);
            }

            serieIdx = 0;

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

        init = function (d3, container, labels, series, options) {
            var transform;

            if (series.length <= 0 || series[0].length <= 0) {
                return;
            }

            nElems = labels.length;
            nSeries = series.length;

            size.x = parseInt(options.sizeX, 10);
            size.y = parseInt(options.sizeY, 10);
            size.offset = parseInt(options.sizeLabel, 10);

            // Create dynamically the scales
            if (options.landscape === 'true') {
                config = landscape;
                size.x -= size.offset;
                scale.x = d3.scale.linear()
                    .domain([0, d3.max(d3.merge(series))])
                    .range([0, size.x]);
                scale.y = d3.scale.linear()
                    .domain([0, nElems])
                    .range([0, size.y]);
                transform = "translate(" + size.offset + ", 0)";
            } else {
                config = portrait;
                size.y -= size.offset;
                scale.x = d3.scale.linear()
                    .domain([0, nElems])
                    .range([0, size.x]);
                scale.y = d3.scale.linear()
                    .domain([0, d3.max(d3.merge(series))])
                    .range([0, size.y]);
                transform = "";
            }

            // Create the svg root node
            svg = d3.select(container).append("svg:svg")
                .attr("class", "chart bar")
                .attr("width", parseInt(options.sizeX, 10)) // original sizes
                .attr("height", parseInt(options.sizeY, 10))
                .append("svg:g")
                .attr("transform", transform);

            render(labels, series);
        },

        node = function (document, d3, data, options) {
            init(d3, document.body, data.labels, data.values, options);
        },

        chart = function (container, data_container, options) {
            var data = DV.extractData(data_container, options);
            init(d3, container, data.labels, data.series, options);
        };

    // Public functions
    return {
        bar: chart,
        node: node
    };
}()), DV);

// Browser
exports = exports || {};

exports.chart = function (data, options) {
    "use strict";

    // Node
    var jsdom = require("jsdom").jsdom,
        window,
        document,
        d3;
    document = jsdom("<html><head></head><body></body></html>");
    window = document.createWindow();
    d3 = require("./d3")(window, document);
    DV.node(document, d3, data, options);
    return document.body.innerHTML;
};
