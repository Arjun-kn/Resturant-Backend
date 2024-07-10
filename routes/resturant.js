const express = require('express');

const authmiddleware = require('../middleware/authmiddleware');
const { createResturant, getAllResturant, getSingleResturant, deleteResturant } = require('../controllers/resturantController');

const router = express.Router();


//routes

// CREATE RESTURANT || POST
router.post('/create',authmiddleware, createResturant);

// GET ALL RESTURANT || GET

router.get('/getAll', getAllResturant)

// GET PERTICULAR RESTURANT || GET

router.get('/getSingle/:id',getSingleResturant)

// DELETE RESTURANT || DELETE
router.delete('/deleteResturant/:id',authmiddleware, deleteResturant)


module.exports = router


