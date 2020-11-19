const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DishSchema = new Schema({  
    food_name:{type:String},
    category:{
        type:String,
        enum:['Breakfast','Lunch','Dinner'],
    },
    cost:{type:Number},
    image:{
        type:String,
        default:'/assets/images/test.jpg'
    },
});

module.exports = mongoose.model('Dishe', DishSchema)