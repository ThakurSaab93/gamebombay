const mongoose =require('mongoose');

const adminSchema= mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    isAdmin:{type:Boolean, default:false}
});

module.exports = mongoose.model('admin', adminSchema);