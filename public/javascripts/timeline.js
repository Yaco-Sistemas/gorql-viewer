/*jslint vars: false, browser: true */
/*global Timeline */

function initTimeline(fields, headers, results, viewport, options) {
    "use strict";

    var eventSource,
        bandInfos,
        events = [],
        startIdx,
        endIdx,
        titleIdx,
        descriptionIdx,
        aux,
        row,
        i;

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
        }
        events.push(aux);
    }

    Timeline.create(viewport, bandInfos);
    eventSource.loadJSON({
        dateTimeFormat: 'Gregorian', // TODO
        events: events
    }, "http://www.yaco.es"); // TODO base url of results
}
