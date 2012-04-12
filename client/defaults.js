/*jslint vars: false, browser: true */
/*global DV */

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

if (!window.DV) {
    window.DV = {};
}

DV.processDefaultOptions = function (options, chart) {
    "use strict";

    if (!DV.hasOwnProperty("defaults") || !DV.defaults.hasOwnProperty(chart)) {
        return;
    }

    var defaults = DV.defaults[chart],
        key,
        value;

    for (key in defaults) {
        if (defaults.hasOwnProperty(key) && !options.hasOwnProperty(key)) {
            value = defaults[key];
            if (value === "true") {
                value = true;
            } else if (value === "false") {
                value = false;
            }
            options[key] = value;
        }
    }
};
