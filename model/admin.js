const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const AdminSchema = new Schema({
	email:{type:String,unique:true},
	password:{type:String,select:false},
	
});

module.exports = mongoose.model('Admin', AdminSchema)