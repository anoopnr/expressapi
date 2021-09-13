const mongoose=require('mongoose');
var studentSchema=mongoose.Schema({
    studentId:Number,
    studentName:String,
    age:Number,
    dob:String,
    department:String
});

var studentModel=mongoose.model("student",studentSchema);

module.exports=studentModel;