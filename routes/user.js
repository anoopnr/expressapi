const express=require('express');
const router=express.Router();
const userController=require('../controller/user.controller');

router.post('/register',userController.validate('register'),userController.register);

router.post('/login',userController.validate('login'),userController.login);

module.exports=router;