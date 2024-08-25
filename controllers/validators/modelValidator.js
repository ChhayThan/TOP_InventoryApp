const { body } = require("express-validator");
const { getModelNames } = require("../utils/getters");

const validateCarModelForm = [
  body("model_name")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("Model Name must be between 1 and 255 characters.")
    .matches(/^[a-zA-Z0-9\s\-_,\.;:()]+$/)
    .withMessage("Model Name contains invalid characters.")
    .custom(async (value) => {
      const modelNames = await getModelNames();
      if (modelNames.includes(value)) {
        throw new Error(
          "Model already exists in inventory. Please provide a unique model."
        );
      }
      return true;
    }),

  body("model_imageurl")
    .trim()
    .isURL()
    .withMessage("Model Image URL must be a valid URL."),

  body("vehicle_type")
    .trim()
    .custom((value) => {
      const validTypes = ["Sedan", "Van", "SUV", "Coupe", "Sports", "Truck"];
      if (!validTypes.includes(value)) {
        throw new Error(
          "Invalid vehicle type. Choose from Sedan, Van, SUV, Coupe, Sports, or Truck."
        );
      }
      return true;
    }),

  body("brand_id")
    .isInt({ gt: 0 })
    .withMessage("Brand ID must be a positive integer."),
];

module.exports = validateCarModelForm;
