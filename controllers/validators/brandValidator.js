const { body } = require("express-validator");

const validateAddBrandForm = [
  body("brand_name")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("Brand Name must be between 1 and 255 characters.")
    .matches(/^[a-zA-Z0-9\s\-_,\.;:()]+$/)
    .withMessage("Brand Name contains invalid characters."),

  body("brand_imageurl")
    .trim()
    .isURL()
    .withMessage("Brand Image URL must be a valid URL."),
];

module.exports = validateAddBrandForm;
