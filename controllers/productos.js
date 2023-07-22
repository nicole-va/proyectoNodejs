'use strict'
const { validationResult } = require('express-validator');
var ProductModel = require('../models/products');

var ProductosController = {
    get_products: function(req, res){
                           
        // ProductModel.find({}).exec(async (err, products) => {
        //    console.log("Aqui");
        // });
        //trae info de la base de datos
        ProductModel.find({}).then( (data) =>{
            if(data.length == 0) return res.status(404).send({status: 404, message: "La busqueda no genero respuesta"});
            
            return res.status(200).send({
                status: 200,
                message: "Productos encontrados",
                productos: data
            });    
        }).catch( (err) => {
            return res.status(500).send({status: 500, message: "Error en la busqueda"});
        });

        
    },

    get_product: function(req, res){

        let params = req.params;

        ProductModel.find({sku:params.sku}).then( (data) =>{
            if(data.length == 0) return res.status(404).send({status: 404, message: "La busqueda no genero respuesta"});

            return res.status(200).send({
                status: 200,
                message: "Producto encontrado",
                productos: data
            });    
        }).catch( (err) => {
            return res.status(500).send({status: 500, message: "Error en la busqueda"});
        });

        // return res.status(200).send({
        //     status: 200,
        //     message: "Producto encontrado",
        //     productos: [
        //         {
        //             sku: 123,
        //             precio: 234.50,
        //             descripcion: "Este es un mani",
        //             imagen: "imagen.jpg"
        //         }
        //     ]
        // });

    },

    post_products: (req, res) =>{
        //validamos los datos que se envian al endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array() });
        }

        var body = req.body;

        ProductModel.find({sku:body.sku}).then( (data) =>{
            if(data.length > 0) return res.status(400).send({status: 400, message: "El producto ya existe en la tienda"});
            
            var products_model = new ProductModel();

            products_model.sku = body.sku;
            products_model.name = body.name;
            products_model.price = body.price;
            products_model.description = body.description;
            products_model.image = body.image;

            products_model.save().then( (productsStored) => {
                    //if(err) return res.status(500).send({message: err});
            
                    if(!productsStored) return res.status(404).send({message: "No se pudo almacenar el registro"});
            
                   return res.status(200).send({
                        status: 200,
                        message: "Producto almacenado."
                });
                }).catch((err) => {
                    return res.status(500).send({message: err});
                });
            
        }).catch( (err) => {
            return res.status(500).send({status: 500, message: "Error en la busqueda"});
        });


        
//ingresa a la base de datos

        // products_model.save( (err, productsStored) => {
        //     if(err) return res.status(500).send({message: err});

        //     if(!productsStored) return res.status(404).send({message: "No se pudo almacenar el registro"});

        //     return res.status(200).send({
        //         status: 200,
        //         message: "Producto almacenado"
        //     });
        // });


    },

    delete_products: (req, res) =>{
        let params = req.params;
        ProductModel.findOneAndRemove({sku:params.sku}).then((productsStored) =>{
            if(!productsStored) return res.status(404).send({status: 404, message: "Los datos ingresados son incorrectos"});

            return res.status(200).send({
                status: 200,
                message: "Producto eliminado",
            });    
        }).catch( (err) => {
            return res.status(500).send({status: 500, message: "Error al eliminar"});
        });;
    },

    update_products: (req, res) =>{
        //validadmos los datos que se envian el endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        let params= req.params;
        let products_info = req.body;

        let products_info_update = {
            sku: products_info.sku,
            name: products_info.name,
            price: products_info.price,
            description: products_info.description,
            image: products_info.image
        };
      
        ProductModel.findOneAndUpdate(
          { sku: params.sku },
          products_info_update,
          { new: true }
        )
          .then((productoUpdate) => {
            if (!productoUpdate) {
              return res.status(404).json({ message: 'No existe el producto' });
            }
      
            return res.status(200).json({
              sku: productoUpdate.sku,
              name: productoUpdate.name,
              price: productoUpdate.price,
              description: productoUpdate.description,
              image: productoUpdate.image
            });
          })
          .catch((err) => {
            return res.status(500).json({ message: 'Error al actualizar' });
          });
    }


};

module.exports = ProductosController;