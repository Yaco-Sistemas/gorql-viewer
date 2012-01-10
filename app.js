/*jslint vars: false, node: true, nomen: true, sub: true */
/*global */

/**
 * Module dependencies.
 */

var express = require('express'),
    Memcached = require('memcached'),
    viewer = require('./routes/viewer'),
    png = require('./routes/png'),
    svg = require('./routes/svg'),
    settings = require('./settings'),
    app = module.exports = express.createServer(),
    initMemcached;

// Utilities

initMemcached = function (client, server, app) {
    "use strict";
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
    var opts = settings.settings.development,
        cache = new Memcached(opts.memcachedServer);
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
    app.set('sparql endpoint', opts.sparqlEndpoint);
    app.set('memcached', cache);
    app.set('memcached lifetime', opts.memcachedLifetime);
    app.set('bar', opts.bar);
    app.set('pie', opts.pie);
    app.set('line', opts.line);
    app.set('timeline', opts.timeline);
});

app.configure('production', function () {
    "use strict";
    var opts = settings.settings.production,
        cache = new Memcached(opts.memcachedServer);
    app.use(express.errorHandler());
    app.set('sparql endpoint', opts.sparqlEndpoint);
    app.set('memcached', cache);
    app.set('memcached lifetime', opts.memcachedLifetime);
    app.set('bar', opts.bar);
    app.set('pie', opts.pie);
    app.set('line', opts.line);
    app.set('timeline', opts.timeline);
});

// Routes

app.get('/viewer/', viewer.dataViewer);
app.get('/png/', png.get);
app.get('/svg/', svg.get);

// Start server

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
