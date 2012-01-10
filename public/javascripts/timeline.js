/*jslint vars: false, browser: true */
/*global Timeline */

function initTimeline(fields, headers, results) {
    "use strict";

    var eventSource,
        bandInfos,
        events = [],
        startIdx,
        endIdx = false,
        titleIdx,
        descriptionIdx = false,
        aux,
        row,
        i;

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
            date: results[0][startIdx],
            width: "80%",
            intervalUnit: Timeline.DateTime.MONTH,
            intervalPixels: 100
        }),
        Timeline.createBandInfo({
            overview: true,
            eventSource: eventSource,
            date: results[0][startIdx],
            width: "20%",
            intervalUnit: Timeline.DateTime.YEAR,
            intervalPixels: 200
        })
    ];

    bandInfos[1].syncWith = 0;
    bandInfos[1].highlight = true;

    for (i = 0; i < results.length; i += 1) {
        row = results[i];
        aux = {
            start: row[startIdx],
            title: row[titleIdx]
        };
        if (endIdx) {
            aux.end = row[endIdx];
            aux.durationEvent = true;
        } else {
            aux.durationEvent = false;
        }
        if (descriptionIdx) {
            aux.description = row[descriptionIdx];
        }
        events.push(aux);
    }

    Timeline.create(document.getElementById("dv_viewport"), bandInfos);
    eventSource.loadJSON({
        dateTimeFormat: 'Gregorian',
        events: events
    }, "http://www.yaco.es");
}
