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
    commons = require('./commons'),
    table = require('../client/writetable'),
    renderResults;

renderResults = function (response, params, error, results) {
    "use strict";

    var data,
        aux,
        key,
        i;

    // 1.- Get the values from the array of objects

    data = commons.resultsToMatrix(results);

    if (params.embedded) {

        aux = parseInt(params.idx, 10);

        // 2.- Render JSON results

        response.send("if (!DV) {" +
            "   var DV = {};" +
            "}" +
            "if (!DV.data) {" +
            "   DV.data = [];" +
            "}" +
            "DV.data[" + aux + "] = " + JSON.stringify({
                results: data.matrix,
                headers: data.headers
            }) + ";", 200);

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

        // Generate table with the data

        aux = table.generateTableHTML(data.headers, data.matrix);

        // 2.- Render regular HTML response

        response.render('viewer.html', {
            layout: false,
            locals: {
                debug_charts: app.exports.set('debug_charts'),
                error: error,
                results: data.matrix,
                headers: data.headers,
                query: params.query,
                encoded_query: encodeURIComponent(params.query),
                table: aux,
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
