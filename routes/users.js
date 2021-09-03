var express= require('express');

var router= express.Router();

router.get('/getusers',(req,res)=>{
    res.send('All users');
});

router.get('/getoneuser',(req,res)=>{
    res.send('one user');
});

module.exports=router;

