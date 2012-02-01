/*jslint vars: false, browser: true */
/*global Timeline, DV */

// Copyright 2012 Junta de Andalucia
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

if (!DV) {
    var DV = {};
}

DV.timeline = function (fields, viewport, data_container, options) {
    "use strict";

    var eventSource,
        bandInfos,
        headers,
        results,
        events = [],
        startIdx,
        endIdx,
        titleIdx,
        descriptionIdx,
        aux,
        row,
        i;

    aux = DV.extractData(data_container, options);
    headers = aux.headers;
    results = aux.results;

    // Get the indexes of the fields
    for (i = 0; i < headers.length; i += 1) {
        aux = headers[i];
        if (aux === fields.start) {
            startIdx = i;
        } else if (aux === fields.end) {
            endIdx = i;
        } else if (aux === fields.title) {
            titleIdx = i;
        } else if (aux === fields.description) {
            descriptionIdx = i;
        }
    }

    if (startIdx === undefined || titleIdx === undefined) {
        // abort
        return;
    }

    eventSource = new Timeline.DefaultEventSource();

    bandInfos = [
        Timeline.createBandInfo({
            eventSource: eventSource,
            date: results[0][startIdx], // TODO should be earliest date instead
            width: "80%",
            intervalUnit: Timeline.DateTime[options.detailRes.toUpperCase()],
            intervalPixels: 100
        }),
        Timeline.createBandInfo({
            overview: true,
            eventSource: eventSource,
            date: results[0][startIdx],
            width: "20%",
            intervalUnit: Timeline.DateTime[options.overviewRes.toUpperCase()],
            intervalPixels: 200
        })
    ];

    // Synchronize bands
    bandInfos[1].syncWith = 0;
    bandInfos[1].highlight = true;

    // Create events array
    for (i = 0; i < results.length; i += 1) {
        row = results[i];
        aux = {
            start: row[startIdx],
            title: row[titleIdx]
        };
        if (endIdx !== undefined) {
            aux.end = row[endIdx];
            aux.durationEvent = true;
        } else {
            aux.durationEvent = false;
        }
        if (descriptionIdx !== undefined) {
            aux.description = row[descriptionIdx];
        } else {
            aux.description = aux.title; // avoid undefined descriptions in globes
        }
        events.push(aux);
    }

    Timeline.create(viewport, bandInfos);
    eventSource.loadJSON({
        dateTimeFormat: 'Gregorian', // TODO
        events: events
    }, "http://www.yaco.es"); // TODO base url of results
};
