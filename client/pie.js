/*jslint vars: false */
/*global d3, exports, DV */

// Copyright 2012 Yaco Sistemas S.L.
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

if (typeof DV === "undefined") {
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
        d3lib,
        sizes = {},
        positions = {},
        indexFromValue = {},
        labelFromIndex = {},
        labelScale,

        getSectorColor = function (i) {
            var palette = '';
            if (nElems >= 25) {
                palette = 'C';
            } else if (nElems >= 12) {
                palette = 'B';
            }
            return "serie" + palette + i;
        },

        highlightOut = function (d, i) {
            svg.selectAll("text.highlight")
                .remove();
            svg.selectAll("rect.highlight")
                .remove();
            svg.selectAll("path.highlight")
                .transition()
                .duration(500)
                .attr("transform", "translate(" + positions.centerX + "," + positions.centerY + ")")
                .attr("class", function () {
                    var className = this.getAttribute('class').match(/serie\w?\d+/);
                    return "sector " + className[0];
                });
        },

        highlightIn = function (d, i) {
            // Remove other highlights
            highlightOut(d, i);

            var label = labelFromIndex[i],
                angle = d.endAngle - d.startAngle,
                percentage = Math.round((angle * 100) / (2 * Math.PI)),
                tx,
                ty,
                text;

            angle = d.startAngle + (angle / 2); // bisec

            if (angle < (Math.PI / 2)) {
                // North East
                tx = Math.sin(angle);
                ty = -Math.cos(angle);
            } else if (angle < Math.PI) {
                // South East
                angle = angle - (Math.PI / 2);
                tx = Math.cos(angle);
                ty = Math.sin(angle);
            } else if (angle < ((3 * Math.PI) / 2)) {
                // South West
                angle = angle - Math.PI;
                tx = -Math.sin(angle);
                ty = Math.cos(angle);
            } else {
                // North West
                angle = angle - ((3 * Math.PI) / 2);
                tx = -Math.cos(angle);
                ty = -Math.sin(angle);
            }

            tx = tx * sizes.highlight; // hypotenuse
            ty = ty * sizes.highlight; // hypotenuse
            tx = positions.centerX + tx;
            ty = positions.centerY + ty;

            text = svg.append("svg:text")
                .attr("class", "highlight")
                .attr("x", positions.centerX)
                .attr("y", sizes.height)
                .attr("dy", -15)
                .attr("text-anchor", "middle")
                .attr("text-path", this.getAttribute(d))
                .text(label + ": " + d.data + " (" + percentage + "%)");
            text = text[0][0].getBBox();

            svg.insert("svg:rect", "text.highlight")
                .attr("class", "highlight")
                .attr("x", text.x - 15)
                .attr("y", text.y - 6)
                .attr("rx", 5)
                .attr("ry", 5)
                .attr("width", text.width + 30)
                .attr("height", text.height + 12)
                .attr("filter", "url(#dropshadow)");

            d3lib.select(this)
                .transition()
                .duration(500)
                .attr("transform", "translate(" + tx + "," + ty + ")");

            this.setAttribute("class", this.getAttribute("class") + " highlight");
        },

        render = function (labels, pie) {
            var radius = d3lib.min([(positions.centerX - sizes.highlight), (positions.centerY - sizes.highlight)]),
                arc = d3lib.svg.arc()
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
                .text(function (d, i) { return labelFromIndex[i]; });
        },

        compareOriginalIndexes = function (d1, d2) {
            var idx1 = indexFromValue[d1],
                idx2 = indexFromValue[d2];

            return idx1 - idx2;
        },

        init = function (d3, container, labels, series, options) {
            var viewport = d3.select(container),
                maxWidth = 0,
                labelsBB,
                pie,
                i,
                filter;

            if (series.length <= 0 || series[0].length <= 0) {
                return;
            }

            viewport.style("width", options.sizeX + 'px');
            viewport.style("height", options.sizeY + 'px');

            d3lib = d3;
            series = series[0]; // pie charts doesn't support series
            nElems = series.length;

            // Associate labels and values, it will be necessary later, while
            // painting the labels
            for (i = 0; i < series.length; i += 1) {
                indexFromValue[series[i]] = i;
                labelFromIndex[i] = labels[i];
            }

            pie = d3.layout.pie();
            pie.sort(compareOriginalIndexes);
            pie = pie(series);

            sizes = {
                width: parseInt(options.sizeX, 10),
                height: parseInt(options.sizeY, 10)
            };

            // Create the svg root node
            svg = viewport.append("svg:svg")
                .attr("class", "chart pie")
                .attr("width", sizes.width) // original sizes
                .attr("height", sizes.height);

            // Calculate required size for labels
            labelsBB = svg.selectAll("text.label")
                .data(labels)
                .enter().append("svg:text")
                .attr("class", "label")
                .attr("x", 0)
                .attr("y", 0)
                .attr("text-anchor", "start")
                .text(String);
            labelsBB.each(function (d, i) {
                var width = this.getBBox().width;
                if (width > maxWidth) {
                    maxWidth += width;
                }
            });
            labelsBB.remove();

            sizes.label = maxWidth;
            sizes.highlight = parseInt(options.sizeHighlight, 10);

            positions.labels = sizes.width - sizes.label;
            positions.centerX = (sizes.width - sizes.label) / 2;
            positions.centerY = (sizes.height / 2) - 25;

            if (sizes.highlight > (d3lib.min([positions.centerX, positions.centerY]) - 20)) {
                // The highlight effect can't be that huge
                sizes.highlight = d3lib.min([positions.centerX, positions.centerY]) - 20;
            }

            labelScale = d3.scale.linear()
                .domain([0, series.length - 1])
                .range([20, sizes.height - 20]);

            // Create Drop Shadow filter
            filter = svg.append("svg:defs")
                .append("svg:filter")
                .attr("id", "dropshadow")
                .attr("height", "130%");

            filter.append("svg:feGaussianBlur")
                .attr("in", "SourceAlpha")
                .attr("stdDeviation", 3);

            filter = filter.append("svg:feMerge");
            filter.append("svg:feMergeNode");
            filter.append("svg:feMergeNode")
                .attr("in", "SourceGraphic");

            //  <defs>
            //     <filter id="dropshadow" height="130%">
            //       <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            //       <feMerge>
            //         <feMergeNode/>
            //         <feMergeNode in="SourceGraphic"/>
            //       </feMerge>
            //     </filter>
            //   </defs>

            render(labels, pie);
        },

        node = function (d3, data, options) {
            init(d3, "#dv_viewport", data.labels, data.values, options);
        },

        chart = function (container, data_container, options) {
            var data = DV.extractData(data_container, options);
            DV.processDefaultOptions(options, 'pie');
            init(d3, container, data.labels, data.series, options);
        };

    // Public functions
    return {
        pie: chart,
        node: node
    };
}()), DV);

// Browser
if (typeof exports === "undefined") {
    window.exports = {};
}

exports.chart = function (d3, data, options) {
    "use strict";

    // Node
    d3.select("body").append("div")
        .attr("id", "dv_viewport")
        .attr("class", "dv_viewport");
    DV.node(d3, data, options);
};
