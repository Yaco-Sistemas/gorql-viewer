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

var app = require.main,
    sparql = require('sparql'),
    sha1 = require('sha1'),
    uaParser = require('ua-parser'),
    cssom = require('cssom'),
    sizzle = require('../public/javascripts/sizzle'),
    jsdom = require('jsdom').jsdom,
    dirname = require('path').dirname,
    readFileSync = require('fs').readFileSync,
    sparqlClient,
    processParameters,
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

// Process parameters and store them in chart object

processParameters = function (properties, params, defaults, chart) {
    "use strict";

    var i,
        prop;

    for (i = 0; i < properties.length; i += 1) {
        prop = properties[i];
        if (prop['default']) {
            chart[prop.name] = params[prop.name] || defaults[prop.name];
        } else {
            chart[prop.name] = params[prop.name];
        }
    }
};

// Process GET petitions

exports.processPetition = function (request, response, renderCallback) {
    "use strict";

    // 1.- Parse GET parameters

    var params = request.query,
        d3par,
        similepar,
        layerspar,
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
        chart = {
            family: false,
            png: false
        };
        ua = uaParser.parse(request.headers["user-agent"]);

        // Detect old IE and ask for png instead of svg
        if (ua.family === "IE" && ua.major < 9) {
            // TODO there is plenty room for improvement here
            chart.png = true;
        }

        d3par = [
            {name: 'labels'}, {name: 'series'}, {name: 'sizeX', 'default': true},
            {name: 'sizeY', 'default': true}, {name: 'sizeLabel', 'default': true}
        ];
        similepar = [
            {name: 'title'}, {name: 'start'}, {name: 'end'}, {name: 'description'},
            {name: 'sizeX', 'default': true}, {name: 'sizeY', 'default': true},
            {name: 'detailRes', 'default': true}, {name: 'overviewRes', 'default': true}
        ];
        layerspar = [
            {name: 'lat'}, {name: 'long'}, {name: 'description'},
            {name: 'sizeX', 'default': true}, {name: 'sizeY', 'default': true}
        ];

        // Process chart params
        if ((params.chart === 'bar' || params.chart === 'pie' || params.chart === 'line') &&
                params.labels !== undefined && params.series !== undefined) {
            chart.type = params.chart;
            chart.family = 'd3';
            defaults = app.exports.set(chart.type);

            if (params.chart === 'bar') {
                d3par.push({name: 'landscape', 'default': true});
            } else if (params.chart === 'pie') {
                d3par.push({name: 'sizeHighlight', 'default': true});
            } else if (params.chart === 'line') {
                d3par.push({name: 'area', 'default': true});
            }

            processParameters(d3par, params, defaults, chart);
            chart.series = chart.series.split(','); // series must be an array
        } else if (params.chart === 'timeline' &&
                    params.start !== undefined && params.title !== undefined) {
            chart.type = params.chart;
            chart.family = 'simile';
            defaults = app.exports.set(chart.type);

            processParameters(similepar, params, defaults, chart);
        } else if (params.chart === 'map' &&
                    params.lat !== undefined && params.long !== undefined) {
            chart.type = params.chart;
            chart.family = 'layers';
            defaults = app.exports.set(chart.type);

            processParameters(layerspar, params, defaults, chart);
        } else {
            // Don't support the type
            chart = false;
        }
    }

    params.chart = chart;

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
        styles = readFileSync(dirname(app.filename) + "/public/stylesheets/style.css", 'utf-8'),
        // Use jsdom to create a fake document so we can use sizzle later
        document = jsdom("<html><head></head><body><div id='dv_viewport' class='dv_viewport'>" + svg + "</div></body></html>"),
        rule,
        elems,
        i,
        j;

    // Add chart specific styles
    styles += readFileSync(dirname(app.filename) + "/public/stylesheets/" + chart.type + ".css", 'utf-8');
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
