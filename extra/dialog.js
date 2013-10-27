/**
 * Released under the WTFPL License
 * Copyright (c) 2013 Ioan Chiriac
 * @link https://github.com/ichiriac/jmicro.js
 */
(function($) {
    // light version of the dialog
    var modal = null;
    var widget = {
        close: function() {
            return $.each(this, function() {
                if ( this.uiOptions.modal ) {
                    modal.remove();
                }
                $(this).hide().trigger('close');
            });
        }
    };
    // widget entry point
    $.extend({
        dialog: function(options) {
            // callback
            if ( typeof options == 'string' ) {
                return widget[options].apply(this);
            }
            // constructor
            options = $.extend(true, {},
                {
                    modal: false,
                    width: 300,
                    height: 300,
                    title: 'Dialog'
                }, options
            );
            if ( options.modal ) {
                if (!modal) {
                    modal = $('<div>').class('ui-widget-overlay ui-front').css({
                        position: 'absolute',
                        top: 0, left: 0,
                        width: '100%', height: '100%'
                    }).appendTo(document);
                }
            }
            return this.each(function() {
                this.uiOptions = options;
                var $this = $(this);
                $('<div>').class('ui-dialog ui-widget ui-widget-content ui-front').css({
                    position: 'absolute',
                    width: options.width,
                    zIndex: 901,
                }).append([
                    $('<div>').class('ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix').append([
                        $('<span>').class('ui-dialog-title').text(options.title),
                        $('<button>').button({
                            icons: { primary: 'closethick' },
                            text: false
                        }).on('click', function() {
                                $this.dialog('close');
                        })
                    ])
                    ,
                    $this.remove().addClass('ui-dialog-content ui-widget-content').css({
                        height: options.height
                    })
                ]).appendTo(document);
            });
        }
    });
})(jMicro);