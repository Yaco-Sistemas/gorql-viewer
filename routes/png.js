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
    spawn = require('child_process').spawn,
    convertSVG,
    renderResults;

convertSVG = function (chart, data) {
    "use strict";

    var svg = commons.generateSVG(chart, data),
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

    var convert,
        i,
        j,
        chartData = {
            labels: [],
            values: []
        },
        buffer = '',
        aux;

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

    convert = convertSVG(params.chart, chartData);
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
