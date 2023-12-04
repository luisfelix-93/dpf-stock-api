const mongoose = require('mongoose');

/*
'product' : {
'idProduct' : ' type : Object ',
'nmProduct' : ' type : String ',
'qtdProduct' : ' type : Number ',
'qtdMinima' : ' type : Number ',
'dtRestock' : ' type: Date '
}
*/

const productSchema = new mongoose.Schema({
    nmProduct : {type: String, rquired: true},
    qtdProduct : {type: Number, required: true},
    qtdMinima : {type: Number, required: false},
    dtRestock : {type: Date, required: false},
    idUser :  {type: String, ref: 'User', rquired: true}
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;