/*jslint vars: false */
/*global DV: true, module, exports: true, DV_data, require */

if (!DV) {
    var DV = {};
}

// Browser
exports = exports || {};

DV.merge = function (source, destination) {
    "use strict";

    var key;

    for (key in source) {
        if (source.hasOwnProperty(key)) {
            if (!destination[key]) {
                destination[key] = source[key];
            }
        }
    }
};

DV.merge((function () {
    "use strict";

    var template = "<thead>" +
        "   <tr>{{each headers}}<th>${$value}</th>{{/each}}</tr>" +
        "</thead>" +
        "<tbody>" +
        "   {{each(idx, result) results}}<tr class='{{if idx % 2}}even{{else}}odd{{/if}}'>" +
        "       {{each result}}<td>${$value}</td>{{/each}}" +
        "   </tr>{{/each}}" +
        "</tbody>",

        processTemplate = function (tmplCallback, headers, data) {
            // Process template
            return tmplCallback(template, {
                headers: headers,
                results: data
            });
        },

        browser = function (viewport, idx) {
            // Client entry point
            var data = DV.data[idx];
            viewport.innerHTML = processTemplate(exports.tmpl, data.headers, data.results);
        },

        node = function (headers, results) {
            // Server entry point
            var jqtpl = require("jqtpl");
            return "<table id='dv_table' class='dv_table'>" +
                processTemplate(jqtpl.tmpl, headers, results) + "</table>";
        };

    // Public functions
    return {
        writeDataToTable: browser,
        generateTableHTML: node
    };
}()), DV);

exports.generateTableHTML = DV.generateTableHTML;
