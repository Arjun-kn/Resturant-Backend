// CREATE RESTURANT

const restrauntModel = require("../models/restrauntModel");

const createResturant = async (req, res) => {
  try {
    const {
      title,
      image,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    // Validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please provide title and address",
      });
    }
    const newResurant = new restrauntModel({
      title,
      image,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newResurant.save();
    res.status(201).send({
      success: true,
      message: "New Resturant Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erron in create resturant",
    });
  }
};

// GET ALL Resturant

const getAllResturant = async (req, res) => {
  try {
    const resturants = await restrauntModel.find({});
    if (!resturants) {
      return res.status(404).send({
        success: false,
        message: "No Resturant Available",
      });
    }

    res.status(200).send({
      success: true,
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    console.log("error");
    res.status(500).send({
      success: false,
      messsage: "Error in getting all resturant",
      error,
    });
  }
};

const getSingleResturant = async (req, res) => {
  try {
    const singleResturant = await restrauntModel.findById(req.params.id);
    if (!singleResturant) {
      return res.status(500).send({
        success: false,
        message: "Resturant Not Found",
      });
    }

    res.status(200).send({
      success: true,
      singleResturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting single resturant",
      error,
    });
  }
};

const deleteResturant = async (req, res) => {
  try {
    const deleteRes = await restrauntModel.findByIdAndDelete(req.params.id);
    if (!deleteRes) {
      return res.status(500).send({
        success: false,
        message: "Id not found due to this resturant can not be deleted",
      });
    }

    res.status(200).send({
      success: true,
      message: "Resturant Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting resturant",
      error,
    });
  }
};

module.exports = {
  createResturant,
  getAllResturant,
  getSingleResturant,
  deleteResturant,
};
