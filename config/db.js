let mongoose = require('mongoose')

let  connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to DB ${mongoose.connection.host}`)

    }catch(error){
        console.log("DB Error", error)
    }
    }


    module.exports = connectDB