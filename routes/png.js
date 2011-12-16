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
        aux,
        buffer;

    data = commons.resultsToMatrix(results);

    aux = [];
    for (i = 0; i < data.matrix.length; i += 1) {
        aux.push(data.matrix[i][1]); // TODO
    }
    convert = convertSVG(params.chart, aux);
    response.header("Content-Type", "image/png");

    // Write the output of convert in an intermediate buffer
    convert.stdout.on('data', function (data) {
        try {
            var prevBufferLength = (buffer ? buffer.length : 0),
                newBuffer = new Buffer(prevBufferLength + data.length);

            if (buffer) {
                buffer.copy(newBuffer, 0, 0);
            }

            data.copy(newBuffer, prevBufferLength, 0);

            buffer = newBuffer;
        } catch (err) {
            // Log it
            console.error(err);
            response.send('An error happend: ' + err, 500);
        }
    });

    // When we're done buffering, write it to the response and we're done
    convert.on('exit', function (code) {
        response.write(buffer);
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
