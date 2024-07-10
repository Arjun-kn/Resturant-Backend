// Create food

const foodModel = require("../models/foodModel");

const createFoodControllers = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailabel,
      resturant,
      rating,
    } = req.body;

    if (!title || !price || !description || !resturant) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailabel,
      resturant,
      rating,
    });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New food item create successfully",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Creating food Api",
      error,
    });
  }
};

// Get all foods

let getFoodControllers = async (req, res) => {
  try {
    let getAllfoodItems = await foodModel.find({});
    if (!getAllfoodItems) {
      return res.status(500).send({
        succeess: false,
        message: "No food item was found",
      });
    }

    res.status(200).send({
      succeess: true,
      totalFoods: getAllfoodItems.length,
      message: "food items get successfully",
      getAllfoodItems,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting food items",
      error,
    });
  }
};

// Get single food

let getSingalFoodControllers = async (req, res) => {
  try {
    let { id } = req.params;
    const food = await foodModel.findById(id);
    if (!food) {
      return res.status(500).send({
        succeess: false,
        message: "No food item for given id",
      });
    }

    res.status(200).send({
      succeess: true,
      message: "Single food item found successfully",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting single food item api",
      error,
    });
  }
};

// Get food by resturant id

let getFoodByResturantFoodController = async (req, res) => {
  try {
    let { id } = req.params;
    const food = await foodModel.find({ resturant: id });
    if (!food) {
      return res.status(500).send({
        succeess: false,
        message: "No food item for given  resturant id",
      });
    }

    res.status(200).send({
      succeess: true,
      message: "Food base on resturant",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting single food item api",
      error,
    });
  }
};

// Update food items
let updateFoodControllers = async (req, res) => {
  try {
    let foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        succeess: false,
        message: "No food id was found",
      });
    }

    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(500).send({
        success: true,
        message: "No food item was found for given id",
      });
    }

    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailabel,
      resturant,
      rating,
    } = req.body;

    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailabel,
        resturant,
        rating,
      },
      { new: true }
    );

    res.status(200).send({
      succeess: true,
      message: "Food item updated successfully",
      updatedFood,
    });
  } catch(error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update food item api",
      error,
    });
  }
};

// Delete Food item 

const deleteFoodControllers = async(req,res)=>{
    try{
        let foodId = req.params.id
        console.log(foodId)
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:'Please provide food item id'
            })
        }

        let deletedFood  = await foodModel.findByIdAndDelete(foodId)
        if(!deletedFood){
            return res.status(404).send({
                success:false,
                message:"Item was not found"
            })
        }
        res.status(200).send({
            success:true,
            message:'Food item deleted successfully'
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            succeess:false,
            message:'Error in delete food item api',
            error
        })
    }
}



module.exports = {
  createFoodControllers,
  getFoodControllers,
  getSingalFoodControllers,
  getFoodByResturantFoodController,
  updateFoodControllers,
  deleteFoodControllers,
 
};
