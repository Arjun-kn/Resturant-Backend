const express = require('express');

const authmiddleware = require('../middleware/authmiddleware');
const { createCatCantroller, getAllCategory, updateCategory, deleteCategoryController } = require('../controllers/categoryController');
const { getSingleResturant } = require('../controllers/resturantController');

const router = express.Router();


//routes
// CREATE CATEGORY || POST
router.post('/create',authmiddleware,createCatCantroller)

// GET ALL CATEGORY || GET
router.get('/getCategory',getAllCategory)

// UPDATE CATEGORY || PUT
router.put('/updateCategory/:id',authmiddleware,updateCategory)

// Delete SINGLE CATEGORY || GET

router.delete('/deleteCategory/:id',authmiddleware,deleteCategoryController)



module.exports = router


