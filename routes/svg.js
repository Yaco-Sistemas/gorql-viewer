/*jslint vars: false, node: true */
/*global */

var commons = require('./commons'),
    renderResults;

renderResults = function (response, params, error, results) {
    "use strict";

    var data,
        i,
        aux,
        svg;

    data = commons.resultsToMatrix(results);

    aux = [];
    for (i = 0; i < data.matrix.length; i += 1) {
        aux.push(data.matrix[i][1]); // TODO
    }
    svg = commons.generateSVG(params.chart, aux),

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