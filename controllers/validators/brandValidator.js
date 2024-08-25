const { body } = require("express-validator");
const { getBrandCategories } = require("../utils/getters");

const validateAddBrandForm = [
  body("brand_name")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("Brand Name must be between 1 and 255 characters.")
    .matches(/^[a-zA-Z0-9\s\-_,\.;:()]+$/)
    .withMessage("Brand Name contains invalid characters.")
    .custom(async (value) => {
      const brand_categories = await getBrandCategories();

      const existingBrand = brand_categories.find(
        (brand) => brand.brand_name.toLowerCase() === value.toLowerCase()
      );

      if (existingBrand) {
        throw new Error(
          "Brand already exists in inventory. Please provide a unique brand."
        );
      }

      return true;
    }),
  body("brand_imageurl")
    .trim()
    .isURL()
    .withMessage("Brand Image URL must be a valid URL."),
];

module.exports = validateAddBrandForm;
