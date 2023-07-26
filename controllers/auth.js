'use strict'
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
var Usuarios = require('../models/usuarios');
var Sessions = require('../models/sessions');

var controller = {
    login: function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let login_info = req.body;

        Usuarios.findOne({ mail: login_info.mail, pass: login_info.pass }).exec().then(async (usuario) => {
            if (!usuario) return res.status(200).send({ status: 200, message: "Los datos no son validos" });

            const payload = {
                user_id: usuario.id
            };

            const access_token = jwt.sign(payload, 'ndMpuG6yANwxfX0y589RYiSF5gvvxjl9Q2IIvw1VCVaUze6USn', {
                expiresIn: '1d'
            });

            let update = {
                user_id: usuario.id,
                jwt: access_token
            };

            try {
                const sessionsUpdate = await Sessions.findOneAndUpdate(
                    { user_id: usuario.id },
                    update,
                    { upsert: true, new: true }
                );

                if (!sessionsUpdate) {
                    return res.status(404).send({ message: "Datos erroneos" });
                }

                return res.status(200).json({
                    status: 200,
                    message: "Autenticacion correcta.",
                    token: access_token,
                });
            } catch (err) {
                return res.status(500).send({ message: err });
            }
                     
            return res.status(200).send({
                status: 200,
                message: "Usuario logueado",
                token: access_token
            });

        }).catch((err) => {     
            return res.status(500).send({ status: 500, message: err });
        });

    },

    logout: function (req, res) {
        console.log(req.decoded);
        Sessions.findOneAndRemove({ user_id: req.decoded.user_id })
            .exec()
            .then((sessionDeleted) => {
                if (!sessionDeleted) {
                    return res.status(404).send({ message: "Datos erroneos." });
                }

                return res.status(200).send({
                    message: "Usuario salió correctamente.",
                });
            })
            .catch((err) => {
                return res.status(500).send({ message: err });
            });

          
    }

}

module.exports = controller;