'use strict'

var CategoriasController = {
    get_categorias: function(req, res){
        let nom="suma";
        let n1 = 5;
        let n2 = 4;
        return res.send('El resultado de la ' + nom + ' es ' + (n1+n2));
    }
};

module.exports = CategoriasController;