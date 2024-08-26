const db = require("../db/queries");
const { validationResult } = require("express-validator");
const {
  validatePartEditForm,
  validatePartAdd,
} = require("./validators/itemValidator");
const validateBrand = require("./validators/brandValidator");
const {
  validateCarModelForm,
  validateCarModelEdit,
} = require("./validators/modelValidator");

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
    edit: true,
  });
};
exports.insertUpdatedItem = [
  validatePartEditForm,
  async (req, res) => {
    const adminQuery = await db.getAdminInfo();
    const adminPassword = adminQuery[0].adminpassword;
    if (req.body.adminPassword === adminPassword) {
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
      return res.redirect(`/item/${req.params.part_id}`);
    }
    res.status(400).send("Incorrect Admin Password");
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
        errors: errors.array(),
        title: `Error editing Item: ${req.body.part_id}`,
        brand_categories,
        vehicleType_categories,
      });
    }
    const insertResult = await db.addNewCarBrand(req.body);
    res.redirect(`/`);
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

exports.editModelForm = async (req, res) => {
  let brand_categories = await getBrandCategories();
  let vehicleType_categories = await getVehicleTypesCategories();
  const model_id = req.params.model_id;
  const modelQuery = await db.getModelById(model_id);

  res.render("form", {
    title: `Add Brand Category`,
    brand_categories,
    vehicleType_categories,
    modelForm: true,
    editModel: true,
    model_id,
    model_name: modelQuery[0].model_name,
    model_imageurl: modelQuery[0].model_imageurl,
    vehicle_type: modelQuery[0].vehicle_type,
    brand_id: modelQuery[0].brand_id,
  });
};

exports.postModel = [
  validateCarModelForm,
  async (req, res) => {
    let brand_categories = await getBrandCategories();
    let vehicleType_categories = await getVehicleTypesCategories();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        errors: errors.array(),
        title: `Error editing Item: ${req.body.part_id}`,
        brand_categories,
        vehicleType_categories,
      });
    }
    const insertResult = await db.addNewCarModel(req.body);
    res.redirect(`/`);
  },
];

exports.updateModel = [
  validateCarModelEdit,
  async (req, res) => {
    const adminQuery = await db.getAdminInfo();
    const adminPassword = adminQuery[0].adminpassword;
    if (req.body.adminPassword === adminPassword) {
      let brand_categories = await getBrandCategories();
      let vehicleType_categories = await getVehicleTypesCategories();
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("form", {
          errors: errors.array(),
          title: `Error editing Item: ${req.body.part_id}`,
          brand_categories,
          vehicleType_categories,
        });
      }
      const insertResult = await db.updateModelById(
        req.params.model_id,
        req.body
      );
      return res.redirect(`/category/${req.body.brand_id}`);
    }
    res.status(400).send("Incorrect Admin Password.");
  },
];

exports.getItemForm = async (req, res) => {
  let brand_categories = await getBrandCategories();
  let vehicleType_categories = await getVehicleTypesCategories();

  const item_info = {};
  const modelQuery = await db.getModelById(req.params.model_id);
  const brandQuery = await db.getBrandNameById(modelQuery[0].brand_id);
  const model = modelQuery[0];
  console.log(model);
  const brand_name = brandQuery[0].brand_name;

  res.render("form", {
    title: `Add new part for ${model.model_name}`,
    brand_categories,
    vehicleType_categories,
    item_info,
    model,
    brand_name,
  });
};

exports.addItemIntoModel = [
  validatePartAdd,
  async (req, res) => {
    let brand_categories = await getBrandCategories();
    let vehicleType_categories = await getVehicleTypesCategories();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        errors: errors.array(),
        title: `Error editing Item: ${req.body.part_id}`,
        brand_categories,
        vehicleType_categories,
      });
    }
    const model_id = req.params.model_id;
    const modelQuery = await db.getModelById(model_id);
    // const brandNameQuery = await db.getBrandNameById(modelQuery[0].brand_id);
    // const brand_name = brandNameQuery[0].brand_name;
    const oem = req.body.oem ? true : false;
    const reqbody = {
      ...req.body,
      oem,
      brand_id: modelQuery[0].brand_id,
    };
    await db.addItemIntoModelById(model_id, reqbody);
    res.redirect(`/model/${model_id}`);
  },
];
