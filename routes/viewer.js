/*jslint vars: false, node: true */
/*global */

/*
 * GET data viewer.
 */

exports.dataViewer = function (req, res) {
    "use strict";

    // 1.- Parsear los parámetros GET

    // TODO

    // 2.- Realizar la consulta al endpoint SPARQL comprobando previamente si
    //     está cacheada en Memcached. Si no está cacheada, habrá que hacer la
    //     consulta y luego cachear el resultado.

    // TODO

    // 3.- Generar la representación visual deseada.

    // TODO

    // 4.- Devolver la respuesta al cliente.

    res.render('viewer.html', {
        layout: false
    });
};
