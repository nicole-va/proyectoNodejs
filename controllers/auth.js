'use strict'
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
var Usuarios = require('../models/usuarios');
var controller = {
    login: function(req, res){
//req es los datos q da el usuario
        //validamos los datos que el usuarios envia al endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }

        let login_info = req.body;

        Usuarios.findOne({mail: login_info.mail, pass: login_info.pass}).exec().then( (usuario) =>{
            if(!usuario) return res.status(200).send({status: 200, message: "Los datos no son validos"});

            const payload = {
                user_id : usuario.id
            };

            const access_token = jwt.sign(payload, 'ndMpuG6yANwxfX0y589RYiSF5gvvxjl9Q2IIvw1VCVaUze6USn',{
                expiresIn: '1d'
            });
console.log(access_token)
            return res.status(200).send({
                status: 200,
                message: "Usuario logueado",
                token: access_token
            });    
        }).catch( (err) => {
            return res.status(500).send({status: 500, message: err});
        });

    },

    logout: function(req, res){

    }

}

module.exports = controller;