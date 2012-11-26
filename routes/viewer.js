/*jslint vars: false, node: true */
/*global */

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

var app = require.main,
    commons = require('./commons'),
    table = require('../client/writetable'),
    renderResults,
    generateEmbedCode;

renderResults = function (response, params, error, results) {
    "use strict";

    var charts = ['bar', 'pie', 'line', 'timeline', 'map', 'mapea'],
        defaults = {},
        prettyHeaders,
        encodedQuery,
        chart,
        data,
        embed,
        aux,
        key,
        i;

    // 1.- Get the values from the array of objects

    data = commons.resultsToMatrix(results);

    if (params.prettyHeaders) {
        prettyHeaders = params.prettyHeaders.split(',');
    } else {
        prettyHeaders = data.headers;
    }

    if (params.embedded) {

        for (i = 0; i < charts.length; i += 1) {
            aux = commons.getDefaultChartParameters(charts[i]);
            chart = {};
            commons.processChartParameters(aux.properties, {}, aux.defaults,
                                           chart);
            defaults[charts[i]] = chart;
        }

        aux = "if (!DV) { var DV = {}; } if (!DV.data) { DV.data = []; } " +
            "DV.data[" + parseInt(params.idx, 10) + "] = " + JSON.stringify({
                results: data.matrix,
                headers: data.headers,
                prettyHeaders: prettyHeaders
            }) + "; DV.defaults = " + JSON.stringify(defaults) + ";";

        // 2.- Render JSON results

        response.send(aux, 200);

    } else {

        if (params.chart) {
            // preprocess for the chart
            try {
                // options
                aux = [];
                for (key in params.chart) {
                    if (params.chart.hasOwnProperty(key)) {
                        aux.push([key, params.chart[key]]);
                    }
                }
                params.chart.options = aux;
            } catch (err) {
                console.log(err);
                params.chart = false;
            }
        }

        // Generate table with the data

        if (data.matrix.length === 0) {
            aux = "";
            if (!error) {
                error = "";
            }
            error += " " + response.lingua.content.viewer.noresults;
        } else {
            aux = data.headers;
            if (prettyHeaders.length === aux.length) {
                aux = prettyHeaders;
            }
            aux = table.generateTableHTML(data.headers, aux, data.matrix);
        }

        // Generate embed code

        encodedQuery = encodeURIComponent(params.query);
        embed = generateEmbedCode(params.chart, encodedQuery,
            response.lingua.content.viewer.embedView,
            app.exports.set('viewer_host'));

        // 2.- Render regular HTML response

        response.render('viewer.html', {
            layout: false,
            locals: {
                debug_charts: app.exports.set('debug_charts'),
                host: app.exports.set('viewer_host'),
                siteLogo: app.exports.set('siteLogo'),
                siteTitle: app.exports.set('siteTitle'),
                staticUrl: app.exports.set('staticUrl'),
                error: error,
                results: data.matrix,
                headers: data.headers,
                query: params.query,
                encoded_query: encodedQuery,
                table: aux,
                chart: params.chart,
                embedCode: embed
            }
        });

    }
};

