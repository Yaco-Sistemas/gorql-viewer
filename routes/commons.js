/*jslint vars: false, node: true */
/*global */

var app = require.main,
    sparql = require('sparql'),
    sha1 = require('sha1'),
    uaParser = require('ua-parser'),
    cssom = require('cssom'),
    sizzle = require('../public/javascripts/sizzle'),
    jsdom = require('jsdom').jsdom,
    readFileSync = require('fs').readFileSync,
    sparqlClient,
    sparqlCallback;

sparqlCallback = function (response, params, renderCallback, cache, key) {
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

        renderCallback(response, params, error, res);
    };
};

// Process GET petitions

exports.processPetition = function (request, response, renderCallback) {
    "use strict";

    // 1.- Parse GET parameters
    //     - query: SPARQL query to execute
    //     - embedded: boolean flag to choose between json or html result

    var params = request.query,
        serieRE = /^serie\d+$/,
        chart = false,
        defaults,
        ua,
        cache,
        key;

    if (!params.query) {
        // Invalid request, query is mandatory
        response.send('Missing query', 400);
        return;
    }

    if (params.chart) {
        chart = {};
        ua = uaParser.parse(request.headers["user-agent"]);

        // Detect old IE and ask for png instead of svg
        if (ua.family === "IE" && ua.major < 9) {
            chart.png = true;
        }

        // Process chart params
        if (params.chart === 'bar' && params.labels !== undefined && params.serie1 !== undefined) {
            chart.type = 'bar';
            defaults = app.exports.set('bar');
            // - labels -> must be a text selected property
            // - values -> must be a numerical selected property
            // - landscape -> must be boolean
            // - sizeX -> in pixels
            // - sizeY -> in pixels
            chart.labels = params.labels;
            chart.series = [];

            for (key in params) {
                if (params.hasOwnProperty(key)) {
                    if (serieRE.test(key)) {
                        chart.series.push(params[key]);
                    }
                }
            }

            // = params.values;
            if (params.landscape === undefined) {
                chart.landscape = defaults.landscape;
            } else {
                chart.landscape = (params.landscape === "true");
            }
            chart.sizeX = params.sizeX || defaults.sizeX;
            chart.sizeX = parseInt(chart.sizeX, 10);
            chart.sizeY = params.sizeY || defaults.sizeY;
            chart.sizeY = parseInt(chart.sizeY, 10);
            chart.sizeLabel = params.sizeLabel || defaults.sizeLabel;
            chart.sizeLabel = parseInt(chart.sizeLabel, 10);
        } else {
            // Don't support the type
            chart = false;
        }

        params.chart = chart;
    } else {
        params.chart = false;
    }

    // 2.- Query the SPARQL endpoint checking previously if the query was
    //     cached in Memcached. If it's not cached, then query the endpoint
    //     and cache the result

    // Create the SPARQL client just once
    if (sparqlClient === undefined) {
        sparqlClient = new sparql.Client(app.exports.set('sparql endpoint'));
    }

    cache = app.exports.set('memcached');

    if (cache) {
        // Look for the response in the cache first
        key = sha1(params.query); // The query hashed is the key in the cache
        cache.get(key, function (err, res) {
            if (err) {
                // Meec, error with the cache, query the endpoint then
                console.error(err);
                sparqlClient.rows(params.query, sparqlCallback(response, params, renderCallback, cache, key));
            } else {
                if (res !== false) {
                    // Got the data from cache
                    renderCallback(response, params, false, res);
                } else {
                    // Nothing in cache, query the endpoint
                    sparqlClient.rows(params.query, sparqlCallback(response, params, renderCallback, cache, key));
                }
            }
        });
    } else {
        // No cache, query the endpoint then
        sparqlClient.rows(params.query, sparqlCallback(response, params, renderCallback, false));
    }

    // Nothing more to do, the callbacks will take care of the response
};

// Flattern the sparql results

exports.resultsToMatrix = function (results) {
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

// Generate SVG using d3

exports.generateSVG = function (chart, data) {
    "use strict";

    var generator = require("../public/javascripts/" + chart.type),
        svg = generator.chart(data, chart),
        // FS uses relative paths to the root of the project, where is being executed node
        styles = readFileSync("public/stylesheets/" + chart.type + ".css", 'utf-8'),
        // Use jsdom to create a fake document so we can use sizzle later
        document = jsdom("<html><head></head><body><div id='dv_viewport'>" + svg + "</div></body></html>"),
        rule,
        elems,
        i,
        j;

    // Parse the css and get the rules
    styles = cssom.parse(styles).cssRules;

    for (i = 0; i < styles.length; i += 1) {
        rule = styles[i];
        // Use sizzle to get the nodes affected by the css rule
        elems = sizzle(rule.selectorText, document);
        for (j = 0; j < elems.length; j += 1) {
            // Set the style for every element affected
            elems[j].style.cssText += ' ' + rule.style.cssText;
        }
    }

    // ChildNodes[0] because the svg is inside the div viewport node
    return document.body.childNodes[0].innerHTML;
};
