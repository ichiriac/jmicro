/**
 * Released under the WTFPL License
 * Copyright (c) 2013 Ioan Chiriac
 * @link https://github.com/ichiriac/jmicro.js
 */
(function($) {
    // handles the compatibilities to be able to run jquery ui (or plugins)
    $.expr = { ':': {} };
    var readyWidget = {
        isStarted: false,
        isBinded: false,
        bindEvent: function(doc) {
            if ( this.isStarted ) return;
            if ( this.isBinded ) return;
            this.isBinded = true;
            if ( doc.readyState == 'complete' ) {
                this.isStarted = true;
            } else {
                doc.addEventListener( "DOMContentLoaded", this.triggerEvent, false );
            }
            return doc;
        },
        triggerEvent: function(e) {
            if ( readyWidget.isStarted ) return;
            readyWidget.isStarted = true;
            document.removeEventListener( "DOMContentLoaded", readyWidget.triggerEvent, false );
            $(document).trigger('ready');
        }
    };
    // jQuery UI Helpers
    $.extend({
        hover: function( over, out ) {
            return this
                .on('mouseover', over)
                .on('mouseout', out)
            ;
        },
        ready: function( callback ) {
            var doc = readyWidget.bindEvent(
                this.length > 0 ?
                this[0].ownerDocument :
                document
            );
            if ( readyWidget.isStarted ) {
                setTimeout(callback);
            } else {
                $(doc).on('ready', callback);
            }
            return this;
        }
    });
})(jMicro);