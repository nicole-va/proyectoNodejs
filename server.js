'use strict'

var app = require('./app');
var port = 3700;

var server = app.listen(port, () => {
    console.log("Servidor Corriendo correctamente en la url: http://localhost:"+port);
});

server.timeout = 120000;