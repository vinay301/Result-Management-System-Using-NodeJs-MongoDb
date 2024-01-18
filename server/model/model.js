const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    studentName : String,
    rollNo : Number,
    Dob  : {
        type:Date,
        required:true,
        timezone:null
    },
    score : Number
});
const studentDb = mongoose.model('studentdb',schema);
module.exports = studentDb;



