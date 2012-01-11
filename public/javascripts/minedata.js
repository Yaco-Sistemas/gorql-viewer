/*jslint vars: false, browser: true */
/*global Sizzle */

function extractData(data_container, options) {
    "use strict";
    var labels = [],
        values = [],
        labelIdx,
        valuesIdx = [],
        series = options.series.split(','),
        sizzle = Sizzle, // jslint hack >_<
        aux = sizzle(data_container + " tr"),
        aux2,
        i,
        j;

    // Get indexes
    for (i = 0; i < aux[0].cells.length; i += 1) {
        aux2 = aux[0].cells[i].innerHTML;
        if (aux2 === options.labels) {
            labelIdx = i;
        } else {
            for (j = 0; j < series.length; j += 1) {
                if (aux2 === series[j]) {
                    valuesIdx.push(i);
                    values.push([]); // future serie array
                }
            }
        }
    }

    // Get data
    for (i = 1; i < aux.length; i += 1) {
        aux2 = aux[i].cells;
        labels.push(aux2[labelIdx].innerHTML);
        for (j = 0; j < valuesIdx.length; j += 1) {
            values[j].push(parseInt(aux2[valuesIdx[j]].innerHTML, 10));
        }
    }

    return {
        labels: labels,
        series: values
    };
}