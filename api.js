var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
//  var StudentModel = require('./studentschema');
// Connecting to database
var url = 'mongodb://127.0.0.1/test'
const AutoIncrement = require('mongoose-auto-increment');


mongoose.Promise = global.Promise;
const db = mongoose.createConnection(url, function (error) {
    if (error) {
        console.log("Error!" + error);
    }

});
AutoIncrement.initialize(db);
var StudentSchema = new mongoose.Schema({
    StudentId: Number,
    Name: String,
    rollNumber: {type: Number,reqired:true,unique:true},
    Birthday: String,
    Address: String
});
StudentSchema.plugin(AutoIncrement.plugin,{model:'students',field:'rollNumber',startAt:100});
const StudentModel = db.model('students', StudentSchema);
router.post('/save', function (req, res) {
    const studentData = {
        StudentId: req.body.StudentId,
        Name: req.body.Name
    };
    var newStudent = new StudentModel(studentData);
    // newStudent.StudentId = req.body.StudentId;
    // newStudent.Name = req.body.Name;
    // newStudent.Birthday = req.body.Birthday;
    // newStudent.Address = "Pune";
    
    newStudent.save(function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(newStudent._doc);
        }
    });
});

router.get('/findall', function(req, res) {
    StudentModel.find(function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    });  
 });

 router.get('/rollno', function(req, res) {

    
    StudentModel.find({},"Roll -_id",function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            
            res.send(data);
        }
    });  
 });


module.exports = router;