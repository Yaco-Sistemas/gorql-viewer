/*jslint vars: false, browser: true */
/*global Timeline */

function initTimeline() {
    "use strict";

    var eventSource = new Timeline.DefaultEventSource(),
        bandInfos = [
            Timeline.createBandInfo({
                eventSource: eventSource,
                width: "70%",
                intervalUnit: Timeline.DateTime.MONTH,
                intervalPixels: 100
            }),
            Timeline.createBandInfo({
                eventSource: eventSource,
                width: "30%",
                intervalUnit: Timeline.DateTime.YEAR,
                intervalPixels: 200
            })
        ];

    bandInfos[1].syncWith = 0;
    bandInfos[1].highlight = true;
    Timeline.create(document.getElementById("dv_viewport"), bandInfos);
    eventSource.loadJSON({
        'wiki-url': "http://www.yaco.es/", // TODO
        'wiki-section': "Timeline",
        'dateTimeFormat': 'Gregorian',
        'events': []
    });
}
