/**
 * Released under the WTFPL License
 * Copyright (c) 2013 Ioan Chiriac
 * @link https://github.com/ichiriac/jmicro.js
 */
(function($) {
    var widget = {
        xhr: function() {
            try {
                return new XMLHttpRequest();
            }catch(e) { }
        },
        send: function(url, method, headers, data) {
            var xhr = this.xhr();
            if (!xhr) throw new Error('Your browser does not handle AJAX');
            xhr.open(method,url,true);
            for(var header in headers) {
                xhr.setRequestHeader(header,headers[header]);
            }
            xhr.send(data ? $.param(data).join('&') : null);
            return xhr;
        }
    };
    $.extend({
        support: {
            ajax: widget.xhr(),
            cors: 'withCredentials' in widget.xhr()
        },
        param: function(data, prefix) {
            var s = [];
            for( var key in data ) {
                var value = data[key];
                if ( typeof value == 'function') value = value();
                if ( typeof value == 'object') {
                    s = s.concat(this.param(value, prefix ? prefix + '[' + key + ']' : key));
                } else {
                    key = encodeURIComponent(key);
                    s.push((prefix ? prefix + '[' + key + ']' : key) + '=' + encodeURIComponent(value));
                }
            }
            return s;
        },
        done: function(fn) { return this.on('success', fn); },
        fail: function(fn) { return this.on('error', fn); },
        allways: function(fn) { return this.on('complete', fn); },
        ajax: function(options) {
            options = $.extend(true, {}, {
                type: 'GET',
                url: document.location.href,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                },
                success: function() { },
                data: {}
            }, options);
            if ( options.type == 'POST' ) {
                options.headers['Content-type'] = 'application/x-www-form-urlencoded';
            }
            var xhr = $([widget.send(
                options.url,
                options.type,
                options.headers,
                options.data,
                { // ready states :
                    done: options.success
                }
            )]);
            xhr[0].onreadystatechange = function() {
                if ( xhr[0].readyState === 4 ) {
                    if ( xhr[0].status >= 200 && xhr[0].status < 300 || xhr[0].status === 304 ) {
                        if ( options.success ) {
                            options.success.apply(
                                xhr,
                                [JSON.parse(xhr[0].responseText), xhr[0]]
                            );
                        }
                        xhr.trigger('success');
                    } else {
                        if ( options.error ) {
                            options.error.apply(
                                xhr,
                                [xhr[0], xhr[0].status, xhr[0].statusText]
                            );
                        }
                        xhr.trigger('error');
                    }
                }
            };
            return xhr.on('readystatechange', function() {
                $(this).trigger('ajaxComplete').trigger('complete');
            });
        }
    });
})(jMicro);