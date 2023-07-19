'use strict'
const express = require('express')
const app = express();
var bodyParser = require('body-parser');

var api_routes = require('./routes/api');

//Middlewares  - son funcionalidades que se van agregando a la aplicacion
app.use(bodyParser.urlencoded({
    extended:false
}));

app.use(bodyParser.json({
    parameterLimit: 100000,
    limit: '50mb',
    extended:false
}));

app.use( (err, req, res, next) =>{
    if(err instanceof SyntaxError && err.status === 400 && 'body' in err){
        return res.status(400).send({ status: 400, message: err.message});
    }
    next();
});
//get se usa para solicitar informacion - no manda
//req parametro trae los datos de la peticion
//res salida lo que vamos a responder
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

app.use('/api/', api_routes);


module.exports = app;