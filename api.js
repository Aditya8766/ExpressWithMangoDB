var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
// var StudentModel = require('./studentschema');
// Connecting to database
var url = 'mongodb://127.0.0.1/test'

mongoose.Promise = global.Promise;
const db = mongoose.createConnection(url, function (error) {
    if (error) {
        console.log("Error!" + error);
    }
});

var StudentSchema = new mongoose.Schema({
    StudentId: Number,
    Name: String,
    Roll: Number,
    Birthday: String,
    Address: String
});

const StudentModel = db.model('students', StudentSchema);

router.post('/save', function (req, res) {
    var newStudent = new StudentModel();
    newStudent.StudentId = req.body.StudentId;
    newStudent.Name = req.body.Name;
    newStudent.Roll = req.body.Roll;
    newStudent.Birthday = req.body.Birthday;
    newStudent.Address = "Pune";
    
    newStudent.save(function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Data inserted");
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

module.exports = router;