const express = require('express');
const morgan = require('morgan');
const ejs = require('ejs');
const dotenv = require('dotenv');
const bodyparser = require('body-parser'); 
const path = require('path');
const session = require('express-session');
const {v4:uuidv4} = require('uuid');
var router = express.Router();

const connectDb = require('./server/database/connection');

const app = express();

//Configuring Dotenv File
dotenv.config({path:'config.env'});
const port = process.env.port || 8080;


//log requests -- using morgan modules
app.use(morgan("tiny"));

//mongoDb Connection
connectDb();

//parse request to body-parser
// Use body-parser to parse JSON requests
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


//set view engine
//middleware function that renders a view
app.set("view engine","ejs");
// app.set("views",path.resolve(__dirname,"views/ejs"))

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/images',express.static(path.resolve(__dirname,"assets/images")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));
//'/css/style.css'

//session
app.use(session({
    secret:uuidv4(),    //we can use hash values here to make the session completely secret
    resave:false,
    saveUninitialized:true,
}));

//loading routers
app.use('/',require('./server/routes/router'));

app.listen(port,()=>{
 console.log(`server is running on http://localhost:${port}`);
});
