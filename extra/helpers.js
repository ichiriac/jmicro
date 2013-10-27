/**
 * Released under the WTFPL License
 * Copyright (c) 2013 Ioan Chiriac
 * @link https://github.com/ichiriac/jmicro.js
 */
(function($) {
    // jQuery extra Core Helpers
    $.extend({
        isArray: Array.isArray,
        isPlainObject: function(obj) {
            return obj instanceof Object && obj.nodeType == undef;
        },
        contains: function(parent, child) {
            if ( typeof child !== 'object' ) return false;
            while(child = child.parentNode) {
                if ( child === parent ) return true;
            }
            return false;
        }
    });
})(jMicro);