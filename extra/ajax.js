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
        send: function(url, method, headers, data, callback) {
            var xhr = this.xhr();
            xhr.open(method,url,true);
            xhr.onreadystatechange=function(){
                if ( callback[xhr.readyState] ) {
                    callback[xhr.readyState].apply(
                        xhr, []
                    );
                }
            };
            for(var header in headers) {
                xhr.setRequestHeader(header,headers);
            }
            xhr.send(data);
            return xhr;
        }
    };
    $.extend({
        support: {
            ajax: widget.xhr(),
            cors: 'withCredentials' in widget.xhr()
        },
        ajax: function(options) {
            options = $.extend(true, {}, {
                type: 'GET',
                url: document.location.href,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                success: function() { },
                data: {}
            }, options);
            if ( options.type == 'POST' ) {
                options.headers['Content-type'] = 'application/x-www-form-urlencoded';
            }
            return widget.send(
                options.url,
                options.type,
                options.headers,
                options.data,
                { // ready states :
                    4: options.success
                }
            );
        }
    });
})(jMicro);