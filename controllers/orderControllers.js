// Create order

const orderModal = require("../models/orderModal");

const createOrderController = async (req, res) => {
  try {
    let { cart, payment } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "Please add food cart or payment method ",
      });
    }
    // cal toal price
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new orderModal({
      food: cart,
      payment: total,
      buyer: req.body.id,
    });

    await newOrder.save();

    res.status(201).send({
      success: true,
      message: "Order place successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in place order api ",
      error,
    });
  }
};

// Change Order Status
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide valid order id",
      });
    }
    const { status } = req.body;
    const order = await orderModal.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: false,
      message: "Order Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In order status Api",
      error,
    });
  }
};

module.exports = { createOrderController, orderStatusController };
