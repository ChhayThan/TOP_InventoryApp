const db = require("../db/queries");
const { validationResult } = require("express-validator");
const validatePartEditForm = require("./validators/editItemValidator");
const validateBrand = require("./validators/brandValidator");
const validateModel = require("./validators/modelValidator");

const {
  getBrandCategories,
  getVehicleTypesCategories,
} = require("./utils/getters");

exports.getEditForm = async (req, res) => {
  const part_id = req.params.part_id;
  const partQuery = await db.getPartById(part_id);
  const item_info = partQuery[0];

  let brand_categories = await getBrandCategories();
  let vehicleType_categories = await getVehicleTypesCategories();
  let modelQuery = await db.getModelsByBrandId(item_info.brand_id);
  let model_names = [];
  modelQuery.forEach((model) => {
    model_names.push(model);
  });

  res.render("form", {
    title: `Editing Item: ${part_id}`,
    brand_categories,
    vehicleType_categories,
    item_info,
    model_names,
  });
};
exports.insertUpdatedItem = [
  validatePartEditForm,
  async (req, res) => {
    let brand_categories = await getBrandCategories();
    let vehicleType_categories = await getVehicleTypesCategories();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        part_id: req.params.part_id,
        errors: errors.array(),
        title: `Error editing Item: ${req.body.part_id}`,
        brand_categories,
        vehicleType_categories,
      });
    }
    await db.updatePartById(req.body, req.params.part_id);
    res.redirect(`/item/${req.params.part_id}`);
  },
];

exports.getBrandForm = async (req, res) => {
  let brand_categories = await getBrandCategories();
  let vehicleType_categories = await getVehicleTypesCategories();

  res.render("form", {
    title: `Add Brand Category`,
    brand_categories,
    vehicleType_categories,
    brandForm: true,
  });
};

exports.postBrandCategory = [
  validateBrand,
  async (req, res) => {
    let brand_categories = await getBrandCategories();
    let vehicleType_categories = await getVehicleTypesCategories();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        part_id: req.params.part_id,
        errors: errors.array(),
        title: `Error editing Item: ${req.body.part_id}`,
        brand_categories,
        vehicleType_categories,
      });
    }
    res.send("TO BE IMPLEMENTED");
  },
];

exports.getModelForm = async (req, res) => {
  let brand_categories = await getBrandCategories();
  let vehicleType_categories = await getVehicleTypesCategories();

  res.render("form", {
    title: `Add Brand Category`,
    brand_categories,
    vehicleType_categories,
    modelForm: true,
  });
};

exports.postModel = [
  validateModel,
  async (req, res) => {
    let brand_categories = await getBrandCategories();
    let vehicleType_categories = await getVehicleTypesCategories();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        part_id: req.params.part_id,
        errors: errors.array(),
        title: `Error editing Item: ${req.body.part_id}`,
        brand_categories,
        vehicleType_categories,
      });
    }
    res.send("TO BE IMPLEMENTED");
  },
];
