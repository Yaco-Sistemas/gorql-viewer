/*jslint vars: false, node: true */
/*global */

var commons = require('./commons'),
    reservedWords = ["PREFIX", "SELECT", "WHERE", "FILTER"], // TODO
    renderResults;

renderResults = function (response, params, error, results) {
    "use strict";

    var embedded = false,
        chartData = {
            labels: [],
            values: []
        },
        data,
        query,
        regex,
        i;

    if (params.embedded) {
        embedded = true;
    }

    // 1.- Get the values from the array of objects

    if (!embedded && params.chart) {
        for (i = 0; i < results.length; i += 1) {
            chartData.labels.push(results[i][params.chart.labels].value);
            chartData.values.push(results[i][params.chart.values].value);
        }
        params.chart.data = chartData;
    }

    data = commons.resultsToMatrix(results);

    if (embedded) {

        // 2.- Render JSON results

        response.send('Not implemented yet', 400); // TODO

    } else {

        // 2.- Render regular HTML response

        query = params.query;
        for (i = 0; i < reservedWords.length; i += 1) {
            regex = new RegExp("(" + reservedWords[i] + ")", 'g');
            query = query.replace(regex, "\n$1");
        }
        query = query.replace(/^\s+|\s+$/g, '');

        response.render('viewer.html', {
            layout: false,
            locals: {
                error: error,
                results: data.matrix,
                headers: data.headers,
                query: query,
                encoded_query: encodeURIComponent(params.query),
                chart: params.chart
            }
        });

    }
};

// Process GET petitions

exports.dataViewer = function (request, response) {
    "use strict";

    commons.processPetition(request, response, renderResults);
    // Nothing more to do, the callbacks will take care of the response
};
