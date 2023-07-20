'use strict'
var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

//promesa es como una conexion que se queda permanente escuchando 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://0.0.0.0:27017/clase2023', { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() =>{
            console.log('Conexion a la base de datos establecida con exito');

            var server = app.listen(port, () => {
                console.log("Servidor Corriendo correctamente en la url: http://localhost:"+port);
            });

            server.timeout = 120000;
        })
        .catch(err => console.log(err));
41