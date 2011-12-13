/*jslint vars: false, node: true, nomen: true, sub: true */
/*global */

/**
 * Module dependencies.
 */

var express = require('express'),
    Memcached = require('memcached'),
    viewer = require('./routes/viewer'),
    app = module.exports = express.createServer(),
    initMemcached;

// Utilities

initMemcached = function (client, server, app) {
    // TODO what if there are more than just one server
    client.connect(server, function (err, conn) {
        if (err) {
            console.error('Error connecting to memcached');
            console.error(err);
            console.error('Cache won\'t be available');
            app.set('memcached', null);
        } else {
            console.log('Connected to memcached');
            console.log(conn.server);
        }
    });
};

// Configuration

app.configure(function () {
    "use strict";
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.register('.html', require('jqtpl').express);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    // static is not in dot notation because of JSLint
    app.use(express['static'](__dirname + '/public'));
});

app.configure('development', function () {
    "use strict";
    var cache = new Memcached('localhost:11211');
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
    app.set('sparql endpoint', 'http://dbpedia.org/sparql');
    app.set('memcached', cache);
});

app.configure('production', function () {
    "use strict";
    var cache = new Memcached('localhost:11211');  // TODO
    app.use(express.errorHandler());
    app.set('sparql endpoint', 'http://dbpedia.org/sparql');  // TODO
    app.set('memcached', cache);
});

// Routes

app.get('/viewer/', viewer.dataViewer);

// Start server

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
