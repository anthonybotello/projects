const mongoose = require('mongoose');
const validate = require('mongoose-validator');

mongoose.connect('mongodb://localhost/product-manager',{useNewUrlParser: true});

const ProductSchema = new mongoose.Schema({
    name:{type:String, required:[true, "Product name is required."],minlength:[2,"Product name must be at least two characters."]},
    price:{type:String, required:[true,"Price is required."],validate:validate({validator:'isNumeric',message:'Price must be a number.'})},
    image:{type:String,required:[true,"Image url is required."],validate:validate({validator:'isURL',message:'Enter a valid url.'},{no_symbols:false})}
},{timestamps:true});
const Product = mongoose.model('Product',ProductSchema);

module.exports = Product;