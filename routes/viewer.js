/*jslint vars: false, node: true */
/*global */

var app = require.main,
    sparql = require('sparql'),
    sha1 = require('sha1'),
    renderResults,
    queryEndPoint;

// Utils

renderResults = function (response, error, results) {
    "use strict";
    response.render('viewer.html', {
        layout: false,
        locals: {
            error: error,
            results: results
        }
    });
};

queryEndPoint = function (params, response) {
    "use strict";
    var client = new sparql.Client(app.exports.set('sparql endpoint')),
        embedded = false;

    if (params.embedded) {
        embedded = true;
    }

    client.rows(params.query, function (err, res) {
        var error = false;

        if (res === undefined && err) {
            console.error(err);
            error = 'Error: ' + err[1].statusCode;
        } else {
            // 1.- Cache the result

            // TODO

            // 2.- Generate graphic representation if not embedded

            if (embedded) {
                // TODO response data in json
                return;
            }

            // TODO generate graphics
        }

        // 3.- Return the json or the html response to the client

        renderResults(response, error, res);
    });
};

/*
 * GET data viewer.
 */

exports.dataViewer = function (request, response) {
    "use strict";

    // 1.- Parse GET parameters
    //     - query: SPARQL query to execute
    //     - embedded: boolean flag to choose between json or html result

    var params = request.query,
        embedded = false,
        cache;

    if (!params.query) {
        // Invalid request
        response.send('Missing query', 400);
        return;
    }

    // 2.- Query the SPARQL endpoint checking previously if the query was
    //     cached in Memcached. If it's not cached, then query the endpoint
    //     and cache the result

    params.query = 'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>';
    params.query += 'PREFIX type: <http://dbpedia.org/class/yago/>';
    params.query += 'PREFIX prop: <http://dbpedia.org/property/>';
    params.query += 'SELECT ?country_name ?population';
    params.query += 'WHERE {';
    params.query += '?country a type:LandlockedCountries ;';
    params.query += '         rdfs:label ?country_name ;';
    params.query += '         prop:populationEstimate ?population .';
    params.query += 'FILTER (?population > 15000000 && langMatches(lang(?country_name), "ES")) .';
    params.query += '}';

    cache = app.exports.set('memcached');

    if (cache) {
        cache.get(sha1(params.query), function (err, res) {
            if (err) {
                console.error(err);
            } else {
                if (res !== false) {
                    renderResults(response, false, res);
                } else {
                    // Nothing in cache
                    queryEndPoint(params, response);
                }
            }
        });
        return;
    }

    queryEndPoint(params, response);
};
