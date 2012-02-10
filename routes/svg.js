/*jslint vars: false, node: true */
/*global */

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

var commons = require('./commons'),
    renderResults;

renderResults = function (response, params, error, results) {
    "use strict";

    var i,
        j,
        chartData = {
            labels: [],
            values: []
        },
        svg;

    if (params.chart.family !== 'd3') {
        response.send('Invalid chart type.', 400);
    }

    for (i = 0; i < params.chart.series.length; i += 1) {
        chartData.values.push([]); // create future serie array
    }

    try {
        for (i = 0; i < results.length; i += 1) {
            chartData.labels.push(results[i][params.chart.labels].value);
            for (j = 0; j < params.chart.series.length; j += 1) {
                chartData.values[j].push(parseInt(results[i][params.chart.series[j]].value, 10));
            }
        }
        params.chart.data = chartData;
    } catch (err) {
        console.log(err);
        response.send('Some error happened processing the data.', 500);
        return;
    }

    svg = commons.generateSVG(params.chart, chartData);

    response.header("Content-Type", "image/svg+xml");
    response.write(svg);
    response.end();
};

// Get the data, generate chart in SVG and return it

exports.get = function (request, response) {
    "use strict";

    var params = request.query;

    if (!params.chart) {
        // Invalid request, chart is mandatory
        response.send('Missing chart settings', 400);
        return;
    }

    commons.processPetition(request, response, renderResults);
    // Nothing more to do, the callbacks will take care of the response
};