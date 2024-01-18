var studentDb = require('../model/model');

//Add and save new student
exports.addStudent = async (req,res) => {
 // validate request
 if(!req.body){
    res.status(400).send({ message : "Content can not be emtpy!"});
    return;
}
    
    //new student
    const student = new studentDb({
        studentName: req.body.studentName || 'default student',
        rollNo : req.body.rollNo,
        Dob : req.body.Dob,
        score : req.body.score
    })
    
    //save student data in the database
    student
    .save(student)
    .then(data => {
        //res.send(data);
        res.redirect('/AddStudent');
    })
    .catch(err => {
        res.status(500).send({
            message : err.message || "some error occurred while adding a student"
        });
    });
}

//retrive and return all student and retrieve and return single user
exports.find = (req,res) => {
    //get the data from the database and returns as a response
    if(req.query.id)
    {
        const id = req.query.id;

        studentDb.findById(id)
        .then(data => {
            if(!data)
            {
                res.status(404).send({
                    message : "Student Not Found with id " + id
                })
            }
            else{
                res.send(data)
            }
        }) 
        .catch(err=>{
            res.status(500).send({message : "Error retriving student with id" + id})
        })
    }
    else{
        studentDb.find()
        .then(student => {
            res.send(student)
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Error Occurred while retriving student information"
            })
        })
    }
}

//update a new identified student by rollNo
exports.update = (req,res) => {
    //if all the body fields are left empty
    if(!req.body)
    {
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    studentDb.findByIdAndUpdate(id,req.body,{useFindAndModify : false})
    .then(data => {
        if(!data){
            res.status(404).send({ message : `Cannot Update Student with ${id}. Maybe Student not found!`})
        }else{
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({ message : "Error Update Student information"})
    })
}

//delete a student with rollNo in the request
exports.delete = (req,res) => {
    const id = req.params.id;

    studentDb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Student was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete Student with id=" + id
            });
        });
}

//Teacher Login
const credentials = {
    email : "admin@gmail.com",
    password : "admin123"
}
 exports.teacherLogin = (req, res) => {
      //******** Teacher Login Password **********//
      if(req.body.email == credentials.email && req.body.password == credentials.password){
        req.session.teacher = req.body.email;
        res.redirect("/teacher");
    }
    else{
        res.end("Invalid Teacher");
        // res.render("/teacherLogin", {
        //     error : "Please Enter Correct Password"
        // })
    }
   
}

exports.searchResult = (req,res)=>{
    const record={
        rollNo:req.query.rollNo,
        studentName:req.query.studentName
    }
    studentDb.findOne(record)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Record Not found"});
            }
            else{
               console.log(data);
                res.send(data);
                
            }
        })
        .catch(err=>{
            res.status(500).send(err.message|| "Some Error Occured While Finding the student record");
        })
}