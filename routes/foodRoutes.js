const express = require('express');
const authmiddleware = require('../middleware/authmiddleware');

const { createFoodControllers, getFoodControllers, getSingalFoodControllers, getFoodByResturantFoodController, updateFoodControllers, deleteFoodControllers} = require('../controllers/foodControllers');
const { updateCategory } = require('../controllers/categoryController');
const adminMiddleware = require('../middleware/adminMiddleware');



const router = express.Router();


//routes
// CREATE FOOD || POST
router.post('/create',authmiddleware,createFoodControllers);

// GET ALL FOOD || GET

router.get('/getFood',getFoodControllers)

// GET SINGLE  FOOD  || GET
router.get('/getSingleFood/:id',getSingalFoodControllers)

// GET FOOD BY RESTURANT || GET
router.get('/getBYResturant/:id',getFoodByResturantFoodController)


//UPDATE FOOD ITEMS
router.put('/updateFood/:id',authmiddleware,updateFoodControllers)


// DELETE FOOD ITEMS
router.delete('/deleteFood/:id',authmiddleware,deleteFoodControllers)




module.exports = router


