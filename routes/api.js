'use strict'

var express = require('express');
var api = express.Router();
var ProductosController = require('../controllers/productos');
var CategoriasController = require('../controllers/categorias');

api.get('/productos', ProductosController.get_products);
api.post('/productos', ProductosController.post_products);


api.get('/precio', CategoriasController.get_categorias);

module.exports = api;