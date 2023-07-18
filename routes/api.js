'use strict'

var express = require('express');
var api = express.Router();



app.get('/productos', function (req, res) {
    res.status(200).send({
        status: 200,
        message: "Hola mundo"
    });
});