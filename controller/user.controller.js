const User = require("../models/user.model");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {body,validationResult}=require('express-validator');

const validate=(method)=>{
    try{
        switch(method){
            case 'register':{
                return[
                    body('firstName',`firstName doesn't exists`).exists(),
                    body('lastName',`lastName doesn't exists`).exists(),
                    body('email',`Not a valid mail id`).exists().isEmail(),
                    body('password',`Invalid password`).exists()
                ]
            }
            case 'login':{
                return[
                    body('email','Invalid mail id').exists().isEmail(),
                    body('password','Invalid password').exists()
                ]
            }
        }
    }
    catch(ex){
        console.log(ex);
    }
}
const register= async(req,res)=>{
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            res.status(422).send(errors.array());
            return;
        }
        const {firstName,lastName,email,password}=req.body;
        const oldUser= await User.findOne({"email":email});
        if(oldUser)
            res.status(409).send("Already user exists with this mail Id");
        const encryptedPassword=await bcrypt.hash(password,10);
        const newUser=new User({
            firstName,
            lastName,
            email:email.toLowerCase(),
            password:encryptedPassword
        });
        const user= await newUser.save();
        const token=jwt.sign({user_id:user._id,email},process.env.TOKEN_KEY,{expiresIn: "2h",});
        user.token=token;
        res.status(201).send(user);
    }
    catch(ex){
        console.log(ex);
    }
}

const login=async(req,res)=>{
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            res.status(422).send(errors.array());
            return;
        }
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(user && (await bcrypt.compare(password,user.password))){
            const token=jwt.sign({user_id:user._id,email},process.env.TOKEN_KEY,{expiresIn:"2h"});
            user.token=token;
            res.status(200).send(user);
        }
        else
            res.status(400).send("Invalid credentials");
    }
    catch(ex){
        console.log(ex);
    }
}

module.exports={
    register,
    login,
    validate
}