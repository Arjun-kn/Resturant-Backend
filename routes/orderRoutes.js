const express = require('express');
const authmiddleware = require('../middleware/authmiddleware');
const { createOrderController, orderStatusController } = require('../controllers/orderControllers');
const adminMiddleware = require('../middleware/adminMiddleware');





const router = express.Router();


//routes
// PLACE ORDER|| POST
router.post('/placeOrder',authmiddleware,createOrderController)

// ORDER STATUS
router.post('/orderStatus/:id', authmiddleware,adminMiddleware, orderStatusController)

//CHANGE ORDER STATUS






module.exports = router


