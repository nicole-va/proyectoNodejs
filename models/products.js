'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductsSchema = Schema({  
    sku: Number,
    name: String,
    price: Number,
    description: String,
    image: String
});
//nombre de la coleccion 
module.exports = mongoose.model('productos', ProductsSchema);