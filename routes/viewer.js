/*jslint vars: false, node: true */
/*global */

var app = require.main,
    sparql = require('sparql'),
    sha1 = require('sha1'),
    resultsToMatrix,
    renderResults,
    queryEndPoint,
    getQueryEndPointCallback;

// Utilities

resultsToMatrix = function (results) {
    "use strict";

    var matrix = [],
        headers = [],
        i,
        row,
        newrow,
        key;

    for (i = 0; i < results.length; i += 1) {
        row = results[i];
        newrow = [];
        for (key in row) {
            if (row.hasOwnProperty(key)) {
                if (i === 0) {
                    // First iteration
                    headers.push(key);
                }
                // For every object of the row, get the value
                newrow.push(row[key].value);
            }
        }
        matrix.push(newrow);
    }

    // The result is a bidimensional matrix with the values instead of objects
    return {
        matrix: matrix,
        headers: headers
    };
};

renderResults = function (response, params, error, results) {
    "use strict";

    var embedded = false,
        data;

    if (params.embedded) {
        embedded = true;
    }

    // 1.- Get the values from the array of objects

    data = resultsToMatrix(results);

    if (embedded) {

        // 2.- Render JSON results

        response.send('Not implemented yet', 400); // TODO

    } else {

        // 2.- Render HTML response

        response.render('viewer.html', {
            layout: false,
            locals: {
                error: error,
                results: data.matrix,
                headers: data.headers
            }
        });
    }
};

queryEndPoint = function (query, callback) {
    "use strict";

    var client = new sparql.Client(app.exports.set('sparql endpoint'));
    // TODO reuse client?
    client.rows(query, callback);
};

getQueryEndPointCallback = function (response, params, cache, key) {
    "use strict";

    return function (err, res) {
        var error = false,
            lifetime;

        if (res === undefined && err) {
            console.error(err);
            error = 'Error: ' + err[1].statusCode;
            res = [];
        } else {

            // 1.- Cache the result

            if (cache) {
                lifetime = app.exports.set('memcached lifetime');
                cache.set(key, res, lifetime, function (error) {
                    if (error) {
                        // Error storing the results in cache, log it
                        console.error(error);
                    }
                });
            }
        }

        // 2.- Return the html response to the client

        renderResults(response, params, error, res);
    };
};

// Process GET petitions

exports.dataViewer = function (request, response) {
    "use strict";

    // 1.- Parse GET parameters
    //     - query: SPARQL query to execute
    //     - embedded: boolean flag to choose between json or html result

    var params = request.query,
        cache,
        key;

    if (!params.query) {
        // Invalid request, query is mandatory
        response.send('Missing query', 400);
        return;
    }

    // 2.- Query the SPARQL endpoint checking previously if the query was
    //     cached in Memcached. If it's not cached, then query the endpoint
    //     and cache the result

    cache = app.exports.set('memcached');

    if (cache) {
        // Look for the response in the cache first
        key = sha1(params.query); // The query hashed is the key in the cache
        cache.get(key, function (err, res) {
            if (err) {
                // Meec, error with the cache, query the endpoint then
                console.error(err);
                queryEndPoint(params.query, getQueryEndPointCallback(response, params, cache, key));
            } else {
                if (res !== false) {
                    // Got the data from cache
                    renderResults(response, params, false, res);
                } else {
                    // Nothing in cache, query the endpoint
                    queryEndPoint(params.query, getQueryEndPointCallback(response, params, cache, key));
                }
            }
        });
    } else {
        // No cache, query the endpoint then
        queryEndPoint(params.query, getQueryEndPointCallback(response, params, false));
    }

    // Nothing more to do, the callbacks will take care of the response
};
