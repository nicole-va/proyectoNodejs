'use strict'

var express = require('express');
var { body } = require('express-validator');
var api = express.Router();
var ProductosController = require('../controllers/productos');
var CategoriasController = require('../controllers/categorias');
let AuthContoller = require('../controllers/auth');

let userProtectUrl = require('../middlewares/authUser').userProtectUrl;

api.get('/productos', ProductosController.get_products);  //todos los productos
api.get('/producto/:sku', ProductosController.get_product);  //buscar un producto
api.post('/productos', userProtectUrl, [
    body('sku').not().isEmpty(),
    body('name').not().isEmpty(),
    body('price').not().isEmpty(),
    body('description').not().isEmpty(),
    body('image').not().isEmpty()       // el sku no deberia estar vacio
],ProductosController.post_products);  //agregar un producto
api.delete('/productos/:sku', ProductosController.delete_products);
api.put('/productos/:sku', [
    //body('sku').not().isEmpty(),
    body('name').not().isEmpty(),
    body('price').not().isEmpty(),
    body('description').not().isEmpty(),
    body('image').not().isEmpty()       // el sku no deberia estar vacio
],ProductosController.update_products);   //actualizar un producto

api.post("/login", [
    body('mail').not().isEmpty(),
    body('pass').not().isEmpty()    
], AuthContoller.login);
api.post("/logout", userProtectUrl, AuthContoller.logout);

api.get('/categorias', CategoriasController.get_categorias);

module.exports = api;

//Nueva Rama