generateEmbedCode = function (chart, encodedQuery, message, host) {
    "use strict";
    var code = '<script type="text/javascript" src="' + host + '/javascripts/dv-core.js"></script>\n' +
        '<link rel="stylesheet" href="' + host + '/stylesheets/base.css" />\n';

    if (chart) {
        if (chart.type === "timeline") {
            code += '<script type="text/javascript">\n' +
                '   var Timeline_ajax_url="' + host + '/javascripts/timeline_ajax/simile-ajax-api.js",\n' +
                '       Timeline_urlPrefix="' + host + '/javascripts/timeline_js/",\n' +
                '       Timeline_parameters=\'bundle=true&defaultLocale="es"\';\n' +
                '</script>\n' +
                '<script type="text/javascript" src="' + host + '/javascripts/dv-time.js"></script>\n' +
                '<link rel="stylesheet" href="' + host + '/stylesheets/timeline.css" />\n';
        } else if (chart.type === "map") {
            code += '<link rel="stylesheet" href="' + host + '/javascripts/theme/default/style.css" />\n' +
                '<link rel="stylesheet" href="' + host + '/stylesheets/map.css" />\n' +
                '<script type="text/javascript" src="' + host + '/javascripts/dv-openlayers.js"></script>\n';
        } else if (chart.type === "mapea") {
            code += '<link rel="stylesheet" href="' + host + '/stylesheets/mapea.css" />\n' +
                '<script type="text/javascript" src="' + host + '/javascripts/dv-mapea.js"></script>\n';
        } else { // is d3
            if (chart.type === "bar") {
                code += '<link rel="stylesheet" href="' + host + '/stylesheets/bar.css" />\n';
            } else if (chart.type === "pie") {
                code += '<link rel="stylesheet" href="' + host + '/stylesheets/pie.css" />\n';
            } else if (chart.type === "line") {
                code += '<link rel="stylesheet" href="' + host + '/stylesheets/line.css" />\n';
            }
            code += '<script type="text/javascript" src="' + host + '/javascripts/dv-d3.js"></script>\n';
        }
    }

    code += '<script type="text/javascript" src="' + host + '/viewer/?query=' +
        encodedQuery + '&amp;embedded=true&amp;idx=0"></script>\n' +
        '<script type="text/javascript">\n' +
        '   DomReady.ready(function () {\n' +
        '       DV.writeDataToTable(Sizzle("#dv_table0")[0], 0);\n';

    if (chart) {
        code += '       DV["' + chart.type + '"]("#dv_viewport0", "#dv_table0", {';
        if (chart.type === "timeline") {
            code += '\n           title: "' + chart.title + '"' +
                ',\n           start: "' + chart.start + '"';
            if (chart.end) {
                code += ',\n           end: "' + chart.end + '"';
            }
            if (chart.description) {
                code += ',\n           description: "' + chart.description + '"';
            }
            if (chart.detailRes) {
                code += ',\n           detailRes: "' + chart.detailRes + '"';
            }
            if (chart.overviewRes) {
                code += ',\n           overviewRes: "' + chart.overviewRes + '"';
            }
        } else if (chart.family === "layers") {
            code += '\n           lat: "' + chart.lat + '"' +
                ',\n           long: "' + chart.long + '"';
            if (chart.description) {
                code += ',\n           description: "' + chart.description + '"';
            }
        } else { // is d3
            code += '\n           labels: "' + chart.labels + '"' +
                ',\n           series: "' + chart.series + '"';
            if (chart.type === "bar" && chart.landscape) {
                code += ',\n           landscape: "' + chart.landscape + '"';
            } else if (chart.type === "pie" && chart.sizeHighlight) {
                code += ',\n           sizeHighlight: "' + chart.sizeHighlight + '"';
            } else if (chart.type === "line" && chart.area) {
                code += ',\n           area: "' + chart.area + '"';
            }
        }
        if (chart.sizeX) {
            code += ',\n           sizeX: "' + chart.sizeX + '"';
        }
        if (chart.sizeY) {
            code += ',\n           sizeY: "' + chart.sizeY + '"';
        }
        code += '\n       });\n';
    }

    code += '   });\n' +
        '</script>\n' +
        '<noscript><a href="' + host + '/viewer/?query=' +
        encodedQuery + '">' + message + '</a></noscript>\n' +
        '<div id="dv_viewport0" class="dv_viewport"></div>\n' +
        '<table id="dv_table0" class="dv_table"></table>';

    return code;
};

// Process GET petitions

exports.dataViewer = function (request, response) {
    "use strict";

    commons.processPetition(request, response, renderResults);
    // Nothing more to do, the callbacks will take care of the response
};
