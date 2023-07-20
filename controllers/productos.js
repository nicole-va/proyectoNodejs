'use strict'
var ProductModel = require('../models/products');

var ProductosController = {
    get_products: function(req, res){

        return res.status(200).send({
            status: 200,
            message: "Productos encontrados",
            productos: [
                {
                    sku: 123,
                    precio: 234.50,
                    descripcion: "Este es un mani"
                },
                {
                    sku: 345,
                    precio: 34.50,
                    descripcion: "Mom jeans"
                },
                {
                    sku: 678,
                    precio: 24.50,
                    descripcion: "Wide leg"
                } 
            ]
        });

    },

    get_product: function(req, res){

        return res.status(200).send({
            status: 200,
            message: "Producto encontrado",
            productos: [
                {
                    sku: 123,
                    precio: 234.50,
                    descripcion: "Este es un mani",
                    imagen: "imagen.jpg"
                }
            ]
        });

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