/*jslint vars: false, node: true, nomen: true, sub: true */
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

/**
 * Module dependencies.
 */

var express = require('express'),
    lingua = require('lingua'),
    Memcached = require('memcached'),
    viewer = require('./routes/viewer'),
    png = require('./routes/png'),
    svg = require('./routes/svg'),
    kml = require('./routes/kml'),
    settings = require('./settings'),
    dirname = require('path').dirname,
    readFileSync = require('fs').readFileSync,
    globalOpts = settings.settings.global,
    app = module.exports = express.createServer(),
    configureApp,
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

    app.use(lingua(app, {
        defaultLocale: 'en',
        path: __dirname + '/i18n'
    }));

    app.set('debug_charts', globalOpts.debug);
    app.set('viewer_host', globalOpts.host);
    app.set('siteLogo', globalOpts.logo);
    app.set('siteTitle', globalOpts.title);
    app.set('staticUrl', globalOpts.staticUrl);
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    // static is not in dot notation because of JSLint
    app.use(express['static'](__dirname + '/public'));

    app.use(app.router);
});

configureApp = function (app, opts) {
    "use strict";
    app.set('sparql endpoint', opts.sparqlEndpoint);
    app.set('memcached', new Memcached(opts.memcachedServer));
    app.set('memcached lifetime', opts.memcachedLifetime);
    app.set('bar', opts.bar);
    app.set('pie', opts.pie);
    app.set('line', opts.line);
    app.set('timeline', opts.timeline);
    app.set('map', opts.map);
    app.set('mapea', opts.mapea);
};

app.configure('development', function () {
    "use strict";
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
    configureApp(app, settings.settings.development);
});

app.configure('production', function () {
    "use strict";
    app.use(express.errorHandler());
    configureApp(app, settings.settings.production);
});

// Routes

app.get('/viewer/', viewer.dataViewer);
app.get('/png/', png.get);
app.get('/svg/', svg.get);
app.get('/kml/', kml.get);

// Start server

app.listen(globalOpts.port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
