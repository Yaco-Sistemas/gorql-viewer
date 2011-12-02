/*jslint vars: false, node: true */
/*global */

var sparql = require('sparql'),
    app = require.main;

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
        client;

    if (!params.query) {
        // Invalid request
        response.send('Missing query', 400);
        return;
    }

    if (params.embedded) {
        embedded = true;
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

    client = new sparql.Client(app.exports.set('sparql endpoint'));
    client.rows(params.query, function (err, res) {
        var error = false;

        if (res === undefined && err) {
            console.log(err);
            error = 'Error: ' + err[1].statusCode;
        } else {

            // TODO

            // 3.- Generate graphic representation if not embedded

            if (embedded) {
                // TODO response data in json
                return;
            }

            // TODO generate graphics
        }

        // 4.- Return the json or the html response to the client

        response.render('viewer.html', {
            layout: false,
            error: error,
            data: res
        });
    });
};
