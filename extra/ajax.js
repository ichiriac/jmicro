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
            }catch(e){
                try{
                    return new ActiveXObject('Msxml2.XMLHTTP');
                } catch(e) {
                    return new ActiveXObject('Microsoft.XMLHTTP');
                }
            }
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
            cors: true
        },
        ajax: function(options) {
            options = $.extend(true, {}, {
                method: 'GET',
                url: document.location.href,
                headers: {},
                success: function() { },
                data: {}
            }, options);
            if ( options.method == 'POST' ) {
                options.headers['Content-type'] = 'application/x-www-form-urlencoded';
            }
            return widget.send(
                options.url,
                options.method,
                options.headers,
                options.data,
                { // ready states :
                    4: options.success
                }
            );
        }
    });
})(jMicro);