var express= require('express');

var router=express.Router();

router.get('/getproducts',(req,res)=>{
    res.send('All products');
});

router.get('/getoneproduct',(req,res)=>{
    res.send('one product');
});

module.exports=router;