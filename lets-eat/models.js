const mongoose = require('mongoose');
const validate = require('mongoose-validator');

mongoose.connect('mongodb://localhost/MEAN-belt-exam',{useNewUrlParser: true});

const ReviewSchema = new mongoose.Schema({
    name:{type:String,required:[true,"Name is required."],minlength:[3, "Name must be at least 3 characters"]},
    stars:{type:Number,required:[true,"Star rating is required."],min:[1,"Rating must be at least 1 star."],max:[5,"Rating can't exceed 5 stars."]},
    content:{type:String,required:[true,"Review cannot be blank."],minlength:[3, "Review must be at least 3 characters"]}
},{timestamps:true});
const Review = mongoose.model('Review',ReviewSchema);

const RestaurantSchema = new mongoose.Schema({
    name:{type:String,required:[true,"Restaurant name is required."],minlength:[3,"Restaurant name must be at least 3 characters."]},
    cuisine:{type:String,required:[true,"Type of cuisine is required."],minlength:[3,"Type of cuisine must be at least 3 characters."]},
    reviews:[ReviewSchema]
},{timestamps:true});
const Restaurant = mongoose.model('Restaurant',RestaurantSchema);

module.exports = {Restaurant,Review}; 