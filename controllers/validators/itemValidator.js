const { body } = require("express-validator");

const validatePartEditForm = [
  body("part_name")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("Part Name must be between 1 and 255 characters.")
    .matches(/^[a-zA-Z0-9\s\-_,\.;:()]+$/)
    .withMessage("Part Name contains invalid characters."),

  body("brand_id").trim().notEmpty().withMessage("Brand Name is required."),

  body("model_id").trim().notEmpty().withMessage("Model Name is required."),

  body("part_imageUrl")
    .trim()
    .isURL()
    .withMessage("Part Image-Url must be a valid URL."),

  body("part_price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than 0."),

  body("part_description")
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 1000 })
    .withMessage("Description must be up to 1000 characters."),

  body("part_quantity")
    .isInt({ min: 0 })
    .withMessage("Quantity must be an integer of at least 0."),

  body("part_oem").optional(),
];

const validatePartAdd = [
  body("part_name")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("Part Name must be between 1 and 255 characters.")
    .matches(/^[a-zA-Z0-9\s\-_,\.;:()]+$/)
    .withMessage("Part Name contains invalid characters."),

  body("part_imageUrl")
    .trim()
    .isURL()
    .withMessage("Part Image-Url must be a valid URL."),

  body("part_price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than 0."),

  body("part_description")
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 1000 })
    .withMessage("Description must be up to 1000 characters."),

  body("part_quantity")
    .isInt({ min: 0 })
    .withMessage("Quantity must be an integer of at least 0."),

  body("part_oem").optional(),
];

module.exports = { validatePartEditForm, validatePartAdd };
