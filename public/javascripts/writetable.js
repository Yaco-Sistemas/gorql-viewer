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

    var template = "<table id='dv_table' {{if hide}}style='display: none;'{{/if}}>" +
        "<thead>" +
        "   <tr>{{each headers}}<th>${$value}</th>{{/each}}</tr>" +
        "</thead>" +
        "<tbody>" +
        "   {{each(idx, result) results}}<tr class='{{if idx % 2}}even{{else}}odd{{/if}}'>" +
        "       {{each result}}<td>${$value}</td>{{/each}}" +
        "   </tr>{{/each}}" +
        "</tbody>" +
        "</table>",

        processTemplate = function (tmplCallback, headers, data, hideTable) {
            // Process template
            return tmplCallback(template, {
                headers: headers,
                results: data,
                hide: hideTable
            });
        },

        browser = function (viewport, idx, hideTable) {
            // Client entry point
            var data = DV.data[idx];
            viewport.innerHTML = processTemplate(exports.tmpl, data.headers, data.results, hideTable);
        },

        node = function (headers, results) {
            // Server entry point
            var jqtpl = require("jqtpl");
            return processTemplate(jqtpl.tmpl, headers, results);
        };

    // Public functions
    return {
        writeDataToTable: browser,
        generateTableHTML: node
    };
}()), DV);

exports.generateTableHTML = DV.generateTableHTML;
