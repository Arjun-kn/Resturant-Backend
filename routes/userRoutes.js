const express = require('express');
const { getUserController, updateUserController, updatePasswordController, deleteProfileAccount } = require('../controllers/userControllers');
const authmiddleware = require('../middleware/authmiddleware');

const router = express.Router();


//routes
// GET USER
router.get("/getUser" ,authmiddleware, getUserController)

// UPDATE PROFILE
router.put('/updateUser', authmiddleware,updateUserController)


// RESET PASSWORD
router.put('/resetPassword',authmiddleware,updatePasswordController)

// DELETE USER
router.delete('/deleteUser/:id',authmiddleware,deleteProfileAccount)

module.exports = router


