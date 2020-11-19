const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const orderSchema = new Schema({

    no_of_guest:{type:Number},
    date:{type:Date},
    reservation_by:{type: Schema.ObjectId, ref: 'User'},
    status:{
        type:String,
        enum:['Pending','Booked'],
        default:'Pending'
    },
});



module.exports = mongoose.model('TableOrder', orderSchema)