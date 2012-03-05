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
    Base64 = require('../client/Base64'),
    renderResults;

renderResults = function (response, params, error, results, original_params) {
    "use strict";

    var places = [],
        data = commons.resultsToMatrix(results),
        place,
        latIdx,
        lonIdx,
        descriptionIdx,
        i;

    for (i = 0; i < data.headers.length; i += 1) {
        if (data.headers[i] === original_params.lat) {
            latIdx = i;
        } else if (data.headers[i] === original_params.long) {
            lonIdx = i;
        } if (data.headers[i] === original_params.description) {
            descriptionIdx = i;
        }
    }

    for (i = 0; i < data.matrix.length; i += 1) {
        place = {};
        place.lat = data.matrix[i][latIdx];
        place.lon = data.matrix[i][lonIdx];
        place.description = data.matrix[i][descriptionIdx];
        places.push(place);
    }

    response.render('points.html', {
        layout: false,
        locals: {
            host: "http://data-viewer.ceic-ogov.yaco.es", // TODO
            places: places
        }
    });
};

// Get the data, generate chart in SVG, convert it to PNG, and return the image

exports.get = function (request, response) {
    "use strict";

    var params = request.query,
        callback,
        data;

    if (!params.data) {
        // Invalid request, chart is mandatory
        response.send('Missing data settings', 400);
        return;
    }

    // Remove .kml extension
    data = params.data.substr(0, params.data.length - 4);
    data = Base64.decode(data);
    data = JSON.parse(data);

    request.query.query = decodeURIComponent(data.query);

    callback = function (response, params, error, results) {
        renderResults(response, params, error, results, data);
    };

    commons.processPetition(request, response, callback);
    // Nothing more to do, the callbacks will take care of the response
};