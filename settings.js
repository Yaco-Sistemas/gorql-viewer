/*jslint vars: false, node: true */
/*global */

exports.settings = {
    development: {
        sparqlEndpoint: 'http://dbpedia.org/sparql',
        memcachedServer: 'localhost:11211',
        memcachedLifetime: 60, // seconds
        bar: {
            landscape: false,
            sizeX: 500,
            sizeY: 500,
            sizeLabel: 70
        }
    },

    production: {
        sparqlEndpoint: 'http://dbpedia.org/sparql', // TODO
        memcachedServer: 'localhost:11211', // TODO
        memcachedLifetime: 1800, // seconds
        bar: {
            landscape: false,
            sizeX: 500,
            sizeY: 500,
            sizeLabel: 70
        }
    }
};