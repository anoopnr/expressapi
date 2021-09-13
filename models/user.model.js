const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    firstName:{type:String,default:null,required:true},
    lastName:{type:String,default:null,required:true},
    email:{type:String,Unique:true,required:true},
    password:String,
    token:String
});

const userModel=mongoose.model('user',userSchema);
module.exports=userModel;