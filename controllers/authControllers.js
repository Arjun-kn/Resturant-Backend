const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// Register
const registerController = async(req,res)=>{
try{
const {userName,email,password,phone,address,answer} = req.body

//validation
if(!userName || !email || !password || !phone || !address|| !answer){
    return res.status(500).send({
        success:false,
        message:'Please provide all fields'
    })
}
// check user
const existing = await userModel.findOne({email})
if(existing){
    return res.status(500).send({
        success:false,
        message:'email already register'
    })
}
// hashing password
var salt = bcrypt.genSaltSync(10);
const hashedPassword = await bcrypt.hash(password,salt);



// create new user

const user = await userModel.create({userName,email,password:hashedPassword,phone,address,answer})
res.status(201).send({
    success:true,
    message:'Successfully Registered',
    user
})

}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:`Error in register user`,
        error
    })
}
}

//Login

const loginController = async(req,res) =>{
try{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(500).send({
            success:false,
            message:"Please provide Email OR password"
        })
    }

    // check user
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(404).send({
            success:false,
            message:"User Not Found"
        })
    }

    // check user password | comapre password
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
       return res.status(500).send({
        success:false,
        message:'Invalid credential'
       }) 
    }

    // Token

const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
    expiresIn:"7d",
})

res.status(200).send({
    success:true,
    message:'Login Successfully',
    token,
    user
})



}catch(error){
    console.log(error)
    res.status(500).send({
       success:false,
       message:'Error in login' ,
       error
    })
}
}


module.exports = {registerController,loginController}