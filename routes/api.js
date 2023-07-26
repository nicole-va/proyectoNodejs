'use strict'

var express = require('express');
var { body } = require('express-validator');
var api = express.Router();
var UsuariosController = require('../controllers/usuarios');
let AuthContoller = require('../controllers/auth');

let userProtectUrl = require('../middlewares/authUser').userProtectUrl;

api.get('/usuarios', UsuariosController.get_usuarios);  //todos los productos
api.get('/usuario/:mail', UsuariosController.get_usuario);  //buscar un producto
api.post('/usuario', userProtectUrl, [
    body('mail').not().isEmpty(),
    body('pass').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty()       // el sku no deberia estar vacio
],UsuariosController.post_usuario);  //agregar un producto
api.delete('/usuario/:mail', UsuariosController.delete_usuario);
api.put('/usuario/:mail', [
    body('pass').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty()       
],UsuariosController.update_usuario);   //actualizar un producto

api.post("/login", [
    body('mail').not().isEmpty(),
    body('pass').not().isEmpty()    
], AuthContoller.login);
api.post("/logout", userProtectUrl, AuthContoller.logout);

module.exports = api;

//Nueva Rama