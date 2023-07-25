'use strict'

const jwt = require('jsonwebtoken');
let Sessions = require('../models/sessions')

const middlewares = {
    userProtectUrl: function (req, res, next) {
        const token = req.headers['access-token'];
        if (token) {
            jwt.verify(token, 'ndMpuG6yANwxfX0y589RYiSF5gvvxjl9Q2IIvw1VCVaUze6USn', (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: "Token invalida." });
                } else {
                    req.decoded = decoded;
                    /* Sessions.findOne({user_id: req.decoded.user_id, jwt: token}).exec( (err, sessions)=>{
                         if(err) return req.status(500).send({message:"Error al devolver los datos."});
                         if(!sessions) return res.status(404).send({message:"Los datos de autenticacion no son validos."})
                         next();
                     });*/

                    Sessions.findOne({ user_id: req.decoded.user_id, jwt: token })
                        .exec()
                        .then((sessions) => {
                            if (!sessions) {
                                return res.status(404).send({ message: "Los datos de autenticación no son válidos." });
                            }
                            next();
                        })
                        .catch((err) => {
                            return res.status(500).send({ message: "Error al devolver los datos." });
                        });

                }
            });
        } else {
            res.status(403).send({
                message: "Token no validaa."
            });
        }
    }
};
module.exports = middlewares;