'use strict'
const { validationResult } = require('express-validator');
var UsuariosModel = require('../models/usuarios');

var UsuariosController = {
    get_usuarios: function(req, res){
                           
        UsuariosModel.find({}).then( (data) =>{
            if(data.length == 0) return res.status(404).send({status: 404, message: "La busqueda no genero respuesta"});
            
            return res.status(200).send({
                status: 200,
                usuario: data
            });    
        }).catch( (err) => {
            return res.status(500).send({status: 500, message: "Error en la busqueda"});
        });

        
    },

    get_usuario: function(req, res){

        let params = req.params;

        UsuariosModel.find({mail:params.mail}).then( (data) =>{
            if(data.length == 0) return res.status(404).send({status: 404, message: "La busqueda no genero respuesta"});

            return res.status(200).send({
                status: 200,
                message: "Usuario encontrado",
                usuario: data
            });    
        }).catch( (err) => {
            return res.status(500).send({status: 500, message: "Error en la busqueda"});
        });

    },

    post_usuario: (req, res) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array() });
        }

        var body = req.body;

        UsuariosModel.find({mail:body.mail}).then( (data) =>{
            if(data.length > 0) return res.status(400).send({status: 400, message: "El correo ya esta asociado a un usuario"});
            
            var usuarios_model = new UsuariosModel();

            usuarios_model.mail = body.mail;
            usuarios_model.pass = body.pass;
            usuarios_model.nombre = body.nombre;
            usuarios_model.edad = body.edad;

            usuarios_model.save().then( (usuariosStored) => {
                    if(!usuariosStored) return res.status(404).send({message: "No se pudo almacenar el usuario"});
            
                   return res.status(200).send({
                        status: 200,
                        message: "Usuario almacenado."
                });
                }).catch((err) => {
                    return res.status(500).send({message: err});
                });
                
        }).catch( (err) => {
            return res.status(500).send({status: 500, message: "Error en la busqueda"+err});
        });
    },

    delete_usuario: (req, res) =>{
        let params = req.params;
        UsuariosModel.findOneAndRemove({mail:params.mail}).then((usuariosStored) =>{
            if(!usuariosStored) return res.status(404).send({status: 404, message: "Los datos ingresados son incorrectos"});

            return res.status(200).send({
                status: 200,
                message: "Usuario eliminado",
            });    
        }).catch( (err) => {
            return res.status(500).send({status: 500, message: "Error al eliminar"});
        });;
    },

    update_usuario: (req, res) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        let params= req.params;
        let usuarios_info = req.body;

        let usuarios_info_update = {
            mail: usuarios_info.mail,
            pass: usuarios_info.pass,
            nombre: usuarios_info.nombre,
            edad: usuarios_info.edad,
        };
      
        UsuariosModel.findOneAndUpdate(
          { mail: params.mail },
          usuarios_info_update,
          { new: true }
        )
          .then((usuarioUpdate) => {
            if (!usuarioUpdate) {
              return res.status(404).json({ message: 'No existe el usuario asociado a este correo' });
            }
      
            return res.status(200).json({
              mail: usuarioUpdate.mail,
              pass: usuarioUpdate.pass,
              nombre: usuarioUpdate.nombre,
              edad: usuarioUpdate.edad,
            });
          })
          .catch((err) => {
            return res.status(500).json({ message: 'Error al actualizar' });
          });
    }

};

module.exports = UsuariosController;