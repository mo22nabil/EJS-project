const mongoose =require('mongoose');

const userSchema = new mongoose.Schema({
    userName : {type :String , required:true},
    email : {type :String , required:true},
    password : {type :String , required:true},
    imageURL : String ,
    confirmEmail : {type :Boolean , default:false},
    role : {type :String , default:'User'}
},{
    timestamps:true
})

const userModel = mongoose.model('User',userSchema);

module.exports = userModel