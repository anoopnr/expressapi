const express=require('express');
const router=express.Router();
const teacherModel=require('../models/teacher.model');
router.post('/add',(req,res)=>{
    let newTeacher=new teacherModel({
        teacherId:req.body.id,
        teacherName:req.body.name,
        department:req.body.dpmt,
        rank:req.body.rank
    });
    newTeacher.save((err,newTeacher)=>{
        if(err)
            res.send(err);
        else
            res.send(newTeacher);
    });
});
module.exports=router;
