const axios = require('axios');

exports.homeRoutes = (req,res) => {
    res.render("index")
}

exports.teacherRoute = async (req,res) => {
    //make a GET request to API students
    let resData = await axios.get('http://localhost:3000/api/students')
    console.log(resData);
    res.render("teacher",{students:resData.data})
    // .then(function(response){
    //     const students =response.data;
    //     students.forEach(element => {
    //          element.Dob = element.Dob.substring(0,10);
    //     });
    //     students.sort((a,b)=>{
    //         return a.rollNo-b.rollNo;
    //      });
    //     res.render("teacher",{students : students});
    // })
    // .catch(err=>{
    //     res.send(err)
    // })
}

exports.AddStudentRoute = (req,res) => {
    res.render("AddStudent");
}

exports.UpdateStudentRoute = (req,res) => {
    axios.get('http://localhost:3000/api/students',{params : {id : req.query.id}})
   
    .then(function(studentData){
        res.render("UpdateStudent", { student : studentData.data})
    })
    .catch(err =>{
        res.send(err);
    })
   
}

exports.studentRoute = (req,res) => {
    res.render("student");
}

exports.teacherLoginRoute = (req,res) => {
    res.render("login");
   
}

exports.resultPage = (req,res) => {
    const id = req.query.id;
 
    axios.get(`http://localhost:3000/api/students?id=${id}`)
        .then(response=>{
            const student =response.data;
            
           
            res.render('result',{result:student});
        })
        .catch(err=>{
            res.send(err);
        })
    
   
}

exports.searchResultRoute = (req,res)=>{
   
   

}

exports.logout = (req,res) => {
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error");
        }
        else{
            res.render("login",{logout : "logout successfully"});
        }
    })
}