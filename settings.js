/*jslint vars: false, node: true */
/*global */

exports.settings = {
    development: {
        sparqlEndpoint: 'http://dbpedia.org/sparql',
        memcachedServer: 'localhost:11211',
        memcachedLifetime: 60, // seconds
        bar: {
            landscape: 'false',
            sizeX: 500,
            sizeY: 500,
            sizeLabel: 70
        },
        pie: {
            sizeX: 500,
            sizeY: 500,
            sizeLabel: 100
        },
        line: {
            area: 'false',
            sizeX: 500,
            sizeY: 500,
            sizeLabel: 100
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
        }
    },

    production: {
        sparqlEndpoint: 'http://dbpedia.org/sparql', // TODO
        memcachedServer: 'localhost:11211', // TODO
        memcachedLifetime: 1800, // seconds
        bar: {
            landscape: 'false',
            sizeX: 500,
            sizeY: 500,
            sizeLabel: 70
        },
        pie: {
            sizeX: 500,
            sizeY: 500,
            sizeLabel: 100
        },
        line: {
            area: 'false',
            sizeX: 500,
            sizeY: 500,
            sizeLabel: 100
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
        }
    }
};