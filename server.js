var express = require("express");
var app = express();

app.set('port', (process.env.PORT || 8080));
app.use(express.static(__dirname + '/gh-pages/'));

app.listen(app.get('port'), function() {
  console.log('Servidor en funcionamiento en el puerto 8080');
});