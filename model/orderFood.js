const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const orderSchema = new Schema({  
    user:{type: Schema.ObjectId, ref: 'User'},
    status:{
        type:String,
        enum:['Pending','In Progress','Delivered'],
        default:'Pending'
    },
    foodId:[{type: Schema.ObjectId, ref: 'Dishe'}],
});

module.exports = mongoose.model('FoodOrder', orderSchema)