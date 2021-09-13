const Student=require('../models/student.model');
const {body,param,validationResult}=require('express-validator');

const validate=(method)=>{
    try{
        switch(method){          
            case 'addNewStudent':{
                return [
                    body('studentId','Please add a valid studentId').exists().isNumeric(),
                    body('studentName', `Please provide a valid student Name`).exists().isAlphanumeric(),
                    body('age',`Please provide a valid age`).exists().isNumeric().isLength({min:1,max:3}),
                    body('dob',`Please enter a valid date of birth (YYYY-MM-DD)`).exists().isISO8601(),
                    body('department',`Please enter a valid deparment`).exists().isAlphanumeric()
                ]
            }
            case 'getStudentById':{
                return [
                    param('id','Please provide a valid id').exists().isAlphanumeric()
                ]
            }
        }
    }
    catch(ex){
        console.log(ex);
    }
}

const addNewStudent=async(req,res)=>{
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            res.status(422).send(errors.array());
            return;
        }
        const newStudent=new Student({
            studentId:req.body.studentId,
            studentName:req.body.studentName,
            age:req.body.age,
            dob:req.body.dob,
            department:req.body.department,
        });
        const student=await newStudent.save();
        res.status(201).send(student);

    }
    catch(ex){
        console.log(ex);
    }
}

const getAllStudents=async (req,res)=>{
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            res.status(422).send(errors.array());
            return;
        }
        const students=await Student.find();
        res.status(200).send(students);
    }
    catch(ex){
        console.log(ex);
    }
}

const getStudentById=async(req,res)=>{
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            res.status(422).send(errors.array());
            return;
        }

        const student=await Student.findById(req.params.id);
        res.status(200).send({"student":student});
    }
    catch(ex){
        console.log(ex);
        res.status(422).send("Error");
    }
}

module.exports={
    addNewStudent,
    validate,
    getAllStudents,
    getStudentById
}