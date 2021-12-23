
import Category from "../models/category";
import AppError from "../utils/AppError";
import catchASync from "../utils/catchASync";


// @route       POST /api/categories
// @purpose     Add product cateogry
// @access      Admin
export const addCategory = catchASync(async (req, res) => {

    const { name, description } = req.body; 

    if (!name) throw new AppError(400, 'name is required'); 
    if (!description) throw new AppError(400, 'description is required'); 


    const newCategory = await Category.create({
        name, description
    })
  

    return res.json({
    status: "success",
    category: newCategory
  });
});



// @route       GET /api/categories
// @purpose     Get all categories 
// @access      Public 
export const getAllCategories =  catchASync(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = limit * (page - 1);

  if (!page)
    throw new AppError(400, "invalid page query. Page must me a number");
  if (!limit)
    throw new AppError(400, "invalid limit query. Limit must me a number");


  const categories = await Category.find().skip(skip).limit(limit);
    
  return res.json({
      status: "success",
      message: "successfully retrieved all category data",
      page,
      limit,
      results: categories.length,
      categories
    });

}) 
