/*jslint vars: false, node: true */
/*global */

var commons = require('./commons'),
    reservedWords = ["PREFIX", "SELECT", "WHERE", "FILTER"], // TODO
    renderResults;

renderResults = function (response, params, error, results) {
    "use strict";

    var data,
        query,
        regex,
        aux,
        key,
        i;

    // 1.- Get the values from the array of objects

    data = commons.resultsToMatrix(results);

    if (params.embedded) {

        // 2.- Render JSON results

        response.json({
            results: data.matrix,
            headers: data.headers
        });

    } else {

        if (params.chart) {
            // preprocess for the chart
            try {
                // options
                aux = [];
                for (key in params.chart) {
                    if (params.chart.hasOwnProperty(key)) {
                        aux.push([key, params.chart[key]]);
                    }
                }
                params.chart.options = aux;
            } catch (err) {
                console.log(err);
                params.chart = false;
            }
        }

        // prettify the query

        query = params.query;
        for (i = 0; i < reservedWords.length; i += 1) {
            regex = new RegExp("(" + reservedWords[i] + ")", 'g');
            query = query.replace(regex, "\n$1");
        }
        query = query.replace(/^\s+|\s+$/g, '');

        // 2.- Render regular HTML response

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
