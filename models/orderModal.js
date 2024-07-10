const mongoose = require("mongoose");

// schema
const orderSchema = new mongoose.Schema(
  {
  food:[{
    type:mongoose.Schema.Types.ObjectId,
   ref:'Foods'
   } ],
   payment:{},
   buyer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
   },
   status:{
    type:String,
    enum:['preparing','preapre','on the way','delivered'],
    default:'preparing'
   }

  
  },
  { timestamps: true }
);

//export

module.exports = mongoose.model("Orders", orderSchema);
