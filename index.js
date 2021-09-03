var express=require('express');

var app=express();

var users=require('./routes/users');
var products=require('./routes/products');

app.use('/users',users);
app.use('/products',products);

app.listen(4000,()=>{
    console.log('listening to port 4000');
});