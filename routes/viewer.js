/*jslint vars: false, node: true */
/*global */

var commons = require('./commons'),
    renderResults;

renderResults = function (response, params, error, results) {
    "use strict";

    var embedded = false,
        convert,
        data,
        i,
        aux;

    if (params.embedded) {
        embedded = true;
    }

    // 1.- Get the values from the array of objects

//     if (!embedded && params.chart) {
//         
//     }

    data = commons.resultsToMatrix(results);

    if (embedded) {

        // 2.- Render JSON results

        response.send('Not implemented yet', 400); // TODO

    } else {

        // 2.- Render regular HTML response

        response.render('viewer.html', {
            layout: false,
            locals: {
                error: error,
                results: data.matrix,
                headers: data.headers,
                query: params.query,
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
