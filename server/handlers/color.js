import Color from "../models/color";
import AppError from "../utils/AppError";
import catchASync from "../utils/catchASync";

// @route       POST /api/colors
// @purpose     Add color
// @access      Admin
export const addColor = catchASync(async (req, res) => {
  const { name, description } = req.body;

  if (!name) throw new AppError(400, "name is required");
  if (!description) throw new AppError(400, "description is required");

  const newColor = await Color.create({
    name,
    description,
  });

  return res.json({
    status: "success",
    Color: newColor,
  });
});

// @route       GET /api/colors
// @purpose     Get all colors
// @access      Public
export const getAllColors = catchASync(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = limit * (page - 1);

  if (!page)
    throw new AppError(400, "invalid page query. Page must me a number");
  if (!limit)
    throw new AppError(400, "invalid limit query. Limit must me a number");

  const Colors = await Color.find().skip(skip).limit(limit);

  return res.json({
    status: "success",
    message: "successfully retrieved all Color data",
    page,
    limit,
    results: Colors.length,
    Colors,
  });
});
