const mongoose=require('mongoose');

const teacherSchema=mongoose.Schema({
    teacherId:Number,
    teacherName:String,
    department:String,
    rank:String
});

const teacherModel=mongoose.model('teacher',teacherSchema);

module.exports=teacherModel;