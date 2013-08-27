/**
 * Released under the MIT License (MIT)
 * Copyright (c) 2013
 *   Ioan Chiriac
 *   Anthony Terrien
 * @link https://github.com/ichiriac/jmicro.js
 */ 
(function(w) {
    "use strict"
    /**
     * Constructor
     */
    w.jMicro = function(selector) {
        return new w.jMicro.fn.construct(selector);
    };
    /**
     * jMicro main class
     */
    w.jMicro.fn = w.jMicro.prototype = {
        // list of current selected nodes
        nodes: null, selector: null,
        // Constructor
        construct: function(selector) {
            if ( selector instanceof w.jMicro.fn.construct ) return selector;
            if ( typeof(selector) == 'string' ) {
                if ( selector.charAt(0) == '<' && selector.charAt( selector.length - 1 ) == '>' ) {
                    var parent = w.document.createElement('DIV');
                    parent.innerHTML = selector;
                    this.nodes = parent.childNodes;
                } else {
                    this.selector = selector;
                    this.nodes = document.querySelectorAll(selector);
                }
            } else if( selector.nodeType ) {
                this.nodes = [selector];
            } else {
                this.nodes = selector;
            }
            return this;
        },
        // searching in current selected nodes
        find: function(selector) {
            // @todo
            return new w.jMicro.DOMElementWrapperCollection(this.element.querySelectorAll(s));
        },
        // execute a closure on each node
        each: function(fn) {
            var l = this.nodes.length;
            for(var i=0; i <l; i++) {
                var node = this.nodes[i];
                if ( !node.nodeType ) {
                    node = node.nodes[0];
                }
                fn.apply(node, [i, node]);
            }
            return this;
        },
        // extends an object with another
        extend: function(obj1, obj2) {
            for(var entry in obj2) {
                if(obj2[entry] instanceof Object) {
                    if(typeof obj2[entry] === 'function') {
                        obj1[entry] = obj2[entry];
                    } else {
                        obj1[entry] = this.extend(obj1[entry], obj2[entry]);
                    }
                } else {
                    (!obj1) && (obj1 = {});
                    obj1[entry] = obj2[entry];
                }
            }
            return obj1;
        },
        // *** events ***
        on: function() {
            // @todo
        },
        live: function() {
            // @todo
        },
        bind: function(event, fn) {
            var self = this;
            return this.each(function() {
                if(!this.events) this.events = {};
                if(!this.events[event]) this.events[event] = [];
                this.events[event].push(fn);
                if (this.addEventListener) {
                    this.addEventListener(
                        event,
                        self.trigger,
                        false
                    );
                } else if (this.attachEvent) {
                    this.attachEvent(
                        "on" + event,
                        self.trigger
                    );
                }
            });
        },
        // events : removes the specified event
        unbind: function(event, fn) {
            return this.each(function() {
                if(this.events[event]) {
                    if (this.removeEventListener) {
                        this.removeEventListener(event, fn, false);
                    } else if (this.detachEvent) {
                        this.detachEvent("on" + event, fn);
                    }
                    for(var i in this.events[event]) {
                        if(this.events[event][i] == fn) {
                            this.events[event].splice(i, 1);
                            return this;
                        };
                    }
                }
            });
        },
        // events : triggers the specified event
        trigger: function(event) {
            if(event.type) {
                for(var fn in this.events[eventType]) {
                    if (this.events[event.type][fn].apply(this, [event]) === false) return false;
                }
            } else {
                return this.each(function() {
                    if(this.events[event]) {
                        for(var fn in this.events[event]) {
                            this.events[event][fn].apply(this, [event]);
                        }
                    }
                });
            }
        },
        // events helpers
        blur: function(fn) { return this.bind('blur', fn); },
        change: function(fn) { return this.bind('change', fn); },
        click: function(fn) { return this.bind('click', fn); },
        dblclick: function(fn) { return this.bind('dblclick', fn); },
        focus: function(fn) { return this.bind('focus', fn); },
        keydown: function(fn) { return this.bind('keydown', fn); },
        keyup: function(fn) { return this.bind('keyup', fn); },
        keypress: function(fn) { return this.bind('keypress', fn); },
        mousedown: function(fn) { return this.bind('mousedown', fn); },
        mouseenter: function(fn) { return this.bind('mouseenter', fn); },
        mouseleave: function(fn) { return this.bind('mouseleave', fn); },
        mousemove: function(fn) { return this.bind('mousemove', fn); },
        mouseout: function(fn) { return this.bind('mouseout', fn); },
        mouseover: function(fn) { return this.bind('mouseover', fn); },
        mouseup: function(fn) { return this.bind('mouseup', fn); },
        resize: function(fn) { return this.bind('resize', fn); },
        scroll: function(fn) { return this.bind('scroll', fn); },
        select: function(fn) { return this.bind('select', fn); },
        submit: function(fn) { return this.bind('submit', fn); },
        focusin: function(fn) { return this.bind('focusin', fn); },
        focusout: function(fn) { return this.bind('focusout', fn); },
        load: function(fn) { return this.bind('load', fn); },
        ready: function(fn) { return this.bind('ready', fn); },
        unload: function(fn) { return this.bind('unload', fn); },
        // dom manipulation
        html: function(value) {
            return this.each(function() {
                this.innerHTML = value;
            });
        },
        text: function(value) {
            return this.each(function() {
                this.innerText = value;
            });
        },
        prepend: function(nodes) {
            if (!(nodes instanceof w.jMicro.fn.construct)) nodes = new w.jMicro.fn.construct(nodes);
            return this.each(function() {
                var self = this;
                nodes.each(function() {
                    self.insertBefore(this, self.firstChild);
                });
            });
        },
        append: function(nodes) {
            if (!(nodes instanceof w.jMicro.fn.construct)) nodes = new w.jMicro.fn.construct(nodes);
            return this.each(function() {
                var self = this;
                nodes.each(function() {
                    self.appendChild(this);
                });
            });
        },
        appendTo: function(nodes) {
            if (!(nodes instanceof w.jMicro.fn.construct)) nodes = new w.jMicro.fn.construct(nodes);
            return this.each(function() {
                var self = this;
                nodes.each(function() {
                    this.appendChild(self);
                });
            });
        },
        remove: function() {
            return this.each(function() {
                this.parentNode.removeChild(this);
            });
        },
        empty: function() {
            return this.html('');
        },
        insertAfter: function(element) {
            this.element.parentNode.insertBefore( element.element, this.element.nextSibling );
            return this;
        },
        // attributes
        getClass: function(c) {
            return this.getAttr("class");
        },
        addClass: function(c) {
            var cArr = c.split(" ");
            for (var i=0; i<cArr.length; i++) {
                if(f.inArray(cArr[i], this.classes)) return this;
                this.classes.push(cArr[i]);
            }
            return this.attr("class", this.classes.join(" "));
        },
        removeClass: function(c) {
            for (var k in this.classes) {
                if (this.classes[k] == c) {
                    this.classes.splice(k, 1);
                }
            }
            return this.attr("class", this.classes.join(" "));
        },
        attr: function(attr, val) {
            if ( typeof val == 'undefined' ) {
                if ( typeof attr == 'object') {
                    for(var key in attr) {
                        this.attr(key, attr[key]);
                    }
                } else {
                    this.nodes[0].getAttribute(attr);
                }
                return this;
            }
            var attr = w.document.createAttribute(attr);
            attr.nodeValue = val;
            return this.each(function() {
                this.setAttribute(attr);
            });
        },
        top: function() {
            return this.getPosition().y;
        },
        getPosition: function() {
            var x = 0, y = 0, e = this.nodes[0];
            while(e){
                x += e.offsetLeft;
                y += e.offsetTop;
                e = e.offsetParent;
            }
            return {x: x, y: y};
        },
        height: function() {
            return this.nodes[0].offsetHeight;
        },
        width: function() {
            return this.nodes[0].offsetWidth;
        },
        css: function(p, complete)
        {
            var transitionEnd = f.Normalizr.getEventTransitionEnd();
            var _c = function() {
                complete();
                document.removeEventListener(transitionEnd, _c);
            };
            document.addEventListener(transitionEnd, _c);
            this.attr("style", p);
            return this;
        },
        // dom traversal
        nextSibling: function() {
            return f.wrap(this.element.nextSibling);
        },
        addEventListener: function(listener) {
            listener.target = this;
            listener.init();
            return this;
        },
        scrollBottom: function() {
            var max = 0;
            return this.each(function() {
                if ( this.nodes[0].firstChild.offsetHeight > max) {
                    max = this.nodes[0].firstChild.offsetHeight;
                }
            }).each(function() {
                this.scrollTop = max;
            });
        },
        parent: function() {
            return new w.jMicro.fn.construct(this.nodes[0].parentNode);
        }
    };
    // Gives the context to the constructor
    w.jMicro.fn.construct.prototype = w.jMicro.fn;
})(window);