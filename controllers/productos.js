'use strict'
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
        console.log(req.body)
        return res.status(200).send({
            status: 200,
            data: req.body
        });
    }


};

module.exports = ProductosController;