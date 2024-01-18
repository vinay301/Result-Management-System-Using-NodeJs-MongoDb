const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controllers/controller');
/**
 * @description RootRoute
 * @method GET/
 */

//Client-side Routes

route.get("/",services.homeRoutes);

/**
 * @description TeacherRoute
 * @method GET/teacher
 */

route.get("/teacher",services.teacherRoute)

/**
 * @description StudentRoute
 * @method GET/student
 */

route.get("/student",services.studentRoute)

/**
 * @description AddStudentsRoute
 * @method GET/AddStudent
 */

route.get("/AddStudent",services.AddStudentRoute)

/**
 * @description updateStudentRoute
 * @method GET/UpdateStudent
 */

route.get("/UpdateStudent", services.UpdateStudentRoute)

route.get("/teacherLogin", services.teacherLoginRoute);

/**
 * @description searchResultRoute
 * @method GET/SearchResult
 */


route.get("/logout",services.logout);

route.get("/SearchResult",services.searchResultRoute)
/**
 * for result page
 */
route.get("/result",services.resultPage);


//API REQUESTS
route.post('/api/students',controller.addStudent);
route.get('/api/students',controller.find);
route.put('/api/students/:id',controller.update);
route.delete('/api/students/:id',controller.delete);
route.post('/teacherLogin',controller.teacherLogin);
route.get('/api/students/searchResult',controller.searchResult);


module.exports = route;
