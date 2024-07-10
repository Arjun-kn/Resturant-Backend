const mongoose = require("mongoose");

// schema
const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food title is required"],
    },
    description: {
      type: String,
      required: [true, "food description is required"],
    },
    price: {
      type: Number,
      requiired: [true, "food price is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsimilarpng.com%2Fgood-food-logo-design-on-transparent-background-png%2F&psig=AOvVaw1x7W47UWfiz7NaIgpY82bu&ust=1720173347383000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPjqgpyPjYcDFQAAAAAdAAAAABAK",
    },
    foodTags: {
      type: String,
    },
    category: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvailabel: {
      type: Boolean,
      default: true,
    },
    resturant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restraunt",
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
  },
  { timestamps: true }
);

//export

module.exports = mongoose.model("Foods", foodSchema);
