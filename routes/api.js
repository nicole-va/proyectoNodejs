'use strict'

var express = require('express');
var { body } = require('express-validator');
var api = express.Router();
var UsuariosController = require('../controllers/usuarios');
let AuthContoller = require('../controllers/auth');

let userProtectUrl = require('../middlewares/authUser').userProtectUrl;

api.get('/usuarios', userProtectUrl, UsuariosController.get_usuarios);  
api.get('/usuario/:mail', userProtectUrl, UsuariosController.get_usuario); 
api.post('/usuario', userProtectUrl, [
    body('mail').not().isEmpty(),
    body('pass').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty()       
],UsuariosController.post_usuario);  
api.delete('/usuario/:mail', userProtectUrl, UsuariosController.delete_usuario);
api.put('/usuario/:mail', userProtectUrl, [
    body('pass').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty()       
],UsuariosController.update_usuario);   

api.post("/login", [
    body('mail').not().isEmpty(),
    body('pass').not().isEmpty()    
], AuthContoller.login);
api.post("/logout", userProtectUrl, AuthContoller.logout);

module.exports = api;
