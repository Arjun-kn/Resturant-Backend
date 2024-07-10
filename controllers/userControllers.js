// Get user info

const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs')

const getUserController = async(req,res) => {
    try{
        // find user
        const user = await userModel.findById({_id:req.body.id})
        // validation 
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User Not Found'
            })
        }

        // hide password
        user.password = undefined;
        //resp
        res.status(200).send({
            success:true,
            messaage:'User data get success fully',
            user
        })

       
    }catch(error){
        cconsole.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Get User API',
            error
        })
    }
};


// UPDATE USER
const updateUserController = async(req,res) =>{
try{
const user = await userModel.findById({_id:req.body.id})
//validation
if(!user){
    return res.status(404).send({
        success:false,
        message:'user not found'
    })
}
//update
const {userName,address,phone} = req.body;

if(userName) user.userName = userName;
if(address)  user.address = address;
if(phone)    user.phone = phone;
// save user
await user.save();
res.status(200).send({
    success:true,
    message:'User Updated Successfully'

})

}catch(error){
    cosnole.log(error)
    res.status(500).send({
        success:false,
        message:'Error in update user',
        error
    })
}
}


// Update password

const updatePasswordController = async(req,res)=>{
    try{
        const {email,newpassword,answer} = req.body
        console.log(req.body)
        if(!email || !newpassword || !answer){
            return res.status(500).send({
                success:false,
                message:'Please Provide all answer'

            })
        }

        const user = await userModel.findOne({email,answer})
        if(!user){
            return res.status(500).send({
                success:false,
                message:'User not Found or invalid answer'
            })
        }
        // hashing password
var salt = bcrypt.genSaltSync(10);
const hashedPassword = await bcrypt.hash(newpassword,salt);

user.password  = hashedPassword;
await user.save();
res.status(200).send({
    success:true,
    message:'Password has updated successfully',


})

    } catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in reset Password',
            error
        })
    }
}

// DELETE PROFILE ACCOUNT
const deleteProfileAccount = async(req,res)=>{
    try{
    await userModel.findByIdAndDelete(req.params.id)
    return res.status(200).send({
        success:true,
        message:'Account Deleted Successfully'
    })

    }catch(error){
        console.log(error)
       res.status(500).send({
        success:false,
        message:'Error in Delete Profile Account',
        error
       })
    }
}

module.exports = {getUserController,updateUserController,updatePasswordController,deleteProfileAccount};