/*jslint vars: false, node: true */
/*global */

var commons = require('./commons'),
    spawn = require('child_process').spawn,
    convertSVG,
    renderResults;

convertSVG = function (chart, data) {
    "use strict";

    var generator = require("../public/javascripts/" + chart.type),
        svg = generator.chart(data, {}),
        convert;

    // Start convert reading in an svg and outputting a png
    convert = spawn('convert', ['svg:-', 'png:-']);

    // Pump in the svg content
    convert.stdin.write(svg);
    convert.stdin.end();

    return convert;
};

renderResults = function (response, params, error, results) {
    "use strict";

    var data,
        convert,
        i,
        aux;

    data = commons.resultsToMatrix(results);

    aux = [];
    for (i = 0; i < data.matrix.length; i += 1) {
        aux.push(data.matrix[i][1]); // TODO
    }
    convert = convertSVG(params.chart, aux);
    response.header("Content-Type", "image/png");

    // Write the output of convert straight to the response
    convert.stdout.on('data', function (data) {
        response.write(data);
    });

    // When we're done rendering, we're done
    convert.on('exit', function (code) {
        response.end();
    });
};

// Get the data, generate chart in SVG, convert it to PNG, and return the image

exports.png = function (request, response) {
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
