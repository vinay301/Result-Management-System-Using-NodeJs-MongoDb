const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        //mongoDb Connection string
        const con = await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDb Connected : ${con.connection.host}`)
    }
    catch(err){
        console.log(err)
        {
            process.exit(1);
        }
    }
}

module.exports = connectDB