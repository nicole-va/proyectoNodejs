'use strict'

const jwt = require('jsonwebtoken');
const middlewares = {
    userProtectUrl: function(req, res, next){
        const token = req.headers['access-token'];
        if(token){
            jwt.verify(token, 'ndMpuG6yANwxfX0y589RYiSF5gvvxjl9Q2IIvw1VCVaUze6USn', (err, decoded) =>{
                if(err){
                    return res.status(403).json({message: "Token invalida."});
                }else{
                    req.decoded = decoded;
                    next();
                }
            });
        }else{
            res.status(403).send({
                message: "Token no validaa."
            });
        }
    }
};
module.exports = middlewares;