const mongoose = require('mongoose');

// schema
const  userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,'user name is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required']   
    },
    address:{
        type:String,
    },
    phone:{
        type:String,
        required:[true, 'phone number is required']
    },
    userType:{
        type:String,
        required:[true,'user type is required'],
        default:'client',
        enum:['client', 'admin', 'vendor']
    },
    profile:{
        type:String,
        default:'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png'
    },
    answer:{
        type:String,
        required:[true,'Answer is required']
    }


},{timestamps:true})

//export

module.exports = mongoose.model('User',userSchema)

