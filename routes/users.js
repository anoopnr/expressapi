var express= require('express');

var router= express.Router();

router.use('/',(req,res,next)=>{
    console.log('started here');
    next();
});

router.get('/u',(req,res,next)=>{
    console.log('logic here');
    res.send('users/');
    next();
});

router.use('/u',(req,res)=>{
    console.log('ended here');
});

router.get('/getusers',(req,res)=>{
    res.send('All users');
});

router.get('/getoneuser/:id',(req,res)=>{
    res.send('one user with id : '+req.params.id);
});

router.get('/statewiseuser/:country/:state',(req,res)=>{
    res.send('state wise users: '+req.params.country+' '+req.params.state);
});

router.get('/search/:key([0-9]{4})',(req,res)=>{
    res.send('key value '+req.params.key);
});

router.get('/search/:key([a-z]{4})',(req,res)=>{
    res.send('alphabets value '+req.params.key);
});

router.get('*',(req,res)=>{
    res.send('route not found');
});

module.exports=router;

