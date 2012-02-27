/*jslint vars: false */
/*global DV: true, module, exports: true, DV_data, require */

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
