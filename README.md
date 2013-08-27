jMicro.JS
=========

jMicro.JS - A minimalistic Javascript Framework that works like jQuery

This project was initialy born in Forp-UI :<br>
https://github.com/aterrien/forp-ui

Compatibility :<br>
http://caniuse.com/queryselector

## Sample :

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
