/*jslint vars: false */
/*global d3: true, exports: true, require, window: true, document: true, module, alert, DV: true */

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
        positions = {},
        indexFromValue = {},
        labelFromValue = {},
        labelScale,

        getSectorColor = function (i) {
            return "color" + i;
        },

        highlightIn = function (d, i) {
            var label = labelFromValue[d.data],
                bbox = this.getBoundingClientRect(),
                x = bbox.left - bbox.right,
                y = bbox.top - bbox.bottom;

            svg.append("svg:text")
                .attr("class", "highlight")
                .attr("x", bbox.left)
                .attr("y", bbox.top)
//                 .attr("x", positions.centerX)
//                 .attr("y", positions.centerY)
//                 .attr("transform", "translate(" + x + "," + y + ")")
                .attr("text-anchor", "start")
                .text(label + ": " + d.data);
            this.style.opacity = 0.2;
        },

        highlightOut = function (d, i) {
            svg.selectAll("text.highlight")
                .remove();
            this.style.opacity = 1;
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
                .attr("transform", "translate(" + positions.centerX + ", " + positions.centerY + ")")
                .on("mouseover", highlightIn)
                .on("mouseout", highlightOut);

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
                .data(pie, function (d) { return d.data; })
                .enter().append("svg:text")
                .attr("class", "label")
                .attr("x", positions.labels + 10)
                .attr("dx", 20)
                .attr("dy", 10)
                .attr("y", function (d, i) { return Math.floor(labelScale(i)); })
                .text(function (d) { return labelFromValue[d.data]; });
        },

        compareOriginalIndexes = function (d1, d2) {
            var idx1 = indexFromValue[d1],
                idx2 = indexFromValue[d2];

            return idx1 - idx2;
        },

        init = function (container, labels, series, options) {
            var pie,
                i;

            if (series.length <= 0 || series[0].length <= 0) {
                return;
            }

            series = series[0]; // pie charts doesn't support series

            // Associate labels and values, it will be necessary later, while
            // painting the labels
            for (i = 0; i < series.length; i += 1) {
                indexFromValue[series[i]] = i;
                labelFromValue[series[i]] = labels[i];
                // TODO y si varios sectores tienen exactamente el mismo valor?
            }

            pie = d3.layout.pie();
            pie.sort(compareOriginalIndexes);
            pie = pie(series);

            positions.labels = parseInt(options.sizeX, 10) - parseInt(options.sizeLabel, 10);
            positions.centerX = (parseInt(options.sizeX, 10) - parseInt(options.sizeLabel, 10)) / 2;
            positions.centerY = parseInt(options.sizeY, 10) / 2;

            labelScale = d3.scale.linear()
                .domain([0, series.length - 1])
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
        },

        chart = function (container, data_container, options) {
            var data = DV.extractData(data_container, options);
            init(container, data.labels, data.series, options);
        };

    // Public functions
    return {
        chart: chart,
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
    require("./d3.layout")(d3);
    DV.node(data, options);
    return document.body.innerHTML;
};
