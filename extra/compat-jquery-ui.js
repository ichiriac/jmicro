/**
 * Released under the WTFPL License
 * Copyright (c) 2013 Ioan Chiriac
 * @link https://github.com/ichiriac/jmicro.js
 */
(function($) {
    // handles the compatibilities to be able to run jquery ui (or plugins)
    $.expr = { ':': {} };
    $.support = {};
    // jQuery Core Helpers
    $.extend({
        isArray: Array.isArray,
        isPlainObject: function(obj) {
            return obj instanceof Object && obj.nodeType == undef;
        },
    });
})(jMicro);