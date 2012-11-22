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

exports.settings = {
    global: {
        staticUrl: "../",
        debug: false,
        port: 3000,
        host: 'http://viewer.gorql.com',
        logo: '../images/logo-big.png',
        title: 'Resultados de la Consulta'
    },

    development: {
        sparqlEndpoint: 'http://dbpedia.org/sparql',
        memcachedServer: 'localhost:11211',
        memcachedLifetime: 60, // seconds
        bar: {
            landscape: 'false',
            sizeX: 500,
            sizeY: 500
        },
        pie: {
            sizeX: 500,
            sizeY: 500,
            sizeHighlight: 30
        },
        line: {
            area: 'false',
            sizeX: 500,
            sizeY: 500
        },
        timeline: {
            sizeX: 800,
            sizeY: 400,
            detailRes: 'month',
            overviewRes: 'year'
        },
        map: {
            sizeX: 600,
            sizeY: 400
        },
        mapea: {
            sizeX: 600,
            sizeY: 400
        }
    },

    production: {
        sparqlEndpoint: 'http://dbpedia.org/sparql',
        memcachedServer: 'localhost:11211',
        memcachedLifetime: 1800, // seconds
        bar: {
            landscape: 'false',
            sizeX: 500,
            sizeY: 500
        },
        pie: {
            sizeX: 500,
            sizeY: 500,
            sizeHighlight: 30
        },
        line: {
            area: 'false',
            sizeX: 500,
            sizeY: 500
        },
        timeline: {
            sizeX: 800,
            sizeY: 400,
            detailRes: 'month',
            overviewRes: 'year'
        },
        map: {
            sizeX: 600,
            sizeY: 400
        },
        mapea: {
            sizeX: 600,
            sizeY: 400
        }
    }
};
