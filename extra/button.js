/**
 * Released under the WTFPL License
 * Copyright (c) 2013 Ioan Chiriac
 * @link https://github.com/ichiriac/jmicro.js
 */
(function($) {
    // light version of the button
    var modal = null;
    var widget = {
        enable: function() {
            return $.each(this, function() {
                $(this).attr('disabled', false);
            });
        },
        disable: function() {
            return $.each(this, function() {
                $(this).attr('disabled', true);
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
                    disabled: null,
                    text: true,
                    label: null,
                    icons: {
                        primary: null,
                        secondary: null
                    }
                }, options
            );
            this.addClass('ui-button ui-widget ui-state-default');
            if ( options.disabled ) {
                this.attr('disabled', true);
            }
            if ( this.icons.primary ) {
                this.append(
                    $('<span>').class(
                        'ui-button-icon-primary ui-icon ui-icon-'
                        + this.icons.primary
                    )
                );
            }
            if ( options.text && options.label ) {
                this.append(
                    $('<span>')
                        .class('ui-button-text')
                        .text(options.label)
                );
            }
            if ( this.icons.secondary ) {
                this.append(
                    $('<span>').class(
                        'ui-button-icon-secondary ui-icon ui-icon-'
                        + this.icons.secondary
                    )
                );
            }
            return this;
        }
    });
})(jMicro);