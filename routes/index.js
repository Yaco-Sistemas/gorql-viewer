/*jslint vars: false, node: true */
/*global */

/*
 * GET home page.
 */

exports.index = function (req, res) {
    "use strict";
    res.render('index', {
        title: 'Express'
    });
};
