/*jslint vars: false */
/*global d3: true, exports: true, require, window: true, document: true, module, DV: true, event */

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
        nSeries,
        xScale,
        yScale,
        getX = function (d, idx) { return xScale(idx); },
        getY = function (d) { return Math.floor(yScale(d)); },
        size = {},

        highlightOut = function () {
            svg.selectAll(".highlight").remove();
        },

        highlightIn = function (d, i) {
            // Remove other highlights
            highlightOut();

            var x = xScale(i),
                y = Math.floor(yScale(d)),
                classes = this.getAttribute('class').split(' '),
                node,
                bbox;

            svg.insert("svg:circle", ".point")
                .attr("class", "highlight " + classes[1])
                .attr("cx", x)
                .attr("cy", y)
                .attr("r", 5)
                .attr("transform", "translate(" + size.xpadding / 2 + ",0)");

            node = svg.insert("svg:text", ".point")
                .attr("class", "highlight")
                .attr("x", x)
                .attr("y", y - 10)
                .attr("text-anchor", "middle")
                .attr("transform", "translate(" + size.xpadding / 2 + ",0)")
                .text(d);

            node = node[0][0]; // Get the actual node
            bbox = node.getBBox();

            // Avoid text overflow
            if (bbox.y < 0) {
                // Top overflow
                node.setAttribute('y', y + 5 + bbox.height);
            }
            if ((bbox.x + bbox.width + (size.xpadding / 2)) > size.x) {
                // Right overflow
                node.setAttribute('x', x - (bbox.width / 2));
            } else if (bbox.x < 0) {
                // Left overflow
                node.setAttribute('x', x + (bbox.width / 2));
            }
        },

        render = function (d3, labels, series, area) {
            var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .ticks(nElems)
                    .tickFormat(function (d, idx) {
                        if (idx < labels.length) {
                            return labels[idx];
                        }
                        return '';
                    }),
                yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .tickFormat(d3.format(".0f")),
                serie,
                line = d3.svg.line()
                    //.interpolate("monotone")
                    .x(getX)
                    .y(getY),
                i;

            if (area) {
                area = d3.svg.area()
                    //.interpolate("monotone")
                    .x(getX)
                    .y0(size.y - size.offset)
                    .y1(getY);
            }

            // Add the clip path.
            svg.append("svg:clipPath")
                .attr("id", "clip")
                .append("svg:rect")
                .attr("width", size.x)
                .attr("height", size.y - size.offset);

            // Add the x-axis.
            svg.append("svg:g")
                .attr("class", "x axis")
                .attr("transform", "translate(" + size.xpadding / 2 + "," + (size.y - size.offset) + ")")
                .call(xAxis);

            // Rotate labels in the x-axis
            svg.selectAll(".x.axis text")
                .attr("text-anchor", "start")
                .attr("transform", "rotate(-90)")
                .attr("dx", -size.offset)
                .attr("dy", -7);

            // Add the y-axis.
            svg.append("svg:g")
                .attr("class", "y axis")
                .call(yAxis);

            // Move labels in the y-axis
            svg.selectAll(".y.axis text")
                .attr("text-anchor", "start")
                .attr("dx", 9)
                .attr("dy", -3);

            // Add helping lines
            svg.selectAll(".y.axis line.tick")
                .attr("x1", 0)
                .attr("x2", size.x);

            for (i = 0; i < series.length; i += 1) {
                serie = series[i];

                // Add the line path.
                svg.insert("svg:path", ".point")
                    .attr("class", "line serie" + i)
                    .attr("clip-path", "url(#clip)")
                    .attr("d", line(serie))
                    .attr("transform", "translate(" + size.xpadding / 2 + ",0)");

                if (area) {
                    // Add the area path.
                    svg.insert("svg:path", "path.line")
                        .attr("class", "area serie" + i)
                        .attr("clip-path", "url(#clip)")
                        .attr("d", area(serie))
                        .attr("transform", "translate(" + size.xpadding / 2 + ",0)");
                }

                // Add points for highlighting
                svg.selectAll("circle.point.serie" + i)
                    .data(serie)
                    .enter().append("svg:circle")
                    .attr("class", "point serie" + i)
                    .attr("cx", getX)
                    .attr("cy", getY)
                    .attr("r", 30)
                    .attr("transform", "translate(" + size.xpadding / 2 + ",0)")
                    .on("mouseover", highlightIn)
                    .on("mouseout", highlightOut);
            }
        },

        init = function (d3, container, labels, series, options) {
            var area = options.area === 'true' || options.area === true,
                viewport = d3.select(container);

            if (series.length <= 0 || series[0].length <= 0) {
                return;
            }

            nElems = labels.length;
            nSeries = series.length;

            viewport.style("width", options.sizeX + 'px');
            viewport.style("height", options.sizeY + 'px');

            size.x = parseInt(options.sizeX, 10);
            size.xpadding = size.x / (nElems + 1); // to avoid cropping labels
            size.y = parseInt(options.sizeY, 10);
            size.offset = parseInt(options.sizeLabel, 10);

            xScale = d3.scale.linear()
                .domain([0, nElems - 1])
                .range([0, size.x - size.xpadding]);

            yScale = d3.scale.linear()
                .domain([d3.max(d3.merge(series)), d3.min(d3.merge(series))])
                .range([0, size.y - size.offset]);

            // Create the svg root node
            svg = viewport.append("svg:svg")
                .attr("class", "chart line")
                .attr("width", size.x)
                .attr("height", size.y);

            render(d3, labels, series, area);
        },

        node = function (d3, data, options) {
            init(d3, "#dv_viewport", data.labels, data.values, options);
        },

        chart = function (container, data_container, options) {
            var data = DV.extractData(data_container, options);
            DV.processDefaultOptions(options, 'line');
            init(d3, container, data.labels, data.series, options);
        };

    // Public functions
    return {
        line: chart,
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
