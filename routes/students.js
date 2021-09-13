var express=require('express');
var router=express.Router();
var studentController=require('../controller/student.controller');

router.post('/add',studentController.validate('addNewStudent'),studentController.addNewStudent);
router.get('/list',studentController.getAllStudents);
router.get('/details/:id',studentController.validate('getStudentById'),studentController.getStudentById);
module.exports=router;