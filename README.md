jMicro.js
=========

jMicro.js - A minimalistic Javascript Framework that works like jQuery

This project was initialy born in Forp-UI :<br>
https://github.com/aterrien/forp-ui

## Why ?

You may ask why I made this project and why should you use it ?

1 - Because it's lightweight

If you want to distribute a script that has already a good weight, and you want
to put jQuey inside it will take some 60Kb (minified+gzipped)

2 - To avoid conflicts

If you want to provide a standalone widget, you can't handle simply jQuery 
versions conflicts, and anyway, you will have load 2 versions of jQuery
(back reason 1 - weight)

3 - Because coding is fun, and I love make things smaller :)

## About the project

Compatibility :<br>
IE 9, FF 3.5, CHROME, SAFARI, OPERA 10 (+ any mobile browser)

Passing allmost all jQuery Core Unit Tests

Runs without any conflict when jQuery or Prototype is loaded

## About the size

300 lines of code (without any coding tricks)

5.58Kb minified

1.79Kb minified + gzipped

## Sample

```html
<!DOCTYPE html>
<html>
  <head>
    <title>jMicro - Hello</title>
  </head>

  <body>
    <div id="hello"></div>
    <script type="text/javascript" src="../jmicro.js"></script>
    <script type="text/javascript">
        (function($) {
          $('#hello').css({
            border: 'solid 1px #0000ff',
            padding: 8,
            backgroundColor: '#ffaaaa'
          })
          .html('hello <b>world</b>')
          .click(function() {
            $(this).text('You clicked on me !');
          });
        })(jMicro);
    </script>
  </body>
</html>
```

## jMicro.js vs jQuery

Actualy handling :
* Selectors (of course!)
* Attributes
* Dom Manipulation
* Styles
* Classes
* Events
* Core : extend, each, get ... 

Does not handle* :
* Ajax & Data Storage
* Effects

*(*will come soon as external components)*
