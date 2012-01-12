/*jslint vars: false, browser: true */
/*global Sizzle, DV */

if (!window.DV) {
    window.DV = {};
}

DV.extractData = function (data_container, options) {
    "use strict";
    var labels = [],
        values = [],
        headers = [],
        labelIdx,
        valuesIdx = [],
        series = options.series,
        results = {},
        sizzle = Sizzle, // jslint hack >_<
        aux = sizzle(data_container + " tr"),
        aux2,
        value,
        row,
        i,
        j;

    // Not every chart uses series
    if (series) {
        series = series.split(',');
    }

    // Get indexes
    for (i = 0; i < aux[0].cells.length; i += 1) {
        aux2 = aux[0].cells[i].innerHTML;
        headers.push(aux2);
        if (aux2 === options.labels) {
            labelIdx = i;
        } else if (series) {
            for (j = 0; j < series.length; j += 1) {
                if (aux2 === series[j]) {
                    valuesIdx.push(i);
                    values.push([]); // future serie array
                }
            }
        } else {
            valuesIdx.push(i);
        }
    }

    // Get data
    for (i = 1; i < aux.length; i += 1) {
        aux2 = aux[i].cells;
        if (options.labels) {
            labels.push(aux2[labelIdx].innerHTML);
        }
        row = [];
        for (j = 0; j < valuesIdx.length; j += 1) {
            value = aux2[valuesIdx[j]].innerHTML;
            if (series) {
                // Series values are numerical
                values[j].push(parseInt(value, 10));
            } else {
                row.push(value);
            }
        }
        if (!series) {
            values.push(row);
        }
    }

    results.labels = labels;
    results.headers = headers;
    results.series = values;
    results.results = values;

    return results;
};
