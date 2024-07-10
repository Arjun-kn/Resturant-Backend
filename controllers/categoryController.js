const categoryModel = require("../models/categoryModel")

// Create category
const createCatCantroller = async(req,res)=>{
    try{
      const {title,imageUrl}  = req.body 
      //Validation
      if(!title){
        return res.status(500).send({
            success:false,
            message:'Please provide category title or image'
        })
      }

      const newCategory = new categoryModel({title,imageUrl})
      await newCategory.save()
      res.status(201).send({
        success:true,
        message:'Category created successfully',
        newCategory
      })

    }catch(error){
        cosnole.log(error)
        res.status(500).send({
            success:false,
            message:'Error in create category',
            error
        })
    }

}

// GET ALL Category
let getAllCategory = async(req,res)=>{
  try{
    let getCategory = await categoryModel.find({})
    if(!getCategory){
        return res.status(500).send({
            success:false,
            message:'Category  not found'
        })
    }

    res.status(200).send({
        success:true,
        totalCategory:getCategory.length,
        getCategory
    })
  }catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in get Category Api',
        error
    })
  }
}

// Update category
const updateCategory=  async(req,res)=>{
try{
    const {id} = req.params
    const {title,imageUrl} = req.body
   const updatedCategory = await categoryModel.findByIdAndUpdate(id,{title,imageUrl},{new:true})
   if(!updatedCategory){
    return res.status(500).send({
        success:false,
        message:'No Category Found'
    })
   }
   res.status(200).send({
    success:true,
    message:'Category Updated Successfully'
   })

}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in update category api',
        error
    })
}
}

// Delete Category by id

let deleteCategoryController = async(req,res)=>{
  try{
    let {id} = req.params
    let deleteItem = await categoryModel.findByIdAndDelete(id)
    if(!deleteItem){
      return res.status(500).send({
        success:false,
        message:'Please provide id for delete'
      })
    }

    res.status(200).send({
      success:true,
      message:'Category deleted successfully'
    })

  }catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      messsage:'Error in deleting category',
      error
    })
}
}



module.exports = {createCatCantroller,getAllCategory,updateCategory,deleteCategoryController}