'use strict'
const express = require('express')
const app = express()

var api_routes = require('./routes/api');

//get se usa para solicitar informacion - no manda
//req parametro trae los datos de la peticion
//res salida lo que vamos a responder
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

app.get('/productos', function (req, res) {
    res.status(200).send({
        status: 200,
        message: "Hola mundo"
    })
  })

app.get('/precio', function (req, res) {
    let nom="suma";
    let n1 = 5;
    let n2 = 4;
    res.send('El resultado de la ' + nom + ' es ' + (n1+n2));
  })


console.log("Servidor Corriendo")

app.listen(3700)