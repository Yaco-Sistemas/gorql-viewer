/*jslint vars: false, node: true */
/*global */

var commons = require('./commons'),
    renderResults;

renderResults = function (response, params, error, results) {
    "use strict";

    var i,
        chartData = {
            labels: [],
            values: []
        },
        svg;

    for (i = 0; i < results.length; i += 1) {
        chartData.labels.push(results[i][params.chart.labels].value);
        chartData.values.push(results[i][params.chart.values].value);
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